import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Input } from '@/components/ui/Input';
import MultiAutocompleteInput from '@/components/ui/MultiAutocompleteInput';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import { getSkills } from '@/services/autocompleteService';
import { TrashIcon } from '@heroicons/react/24/outline';
import type { SeekerProfile } from '@/types/seekerProfile';
import {
  educationArraySchema,
  experienceArraySchema,
  profileSchema,
} from '@/validation/seekerProfileSchema';
import { getCurrentUserInfo, updateCurrentUserInfo, updateCurrentUserCv } from '@/services/api/api';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

function getInitialForm(profile: SeekerProfile | null) {
  return {
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    dateOfBirth: profile?.dateOfBirth ? profile.dateOfBirth.slice(0, 10) : '',
    currentMonthlySalary:
      typeof profile?.currentMonthlySalary === 'number' ? profile.currentMonthlySalary : 0,
    email: profile?.email || '',
    contactNumber: profile?.contactNumber || '',
    skills:
      profile?.skills?.map((s) => ({
        skillId: s.skillId,
        description: s.description,
        skillLevel: 3,
      })) || [],
    education: profile?.education?.length ? profile.education : [],
    experience: profile?.experience?.length ? profile.experience : [],
    description: (profile as any)?.description || '',
    cvUrl: profile?.cvUrl || '',
    registrationDate: profile?.registrationDate || null,
  };
}

interface ProfileEditFormProps {
  profile: SeekerProfile | null;
  onProfileUpdate: (p: SeekerProfile) => void;
}

