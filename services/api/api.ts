import { Company, JobPostBaseResponse, JobPostsParams, RecommendetJobsType } from '@/types/types';
import { getAuthToken, clearAuthData } from '@/utils/auth';

const API_BASE_URL = 'http://35.180.134.138:8082/api';

function handleApiError(response: Response, data?: any) {
  let message = 'Сталася помилка';
  switch (response.status) {
    case 400:
      message = data?.message || 'Некоректний запит';
      break;
    case 401:
      message = data?.message || 'Невірний логін або пароль';
      clearAuthData();
      break;
    case 403:
      message = data?.message || 'Доступ заборонено';
      break;
    case 404:
      message = data?.message || 'Не знайдено';
      break;
    case 409:
      message = data?.message || 'Обліковий запис вже існує';
      break;
    case 500:
      message = data?.message || 'Внутрішня помилка сервера';
      break;
    default:
      message = data?.message || message;
  }
  const error: any = new Error(message);
  error.status = response.status;
  return error;
}

export async function get<T>(endpoint: string): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers,
  });
  let data;
  try {
    data = await response.clone().json();
  } catch {}
  if (!response.ok) {
    throw handleApiError(response, data);
  }
  return response.json();
}

export async function post<T>(endpoint: string, data: any): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  let respData;
  try {
    respData = await response.clone().json();
  } catch {}
  if (!response.ok) {
    throw handleApiError(response, respData);
  }
  return response.json();
}

export async function getJobs(): Promise<JobPostBaseResponse[]> {
  return get<JobPostBaseResponse[]>('/jobs');
}

export async function getJob(id: string): Promise<JobPostBaseResponse | null> {
  return get<JobPostBaseResponse>(`/v1/job-posts/${id}`);
}

export async function getSimilarJobs(id: string): Promise<JobPostBaseResponse[]> {
  return get(`/jobs/${id}/similar`);
}

export async function getCompanies(params?: {
  search?: string;
  businessStream?: string;
  page?: number;
  size?: number;
}) {
  const queryParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) queryParams.append(key, String(value));
    });
  }
  const queryString = queryParams.toString();
  const endpoint = `/companies${queryString ? `?${queryString}` : ''}`;
  return get(endpoint);
}

export async function getCompanyById(id: string): Promise<Company> {
  return get(`/v1/companies/${id}`);
}

export async function registerUser(data: any): Promise<any> {
  const response = await post<{ token: string }>('/auth/register', data);
  if (response.token) {
    localStorage.setItem('authToken', response.token);
  }
  return response;
}

export async function loginUser(data: { email: string; password: string }): Promise<any> {
  const response = await post<{ token: string }>('/auth/login', data);
  if (response.token) {
    localStorage.setItem('authToken', response.token);
  }
  return response;
}

export async function getCurrentUser(): Promise<any> {
  return get('/v1/user/me');
}

export async function getRecommendetJobs(): Promise<RecommendetJobsType[]> {
  return get('/v1/statistics/companies/top-with-vacancies');
}

export async function getJobPosts(params?: JobPostsParams): Promise<JobPostBaseResponse[]> {
  const queryParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (key === 'skillIds' && Array.isArray(value)) {
          value.forEach((skillId) => {
            queryParams.append('skillIds', String(skillId));
          });
        } else {
          queryParams.append(key, String(value));
        }
      }
    });
  }

  const queryString = queryParams.toString();
  const endpoint = `/v1/job-posts${queryString ? `?${queryString}` : ''}`;

  return get<JobPostBaseResponse[]>(endpoint);
}
