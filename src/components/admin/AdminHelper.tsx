import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';

export const AdminHelper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useAdmin();

  if (!isAdmin) return null;

  return (
    <>
      {/* Кнопка помощи */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full shadow-lg"
          variant={isOpen ? "secondary" : "default"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <HelpCircle className="h-5 w-5" />}
        </Button>
      </div>

      {/* Панель инструкций */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-40 bg-background border border-border rounded-lg shadow-xl p-6 max-w-md animate-fade-in">
          <h3 className="text-lg font-bold mb-4">Режим редактирования</h3>
          
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold mb-2">📝 Редактирование текста:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Наведите на текст — появится иконка карандаша</li>
                <li>Нажмите на карандаш для редактирования</li>
                <li>Изменения сохраняются в базу данных</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">🖼️ Управление галереей:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Кнопка "Редактировать галерею" внизу справа</li>
                <li>Добавляйте, удаляйте и меняйте порядок фото</li>
                <li>Звездочка — выбор обложки</li>
                <li>Стрелки — изменение порядка</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">💡 Советы:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Все изменения сохраняются автоматически</li>
                <li>Изменения видны сразу после сохранения</li>
                <li>Для выхода нажмите кнопку в шапке сайта</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Вы вошли как администратор. Все посетители видят обычную версию сайта.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};