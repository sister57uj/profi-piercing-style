import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

// ВНИМАНИЕ: Хранение учетных данных в коде небезопасно!
// Это временное решение. Для продакшена используйте backend авторизацию.
const ADMIN_CREDENTIALS = {
  username: "adminprof",
  // Хеш пароля bJV5P/nPq3B0eHCRMUo[my)0+RKxCj
  passwordHash: "bJV5P/nPq3B0eHCRMUo[my)0+RKxCj"
};

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Проверка, если пользователь уже авторизован
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/admin-panel');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Простая проверка учетных данных
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.passwordHash) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        toast({
          title: "Успешный вход",
          description: "Добро пожаловать в админ-панель",
        });
        navigate('/admin-panel');
      } else {
        toast({
          variant: "destructive",
          title: "Ошибка входа",
          description: "Неверный логин или пароль",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Произошла ошибка при входе",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Вход для администратора</CardTitle>
          <CardDescription>
            Введите данные для доступа к панели управления
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                type="text"
                placeholder="логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Вход..." : "Войти"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;