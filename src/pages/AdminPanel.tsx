import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Settings, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/admin-login');
        return;
      }

      // Проверка роли админа
      const { data: roles, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();

      if (error || !roles) {
        toast({
          variant: "destructive",
          title: "Доступ запрещен",
          description: "У вас нет прав администратора",
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Ошибка проверки прав:', error);
      navigate('/admin-login');
    } finally {
      setLoading(false);
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
              <h1 className="text-4xl font-bold mb-2">Панель администратора</h1>
              <p className="text-muted-foreground">Управление контентом сайта</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </Button>
          </div>

          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="content">
                <FileText className="mr-2 h-4 w-4" />
                Контент
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" />
                Настройки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Редактирование контента</CardTitle>
                  <CardDescription>
                    Здесь вы сможете редактировать тексты, изображения и другой контент сайта
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Функционал редактирования контента будет добавлен</p>
                    <p className="text-sm mt-2">Вы сможете изменять все тексты и изображения на сайте</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки</CardTitle>
                  <CardDescription>
                    Управление пользователями и параметрами сайта
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Настройки будут добавлены позже</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-6 border-amber-500/50 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="text-amber-600">Инструкции</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Для редактирования контента используйте вкладку "Контент"</p>
              <p>• Все изменения сохраняются автоматически</p>
              <p>• Для создания нового админа нужно зарегистрировать пользователя и добавить ему роль admin в базе данных</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;