export default function ProfileEditForm({ profile, onProfileUpdate }: ProfileEditFormProps) {
  const [form, setForm] = useState<ReturnType<typeof getInitialForm>>(getInitialForm(profile));
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUploading, setCvUploading] = useState(false);
  const [cvError, setCvError] = useState<string | null>(null);
  const [skillsOptions, setSkillsOptions] = useState<any[]>([]);
  const [eduErrors, setEduErrors] = useState<any[]>([]);
  const [expErrors, setExpErrors] = useState<any[]>([]);
  const eduErrorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expErrorRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    getSkills().then((skills) => {
      setSkillsOptions(skills);
    });

    console.log('profile', profile);
  }, []);

  useEffect(() => {
    setForm(getInitialForm(profile));
    setDirty(false);
    setErrors({});
  }, [profile]);

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
    setDirty(true);
  };

  const handleSkillChange = (skills: any[]) => {
    setForm((prev: any) => ({
      ...prev,
      skills: skills.map((s) => ({ skillId: s.id, description: s.label, skillLevel: 3 })),
    }));
    setDirty(true);
  };

  const handleQuillChange = (value: string) => {
    setForm((prev: any) => ({ ...prev, description: value }));
    setDirty(true);
  };

  const handleCvDrop = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCvFile(file);
      setDirty(true);
      setCvUploading(true);
      setCvError(null);
      try {
        const formData = new FormData();
        formData.append('file', file);
        const cvUrl = await updateCurrentUserCv(formData);
        console.log('CV upload response:', cvUrl);
        if (cvUrl) {
          setForm((prev: any) => ({ ...prev, cvUrl: cvUrl.data.cvUrl }));
        } else {
          setCvError('Не вдалося отримати посилання на файл');
        }
      } catch (err) {
        console.error('CV upload error:', err);
        setCvError('Помилка при завантаженні файлу');
      } finally {
        setCvUploading(false);
      }
    }
  }, []);

  const validate = () => {
    let validMain = true;
    let validEdu = true;
    let validExp = true;
    let firstErrorIdx: { type: 'edu' | 'exp'; idx: number } | null = null;
    const result = profileSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err: any) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      validMain = false;
    } else {
      setErrors({});
    }
    const eduResult = educationArraySchema.safeParse(form.education);
    if (!eduResult.success) {
      const eduFieldErrors: any[] = [];
      eduResult.error.errors.forEach((err: any) => {
        const idx = err.path[0];
        if (!eduFieldErrors[idx]) eduFieldErrors[idx] = {};
        eduFieldErrors[idx][err.path[1]] = err.message;
        if (!firstErrorIdx) firstErrorIdx = { type: 'edu', idx };
      });
      setEduErrors(eduFieldErrors);
      validEdu = false;
    } else {
      setEduErrors([]);
    }
    const expResult = experienceArraySchema.safeParse(form.experience);
    if (!expResult.success) {
      const expFieldErrors: any[] = [];
      expResult.error.errors.forEach((err: any) => {
        const idx = err.path[0];
        if (!expFieldErrors[idx]) expFieldErrors[idx] = {};
        expFieldErrors[idx][err.path[1]] = err.message;
        if (!firstErrorIdx) firstErrorIdx = { type: 'exp', idx };
      });
      setExpErrors(expFieldErrors);
      validExp = false;
    } else {
      setExpErrors([]);
    }
    setTimeout(() => {
      if (firstErrorIdx) {
        if (firstErrorIdx.type === 'edu' && eduErrorRefs.current[firstErrorIdx.idx]) {
          eduErrorRefs.current[firstErrorIdx.idx]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
        if (firstErrorIdx.type === 'exp' && expErrorRefs.current[firstErrorIdx.idx]) {
          expErrorRefs.current[firstErrorIdx.idx]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }
    }, 100);
    return validMain && validEdu && validExp;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setDirty(false);
    const preparedSkills = form.skills.map((s: any) => ({
      skillId: Number(s.skillId),
      skillLevel: 3,
      description: s.description,
    }));
    onProfileUpdate({ ...(profile ?? {}), ...form, skills: preparedSkills, id: profile?.id ?? 0 });
  };

  // EDUCATION
  const handleEducationChange = (idx: number, field: string, value: any) => {
    setForm((prev: any) => {
      const education = [...prev.education];
      education[idx][field] = value;
      return { ...prev, education };
    });
    setDirty(true);
  };
  const addEducation = () => {
    setForm((prev: any) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          certificateDegreeId: 0,
          major: '',
          instituteOrUniversityName: '',
          startDate: '',
          completionDate: '',
          cgpa: 0,
        },
      ],
    }));
    setDirty(true);
  };
  const removeEducation = (idx: number) => {
    setForm((prev: any) => {
      const education = prev.education.filter((_: any, i: number) => i !== idx);
      return { ...prev, education };
    });
    setDirty(true);
  };

  // EXPERIENCE
  const handleExperienceChange = (idx: number, field: string, value: any) => {
    setForm((prev: any) => {
      const experience = [...prev.experience];
      experience[idx][field] = value;
      return { ...prev, experience };
    });
    setDirty(true);
  };
  const handleExperienceDescription = (idx: number, value: string) => {
    setForm((prev: any) => {
      const experience = [...prev.experience];
      experience[idx].description = value;
      return { ...prev, experience };
    });
    setDirty(true);
  };
  const addExperience = () => {
    setForm((prev: any) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          isCurrentJob: false,
          startDate: '',
          endDate: '',
          jobTitle: '',
          companyName: '',
          jobLocationCity: '',
          jobLocationCountry: '',
          description: '',
        },
      ],
    }));
    setDirty(true);
  };
  const removeExperience = (idx: number) => {
    setForm((prev: any) => {
      const experience = prev.experience.filter((_: any, i: number) => i !== idx);
      return { ...prev, experience };
    });
    setDirty(true);
  };

  return (
    <form
      className="mx-auto flex max-w-2xl flex-col gap-8 rounded-xl bg-white p-8"
      onSubmit={handleSave}
    >
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold">Профіль користувача</h1>
        {dirty && (
          <Button variant="primary" type="submit">
            Зберегти
          </Button>
        )}
      </div>
      {/* Личные данные */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h2 className="mb-2 font-semibold">Особиста інформація</h2>
          <div className="space-y-3 text-sm">
            <label className="mb-1 block text-xs font-medium">Імʼя *</label>
            <Input
              placeholder="Імʼя"
              value={form.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={errors.firstName ? 'border-red-400' : ''}
            />
            {errors.firstName && <div className="text-xs text-red-500">{errors.firstName}</div>}
            <label className="mb-1 block text-xs font-medium">Прізвище *</label>
            <Input
              placeholder="Прізвище"
              value={form.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={errors.lastName ? 'border-red-400' : ''}
            />
            {errors.lastName && <div className="text-xs text-red-500">{errors.lastName}</div>}
            <label className="mb-1 block text-xs font-medium">Дата народження</label>
            <Input
              placeholder="Дата народження"
              type="date"
              value={form.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            />
            <label className="mb-1 block text-xs font-medium">Номер телефону *</label>
            <Input
              placeholder="Номер телефону"
              value={form.contactNumber}
              onChange={(e) => handleChange('contactNumber', e.target.value)}
              className={errors.contactNumber ? 'border-red-400' : ''}
            />
            {errors.contactNumber && (
              <div className="text-xs text-red-500">{errors.contactNumber}</div>
            )}
            <label className="mb-1 block text-xs font-medium">Email *</label>
            <Input
              placeholder="Email"
              value={form.email}
              readOnly
              className="cursor-not-allowed bg-gray-100"
            />
            <label className="mb-1 block text-xs font-medium">Місячна зарплата (грн)</label>
            <Input
              placeholder="Місячна зарплата (грн)"
              type="number"
              value={form.currentMonthlySalary}
              onChange={(e) => handleChange('currentMonthlySalary', Number(e.target.value))}
            />
          </div>
        </div>
        <div>
          <h2 className="mb-2 font-semibold">Навички</h2>
          <MultiAutocompleteInput
            options={skillsOptions.map((s) => ({ id: s.id, label: s.name }))}
            value={form.skills.map((s: any) => ({ id: s.skillId, label: s.description }))}
            onChange={handleSkillChange}
            placeholder="Скіли"
            className="mb-2"
          />
        </div>
      </section>
      {/* Education */}
      <section>
        <h2 className="mb-2 font-semibold">Освіта</h2>
        <div className="flex flex-col gap-4">
          {form.education.length === 0 && (
            <div className="text-sm text-gray-400">Немає записів про освіту</div>
          )}
          {form.education.map((edu: any, idx: number) => (
            <div
              key={idx}
              className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-white px-0 py-2"
            >
              <Input
                placeholder="Назва закладу *"
                value={edu.instituteOrUniversityName}
                onChange={(e) =>
                  handleEducationChange(idx, 'instituteOrUniversityName', e.target.value)
                }
                className="mb-1"
              />
              <Input
                placeholder="Спеціальність *"
                value={edu.major}
                onChange={(e) => handleEducationChange(idx, 'major', e.target.value)}
                className="mb-1"
              />
              <label className="mb-1 block text-xs font-medium">Ступінь/Диплом *</label>
              <Input
                placeholder="Ступінь/Диплом *"
                type="number"
                value={edu.certificateDegreeId ?? ''}
                onChange={(e) =>
                  handleEducationChange(idx, 'certificateDegreeId', Number(e.target.value) || 0)
                }
                className="mb-1"
              />
              <div className="mb-1 flex gap-2">
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-medium">Початок *</label>
                  <Input
                    type="date"
                    placeholder="Початок *"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(idx, 'startDate', e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-medium">Завершення *</label>
                  <Input
                    type="date"
                    placeholder="Завершення *"
                    value={edu.completionDate}
                    onChange={(e) => handleEducationChange(idx, 'completionDate', e.target.value)}
                  />
                </div>
              </div>
              <label className="mb-1 block text-xs font-medium">Середній бал (CGPA) *</label>
              <Input
                placeholder="Середній бал (CGPA) *"
                type="number"
                value={edu.cgpa ?? ''}
                onChange={(e) => handleEducationChange(idx, 'cgpa', Number(e.target.value) || 0)}
              />
              {eduErrors[idx] && (
                <div
                  ref={(el) => {
                    eduErrorRefs.current[idx] = el;
                  }}
                  className="mb-2 flex flex-col gap-1 rounded-md border border-red-200 bg-red-50 p-2"
                >
                  {Object.entries(eduErrors[idx]).map(([field, msg], i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-red-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                        />
                      </svg>
                      <span>{msg as string}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center justify-center rounded-full p-1 transition hover:bg-red-50"
                  style={{ width: 32, height: 32 }}
                  onClick={() => removeEducation(idx)}
                  aria-label="Видалити освіту"
                >
                  <TrashIcon className="h-4 w-4 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            </div>
          ))}
          <Button type="button" variant="secondary" onClick={addEducation}>
            Додати освіту
          </Button>
        </div>
      </section>
      {/* Experience */}
      <section>
        <h2 className="mb-2 font-semibold">Досвід роботи</h2>
        <div className="flex flex-col gap-4">
          {form.experience.length === 0 && (
            <div className="text-sm text-gray-400">Немає записів про досвід</div>
          )}
          {form.experience.map((exp: any, idx: number) => (
            <div
              key={idx}
              className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-white px-0 py-2"
            >
              <Input
                placeholder="Компанія *"
                value={exp.companyName}
                onChange={(e) => handleExperienceChange(idx, 'companyName', e.target.value)}
                className="mb-1"
              />
              <Input
                placeholder="Посада *"
                value={exp.jobTitle}
                onChange={(e) => handleExperienceChange(idx, 'jobTitle', e.target.value)}
                className="mb-1"
              />
              <div className="mb-1 flex gap-2">
                <Input
                  placeholder="Місто *"
                  value={exp.jobLocationCity}
                  onChange={(e) => handleExperienceChange(idx, 'jobLocationCity', e.target.value)}
                />
                <Input
                  placeholder="Країна *"
                  value={exp.jobLocationCountry}
                  onChange={(e) =>
                    handleExperienceChange(idx, 'jobLocationCountry', e.target.value)
                  }
                />
              </div>
              <div className="mb-1 flex items-center gap-2">
                <Input
                  type="date"
                  placeholder="Початок *"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(idx, 'startDate', e.target.value)}
                />
                <Input
                  type="date"
                  placeholder="Завершення *"
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(idx, 'endDate', e.target.value)}
                  disabled={exp.isCurrentJob}
                />
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={exp.isCurrentJob}
                    onChange={(e) => handleExperienceChange(idx, 'isCurrentJob', e.target.checked)}
                  />
                  Теперішня робота
                </label>
              </div>
              <div className="mb-2">
                <ReactQuill
                  value={exp.description}
                  onChange={(val) => handleExperienceDescription(idx, val)}
                  modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'clean'],
                    ],
                  }}
                  formats={['bold', 'italic', 'underline', 'list', 'bullet', 'link']}
                  placeholder="Опис досвіду *"
                />
              </div>
              {expErrors[idx] && (
                <div
                  ref={(el) => {
                    expErrorRefs.current[idx] = el;
                  }}
                  className="mb-2 flex flex-col gap-1 rounded-md border border-red-200 bg-red-50 p-2"
                >
                  {Object.entries(expErrors[idx]).map(([field, msg], i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-red-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                        />
                      </svg>
                      <span>{msg as string}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center justify-center rounded-full p-1 transition hover:bg-red-50"
                  style={{ width: 32, height: 32 }}
                  onClick={() => removeExperience(idx)}
                  aria-label="Видалити досвід"
                >
                  <TrashIcon className="h-4 w-4 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            </div>
          ))}
          <Button type="button" variant="secondary" onClick={addExperience}>
            Додати досвід
          </Button>
        </div>
      </section>

      {/* CV */}
      <section>
        <h2 className="mb-2 font-semibold">CV (резюме)</h2>
        <div className="flex flex-col gap-2">
          {form.cvUrl && (
            <div className="mb-2 block text-sm font-medium">
              <a
                href={form.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Посилання на ваше поточне резюме
              </a>
            </div>
          )}
          <label
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 text-gray-500 transition hover:border-[#38b48e]"
            style={{ minHeight: 100 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mb-2 h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16v-8m0 0-3.5 3.5M12 8l3.5 3.5M4.75 19.25h14.5A2.25 2.25 0 0021.5 17V7A2.25 2.25 0 0019.25 4.75H4.75A2.25 2.25 0 002.5 7v10a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <span className="text-base">
              Перетягніть файл сюди або{' '}
              <span className="text-[#38b48e] underline">оберіть файл</span>
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleCvDrop}
              className="hidden"
            />
            {cvUploading && <div className="mt-2 text-xs text-blue-500">Завантаження...</div>}
            {cvError && <div className="mt-2 text-xs text-red-500">{cvError}</div>}
            {cvFile && !cvUploading && !(typeof form === 'object' && form && form.cvUrl) && (
              <div className="mt-2 text-xs text-gray-600">Вибрано файл: {cvFile.name}</div>
            )}
          </label>
        </div>
      </section>
    </form>
  );
}
