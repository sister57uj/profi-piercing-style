import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdminHelper } from "@/components/admin/AdminHelper";
import { Award, Heart, Shield, TrendingUp, CheckCircle, Pencil, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { EditableText } from "@/components/admin/EditableText";
import { EmployeeEditor } from "@/components/admin/EmployeeEditor";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  description: string | null;
  education: string | null;
  experience: string | null;
  photo_url: string | null;
  sort_order: number;
}

const About = () => {
  const { isAdmin } = useAdmin();
  const [pageTitle, setPageTitle] = useState("Наши сотрудники");
  const [historyTitle, setHistoryTitle] = useState("Наша история");
  const [historyText1, setHistoryText1] = useState("С 2017 года студия «Пирсинг Профи» создает безопасный и стильный пирсинг в Москве. Мы начали с небольшой студии и искренней любви к своему делу, и за годы работы заслужили доверие сотен клиентов.");
  const [historyText2, setHistoryText2] = useState("В 2018 году наша студия была представлена в программе НТВ «Чудо техники» как образец профессионального подхода к пирсингу в России. Это признание стало подтверждением нашего профессионализма и ответственного отношения к работе.");
  const [historyText3, setHistoryText3] = useState("Сегодня мы продолжаем совершенствоваться, следим за мировыми трендами в пирсинге и используем только проверенные методы стерилизации и лучшие материалы.");
  
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState<string | null>(null);

  useEffect(() => {
    loadContent();
    loadEmployees();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .eq('page', 'about');

    if (data) {
      data.forEach(item => {
        if (item.content_key === 'page_title') setPageTitle(item.content_value);
        if (item.content_key === 'history_title') setHistoryTitle(item.content_value);
        if (item.content_key === 'history_text_1') setHistoryText1(item.content_value);
        if (item.content_key === 'history_text_2') setHistoryText2(item.content_value);
        if (item.content_key === 'history_text_3') setHistoryText3(item.content_value);
      });
    }
  };

  const loadEmployees = async () => {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error loading employees:', error);
      toast.error('Ошибка при загрузке сотрудников');
    } else if (data) {
      setEmployees(data);
    }
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsEditorOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsEditorOpen(true);
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Сотрудник удален');
      loadEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.error('Ошибка при удалении');
    } finally {
      setDeletingEmployeeId(null);
    }
  };
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Наши сотрудники */}
            <div className="mb-16 animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <EditableText
                  initialValue={pageTitle}
                  onSave={setPageTitle}
                  page="about"
                  section="team"
                  contentKey="page_title"
                  as="h2"
                  className="text-4xl md:text-5xl font-display font-bold text-center flex-1"
                />
                {isAdmin && (
                  <Button onClick={handleAddEmployee} size="sm" className="ml-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map((employee) => (
                  <div key={employee.id} className="bg-card rounded-lg border border-primary/20 overflow-hidden hover-lift relative group">
                    <div className="aspect-[3/4] relative overflow-hidden">
                      {employee.photo_url ? (
                        <img 
                          src={employee.photo_url} 
                          alt={`${employee.first_name} ${employee.last_name}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-6xl text-muted-foreground">
                            {employee.first_name[0]}{employee.last_name[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-primary">
                        {employee.first_name} {employee.last_name}
                      </h3>
                      {employee.description && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {employee.description}
                        </p>
                      )}
                      <div className="space-y-1 text-xs text-muted-foreground">
                        {employee.education && (
                          <p><strong className="text-foreground">Образование:</strong> {employee.education}</p>
                        )}
                        {employee.experience && (
                          <p><strong className="text-foreground">Опыт:</strong> {employee.experience}</p>
                        )}
                      </div>
                    </div>
                    {isAdmin && (
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleEditEmployee(employee)}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setDeletingEmployeeId(employee.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* История */}
            <div className="mb-16 animate-fade-in">
              <div className="bg-card p-8 rounded-lg border border-border">
                <EditableText
                  initialValue={historyTitle}
                  onSave={setHistoryTitle}
                  page="about"
                  section="history"
                  contentKey="history_title"
                  as="h2"
                  className="text-3xl font-display font-semibold mb-4 text-primary"
                />
                <div className="space-y-4 text-muted-foreground">
                  <EditableText
                    initialValue={historyText1}
                    onSave={setHistoryText1}
                    page="about"
                    section="history"
                    contentKey="history_text_1"
                    multiline
                    as="p"
                  />
                  <EditableText
                    initialValue={historyText2}
                    onSave={setHistoryText2}
                    page="about"
                    section="history"
                    contentKey="history_text_2"
                    multiline
                    as="p"
                  />
                  <EditableText
                    initialValue={historyText3}
                    onSave={setHistoryText3}
                    page="about"
                    section="history"
                    contentKey="history_text_3"
                    multiline
                    as="p"
                  />
                </div>
              </div>
            </div>

            {/* Ценности */}
            <div className="mb-16">
              <h2 className="text-3xl font-display font-semibold mb-8 text-center">
                Наши ценности
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border border-border hover-glow animate-fade-in">
                  <Shield className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-primary">Безопасность</h3>
                  <p className="text-muted-foreground">
                    Химическая и термическая стерилизация всех инструментов. 
                    Одноразовые иглы и перчатки, которые мы вскрываем при вас.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border hover-glow animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <Award className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-primary">Профессионализм</h3>
                  <p className="text-muted-foreground">
                    Мастера с медицинским образованием и сертификацией. 
                    Постоянное обучение и следование мировым стандартам.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border hover-glow animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <Heart className="h-10 w-10 text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-primary">Индивидуальность</h3>
                  <p className="text-muted-foreground">
                    Мы подбираем украшения и расположение пирсинга индивидуально, 
                    учитывая анатомию и пожелания каждого клиента.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border hover-glow animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <TrendingUp className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-primary">Развитие</h3>
                  <p className="text-muted-foreground">
                    Мы следим за трендами, внедряем новые техники и регулярно 
                    повышаем квалификацию для лучшего обслуживания клиентов.
                  </p>
                </div>
              </div>
            </div>

            {/* Процесс работы */}
            <div className="mb-16">
              <h2 className="text-4xl font-display font-bold mb-12 text-center">
                Процесс работы
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {[
                  { title: "Консультация", description: "Обсуждаем ваши пожелания, подбираем украшение, рассказываем о процессе" },
                  { title: "Подготовка", description: "Дезинфекция зоны, разметка, подготовка стерильных инструментов" },
                  { title: "Прокол", description: "Быстрая и точная процедура с одноразовой иглой, вскрытой при вас" },
                  { title: "Установка украшения", description: "Установка выбранного украшения из гипоаллергенных материалов" },
                  { title: "Рекомендации", description: "Подробные инструкции по уходу за пирсингом в период заживления" }
                ].map((step, index) => (
                  <div
                    key={step.title}
                    className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-all hover-glow text-center animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-semibold text-primary">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Гарантии безопасности */}
            <div className="bg-card p-8 rounded-lg border border-primary/20 mb-16">
              <h2 className="text-3xl font-display font-semibold mb-6 text-primary text-center">
                Гарантии безопасности
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Химическая стерилизация всех многоразовых инструментов",
                  "Термическая обработка в сухожаровом шкафу",
                  "Одноразовые иглы, вскрываемые при клиенте",
                  "Одноразовые перчатки для каждой процедуры",
                  "Гипоаллергенные материалы украшений",
                  "Подробные инструкции по уходу"
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Признание */}
            <div className="text-center animate-fade-in">
              <div className="inline-block bg-primary/10 p-8 rounded-lg border border-primary/30">
                <p className="text-2xl font-semibold mb-2">НТВ «Чудо техники» 2018</p>
                <p className="text-muted-foreground">
                  Наша студия была представлена как образец профессионального подхода к пирсингу в России
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AdminHelper />
      
      {/* Employee Editor Dialog */}
      <EmployeeEditor
        employee={editingEmployee}
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingEmployee(null);
        }}
        onUpdate={loadEmployees}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingEmployeeId} onOpenChange={() => setDeletingEmployeeId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить сотрудника?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Карточка сотрудника будет удалена навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingEmployeeId && handleDeleteEmployee(deletingEmployeeId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default About;
