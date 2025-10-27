import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Clock, User, FileEdit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

interface ContentLog {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string;
  updated_at: string;
  updated_by: string;
}

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [logs, setLogs] = useState<ContentLog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();
  const logsPerPage = 10;

  useEffect(() => {
    checkAdmin();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadLogs();
    }
  }, [isAdmin, currentPage]);

  const checkAdmin = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/profi-admin-2025');
        return;
      }

      // Проверяем роль админа
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();

      if (!roles) {
        toast({
          variant: "destructive",
          title: "Доступ запрещен",
          description: "У вас нет прав администратора"
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Ошибка проверки прав:', error);
      navigate('/profi-admin-2025');
    } finally {
      setLoading(false);
    }
  };

  const loadLogs = async () => {
    try {
      const from = (currentPage - 1) * logsPerPage;
      const to = from + logsPerPage - 1;

      const { data, error, count } = await supabase
        .from('site_content')
        .select('*', { count: 'exact' })
        .order('updated_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      setLogs(data || []);
      setTotalPages(Math.ceil((count || 0) / logsPerPage));
    } catch (error) {
      console.error('Ошибка загрузки логов:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось загрузить историю изменений"
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Выход выполнен",
      description: "Вы вышли из системы",
    });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">История изменений</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Последние обновления контента сайта</p>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </Button>
          </div>

          <div className="space-y-4">
            {logs.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  <FileEdit className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Нет записей об изменениях</p>
                </CardContent>
              </Card>
            ) : (
              logs.map((log) => (
                <Card key={log.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg mb-1 flex items-center gap-2">
                          <FileEdit className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="truncate">{log.page} / {log.section}</span>
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(log.updated_at), { 
                              addSuffix: true,
                              locale: ru 
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            ID: {log.updated_by?.slice(0, 8)}...
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="bg-muted/50 rounded-lg p-3 sm:p-4">
                      <p className="text-xs text-muted-foreground mb-1">Ключ: {log.content_key}</p>
                      <p className="text-sm break-words line-clamp-3">{log.content_value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Назад
              </Button>
              <span className="text-sm text-muted-foreground">
                Страница {currentPage} из {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Вперед
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;