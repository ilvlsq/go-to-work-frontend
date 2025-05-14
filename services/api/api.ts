import {  CompanyWithPosts, JobPostBaseResponse } from "@/types/types";
import { getAuthToken } from '@/utils/auth';

const API_BASE_URL = "http://15.237.184.213:8082/api/";

function handleApiError(response: Response, data?: any) {
  let message = 'Сталася помилка';
  switch (response.status) {
    case 400:
      message = data?.message || 'Некоректний запит';
      break;
    case 401:
      message = data?.message || 'Невірний логін або пароль';
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

async function get<T>(endpoint: string): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
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

async function post<T>(endpoint: string, data: any): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
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

async function put<T>(endpoint: string, data: any): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
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

async function del<T>(endpoint: string): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers,
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
  return get<JobPostBaseResponse[]>("/jobs");
}

export async function getJob(id: string): Promise<JobPostBaseResponse | null> {
  return get<JobPostBaseResponse>(`/jobs/${id}`);
}

// Companies
export async function getCompanies(params?: { search?: string; businessStream?: string; page?: number; size?: number }) {
  const queryParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) queryParams.append(key, String(value));
    });
  }
  const queryString = queryParams.toString();
  const endpoint = `companies${queryString ? `?${queryString}` : ''}`;
  return get(endpoint);
}

export async function createCompany(data: any) {
  return post('companies', data);
}

export async function getCompaniesBasic() {
  return get('companies/basic');
}

export async function getCompanyById(id: number) {
  return get(`companies/${id}`);
}

export async function updateCompany(id: number, data: any) {
  return put(`companies/${id}`, data);
}

export async function deleteCompany(id: number) {
  return del(`companies/${id}`);
}

export async function getCompanyWithPosts(id: number) {
  return get(`companies/${id}/with-posts`);
}

export async function checkCompanyExists(name: string) {
  return get(`companies/exists?name=${encodeURIComponent(name)}`);
}

export async function getAllCompaniesWithPosts(): Promise<CompanyWithPosts[]> {
  return get<CompanyWithPosts[]>(`/api/companies/all_companies`);
}

// User registration
export async function registerUser(data: any): Promise<any> {
  return post('auth/register', data);
}

// User login
export async function loginUser(data: { email: string; password: string }): Promise<any> {
  const response = await post<{ token: string }>('auth/login', data);
  if (response.token) {
    localStorage.setItem('authToken', response.token);
  }
  return response;
}

// Get current user
export async function getCurrentUser(): Promise<any> {
  return get('user/me');
}
