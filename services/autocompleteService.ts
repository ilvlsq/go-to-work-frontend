import { get } from './api/api';

let citiesCache: string[] | null = null;
let experiencesCache: any[] | null = null;
let typesCache: any[] | null = null;
let skillsCache: any[] | null = null;

export async function getCities() {
  if (citiesCache) return citiesCache;
  citiesCache = [
    'Дистанційно',
    'Київ',
    'Львів',
    'Одеса',
    'Дніпро',
    'Харків',
    'Севастополь',
    'Крим',
    'Закарпаття',
    'Вінниця',
    'Волинь',
    'Запоріжжя',
    'Житомир',
    'Івано-Франківськ',
    'Кіровоград',
    'Луганськ',
    'Миколаїв',
    'Одесса',
    'Полтава',
    'Рівне',
    'Суми',
    'Тернопіль',
    'Ужгород',
    'Херсон',
    'Хмельницький',
    'Черкаси',
    'Чернівці',
    'Чернігів',
  ];
  return citiesCache;
}

export async function getExperiences() {
  if (experiencesCache) return experiencesCache;
  const res = await get('/v1/job-posts/experiences');
  experiencesCache = res as { id: number; experience: string }[];
  return experiencesCache;
}

export async function getTypes() {
  if (typesCache) return typesCache;
  const res = await get('/v1/job-posts/types');
  typesCache = res as { id: number; name: string }[];
  return typesCache;
}

export async function getSkills() {
  if (skillsCache) return skillsCache;
  const res = await get('/v1/job-posts/skills');
  skillsCache = res as { id: number; name: string; level: number }[];
  return skillsCache;
}
