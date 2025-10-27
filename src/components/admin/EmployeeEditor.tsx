import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

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

interface EmployeeEditorProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export const EmployeeEditor = ({ employee, isOpen, onClose, onUpdate }: EmployeeEditorProps) => {
  const [firstName, setFirstName] = useState(employee?.first_name || "");
  const [lastName, setLastName] = useState(employee?.last_name || "");
  const [description, setDescription] = useState(employee?.description || "");
  const [education, setEducation] = useState(employee?.education || "");
  const [experience, setExperience] = useState(employee?.experience || "");
  const [photoUrl, setPhotoUrl] = useState(employee?.photo_url || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Пожалуйста, выберите изображение');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Размер файла не должен превышать 5MB');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `employees/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

      setPhotoUrl(publicUrl);
      toast.success('Фото загружено');
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Ошибка при загрузке фото');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error('Заполните имя и фамилию');
      return;
    }

    setSaving(true);
    try {
      const employeeData = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        description: description.trim() || null,
        education: education.trim() || null,
        experience: experience.trim() || null,
        photo_url: photoUrl || null,
      };

      if (employee) {
        // Update existing employee
        const { error } = await supabase
          .from('employees')
          .update(employeeData)
          .eq('id', employee.id);

        if (error) throw error;
        toast.success('Сотрудник обновлен');
      } else {
        // Create new employee
        const { error } = await supabase
          .from('employees')
          .insert(employeeData);

        if (error) throw error;
        toast.success('Сотрудник добавлен');
      }

      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error saving employee:', error);
      toast.error('Ошибка при сохранении');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {employee ? 'Редактировать сотрудника' : 'Добавить сотрудника'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Photo Upload */}
          <div>
            <Label>Фото</Label>
            <div className="mt-2">
              {photoUrl ? (
                <div className="relative inline-block">
                  <img
                    src={photoUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setPhotoUrl("")}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadPhoto}
                    disabled={uploading}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {uploading ? 'Загрузка...' : 'Загрузить'}
                    </span>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* First Name */}
          <div>
            <Label htmlFor="firstName">Имя *</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Екатерина"
            />
          </div>

          {/* Last Name */}
          <div>
            <Label htmlFor="lastName">Фамилия *</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Васина"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Профессиональный пирсер с медицинским образованием"
              rows={3}
            />
          </div>

          {/* Education */}
          <div>
            <Label htmlFor="education">Образование</Label>
            <Textarea
              id="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="Медицинское училище №13, специальность 'Сестринское дело'"
              rows={2}
            />
          </div>

          {/* Experience */}
          <div>
            <Label htmlFor="experience">Опыт работы</Label>
            <Textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="С 2017 года работает в сфере пирсинга"
              rows={2}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={onClose} disabled={saving}>
              Отмена
            </Button>
            <Button onClick={handleSave} disabled={saving || uploading}>
              {saving ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
