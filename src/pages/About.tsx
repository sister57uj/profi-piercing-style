import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdminHelper } from "@/components/admin/AdminHelper";
import { Award, Heart, Shield, TrendingUp, Pencil, Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { EditableText } from "@/components/admin/EditableText";
import { EmployeeEditor } from "@/components/admin/EmployeeEditor";
import { ValueCardEditor } from "@/components/admin/ValueCardEditor";
import { WorkProcessStepEditor } from "@/components/admin/WorkProcessStepEditor";
import { SafetyGuaranteeEditor } from "@/components/admin/SafetyGuaranteeEditor";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

interface WorkProcessStep {
  id: string;
  title: string;
  description: string;
  step_number: number;
  sort_order: number;
}

interface SafetyGuarantee {
  id: string;
  text: string;
  sort_order: number;
}

const About = () => {
  const { isAdmin } = useAdmin();
  const [pageTitle, setPageTitle] = useState("Наши сотрудники");
  const [historyTitle, setHistoryTitle] = useState("Наша история");
  const [historyText1, setHistoryText1] = useState("С 2017 года студия «Пирсинг Профи» создает безопасный и стильный пирсинг в Москве. Мы начали с небольшой студии и искренней любви к своему делу, и за годы работы заслужили доверие сотен клиентов.");
  const [historyText2, setHistoryText2] = useState("В 2018 году наша студия была представлена в программе НТВ «Чудо техники» как образец профессионального подхода к пирсингу в России. Это признание стало подтверждением нашего профессионализма и ответственного отношения к работе.");
  const [historyText3, setHistoryText3] = useState("Сегодня мы продолжаем совершенствоваться, следим за мировыми трендами в пирсинге и используем только проверенные методы стерилизации и лучшие материалы.");
  
  const [valuesTitle, setValuesTitle] = useState("Наши ценности");
  const [value1Title, setValue1Title] = useState("Безопасность");
  const [value1Desc, setValue1Desc] = useState("Химическая и термическая стерилизация всех инструментов. Одноразовые иглы и перчатки, которые мы вскрываем при вас.");
  const [value2Title, setValue2Title] = useState("Профессионализм");
  const [value2Desc, setValue2Desc] = useState("Мастера с медицинским образованием и сертификацией. Постоянное обучение и следование мировым стандартам.");
  const [value3Title, setValue3Title] = useState("Индивидуальность");
  const [value3Desc, setValue3Desc] = useState("Мы подбираем украшения и расположение пирсинга индивидуально, учитывая анатомию и пожелания каждого клиента.");
  const [value4Title, setValue4Title] = useState("Развитие");
  const [value4Desc, setValue4Desc] = useState("Мы следим за трендами, внедряем новые техники и регулярно повышаем квалификацию для лучшего обслуживания клиентов.");
  
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState<string | null>(null);

  const [workProcessSteps, setWorkProcessSteps] = useState<WorkProcessStep[]>([]);
  const [showAddStepDialog, setShowAddStepDialog] = useState(false);
  const [newStepTitle, setNewStepTitle] = useState("");
  const [newStepDescription, setNewStepDescription] = useState("");
  
  const [safetyGuarantees, setSafetyGuarantees] = useState<SafetyGuarantee[]>([]);
  const [showAddGuaranteeDialog, setShowAddGuaranteeDialog] = useState(false);
  const [newGuaranteeText, setNewGuaranteeText] = useState("");
  
  const [processTitle, setProcessTitle] = useState("Процесс работы");
  const [safetyTitle, setSafetyTitle] = useState("Гарантии безопасности");
  const [recognitionTitle, setRecognitionTitle] = useState("НТВ «Чудо техники» 2018");
  const [recognitionText, setRecognitionText] = useState("Наша студия была представлена как образец профессионального подхода к пирсингу в России");

  useEffect(() => {
    loadContent();
    loadEmployees();
    loadWorkProcessSteps();
    loadSafetyGuarantees();
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
        if (item.content_key === 'values_title') setValuesTitle(item.content_value);
        if (item.content_key === 'value1_title') setValue1Title(item.content_value);
        if (item.content_key === 'value1_desc') setValue1Desc(item.content_value);
        if (item.content_key === 'value2_title') setValue2Title(item.content_value);
        if (item.content_key === 'value2_desc') setValue2Desc(item.content_value);
        if (item.content_key === 'value3_title') setValue3Title(item.content_value);
        if (item.content_key === 'value3_desc') setValue3Desc(item.content_value);
        if (item.content_key === 'value4_title') setValue4Title(item.content_value);
        if (item.content_key === 'value4_desc') setValue4Desc(item.content_value);
        if (item.content_key === 'process_title') setProcessTitle(item.content_value);
        if (item.content_key === 'safety_title') setSafetyTitle(item.content_value);
        if (item.content_key === 'recognition_title') setRecognitionTitle(item.content_value);
        if (item.content_key === 'recognition_text') setRecognitionText(item.content_value);
      });
    }
  };

  const loadWorkProcessSteps = async () => {
    const { data, error } = await supabase
      .from('work_process_steps')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error loading work process steps:', error);
      toast.error('Ошибка при загрузке шагов процесса');
    } else if (data) {
      setWorkProcessSteps(data);
    }
  };

  const loadSafetyGuarantees = async () => {
    const { data, error } = await supabase
      .from('safety_guarantees')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error loading safety guarantees:', error);
      toast.error('Ошибка при загрузке гарантий');
    } else if (data) {
      setSafetyGuarantees(data);
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

  const handleAddWorkProcessStep = async () => {
    if (!newStepTitle.trim() || !newStepDescription.trim()) {
      toast.error('Заполните все поля');
      return;
    }

    try {
      const maxStepNumber = workProcessSteps.length > 0 
        ? Math.max(...workProcessSteps.map(s => s.step_number))
        : 0;

      const { error } = await supabase
        .from('work_process_steps')
        .insert({
          title: newStepTitle,
          description: newStepDescription,
          step_number: maxStepNumber + 1,
          sort_order: maxStepNumber + 1
        });

      if (error) throw error;

      toast.success('Шаг добавлен');
      setShowAddStepDialog(false);
      setNewStepTitle("");
      setNewStepDescription("");
      loadWorkProcessSteps();
    } catch (error) {
      console.error('Error adding step:', error);
      toast.error('Ошибка при добавлении');
    }
  };

  const handleAddSafetyGuarantee = async () => {
    if (!newGuaranteeText.trim()) {
      toast.error('Введите текст гарантии');
      return;
    }

    try {
      const maxSortOrder = safetyGuarantees.length > 0 
        ? Math.max(...safetyGuarantees.map(g => g.sort_order))
        : 0;

      const { error } = await supabase
        .from('safety_guarantees')
        .insert({
          text: newGuaranteeText,
          sort_order: maxSortOrder + 1
        });

      if (error) throw error;

      toast.success('Гарантия добавлена');
      setShowAddGuaranteeDialog(false);
      setNewGuaranteeText("");
      loadSafetyGuarantees();
    } catch (error) {
      console.error('Error adding guarantee:', error);
      toast.error('Ошибка при добавлении');
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
              <EditableText
                initialValue={valuesTitle}
                onSave={setValuesTitle}
                page="about"
                section="values"
                contentKey="values_title"
                as="h2"
                className="text-3xl font-display font-semibold mb-8 text-center"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ValueCardEditor
                  icon={<Shield className="h-10 w-10 text-primary mb-4" />}
                  title={value1Title}
                  description={value1Desc}
                  page="about"
                  section="values"
                  contentKey="value1"
                  onSave={(title, desc) => {
                    setValue1Title(title);
                    setValue1Desc(desc);
                  }}
                />
                <ValueCardEditor
                  icon={<Award className="h-10 w-10 text-primary mb-4" />}
                  title={value2Title}
                  description={value2Desc}
                  page="about"
                  section="values"
                  contentKey="value2"
                  onSave={(title, desc) => {
                    setValue2Title(title);
                    setValue2Desc(desc);
                  }}
                />
                <ValueCardEditor
                  icon={<Heart className="h-10 w-10 text-accent mb-4" />}
                  title={value3Title}
                  description={value3Desc}
                  page="about"
                  section="values"
                  contentKey="value3"
                  onSave={(title, desc) => {
                    setValue3Title(title);
                    setValue3Desc(desc);
                  }}
                />
                <ValueCardEditor
                  icon={<TrendingUp className="h-10 w-10 text-primary mb-4" />}
                  title={value4Title}
                  description={value4Desc}
                  page="about"
                  section="values"
                  contentKey="value4"
                  onSave={(title, desc) => {
                    setValue4Title(title);
                    setValue4Desc(desc);
                  }}
                />
              </div>
            </div>

            {/* Процесс работы */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-12">
                <EditableText
                  initialValue={processTitle}
                  onSave={setProcessTitle}
                  page="about"
                  section="process"
                  contentKey="process_title"
                  as="h2"
                  className="text-4xl font-display font-bold text-center flex-1"
                />
                {isAdmin && (
                  <Button onClick={() => setShowAddStepDialog(true)} size="sm" className="ml-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {workProcessSteps.map((step) => (
                  <WorkProcessStepEditor
                    key={step.id}
                    step={step}
                    onUpdate={loadWorkProcessSteps}
                  />
                ))}
              </div>
            </div>

            {/* Гарантии безопасности */}
            <div className="bg-card p-8 rounded-lg border border-primary/20 mb-16">
              <div className="flex items-center justify-between mb-6">
                <EditableText
                  initialValue={safetyTitle}
                  onSave={setSafetyTitle}
                  page="about"
                  section="safety"
                  contentKey="safety_title"
                  as="h2"
                  className="text-3xl font-display font-semibold text-primary text-center flex-1"
                />
                {isAdmin && (
                  <Button onClick={() => setShowAddGuaranteeDialog(true)} size="sm" className="ml-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {safetyGuarantees.map((guarantee) => (
                  <SafetyGuaranteeEditor
                    key={guarantee.id}
                    guarantee={guarantee}
                    onUpdate={loadSafetyGuarantees}
                  />
                ))}
              </div>
            </div>

            {/* Признание */}
            <div className="text-center animate-fade-in">
              <div className="inline-block bg-primary/10 p-8 rounded-lg border border-primary/30">
                <EditableText
                  initialValue={recognitionTitle}
                  onSave={setRecognitionTitle}
                  page="about"
                  section="recognition"
                  contentKey="recognition_title"
                  as="p"
                  className="text-2xl font-semibold mb-2"
                />
                <EditableText
                  initialValue={recognitionText}
                  onSave={setRecognitionText}
                  page="about"
                  section="recognition"
                  contentKey="recognition_text"
                  as="p"
                  className="text-muted-foreground"
                  multiline
                />
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

      {/* Add Work Process Step Dialog */}
      <Dialog open={showAddStepDialog} onOpenChange={setShowAddStepDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить шаг процесса</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Заголовок"
              value={newStepTitle}
              onChange={(e) => setNewStepTitle(e.target.value)}
            />
            <Textarea
              placeholder="Описание"
              value={newStepDescription}
              onChange={(e) => setNewStepDescription(e.target.value)}
              rows={3}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowAddStepDialog(false)}>
                Отмена
              </Button>
              <Button onClick={handleAddWorkProcessStep}>
                Добавить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Safety Guarantee Dialog */}
      <Dialog open={showAddGuaranteeDialog} onOpenChange={setShowAddGuaranteeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить гарантию безопасности</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Текст гарантии"
              value={newGuaranteeText}
              onChange={(e) => setNewGuaranteeText(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowAddGuaranteeDialog(false)}>
                Отмена
              </Button>
              <Button onClick={handleAddSafetyGuarantee}>
                Добавить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default About;
