import {  CompanyWithPosts, JobPostBaseResponse } from "@/types/types";

const API_BASE_URL = "http://13.38.59.88:8081";

async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

async function post<T>(endpoint: string, data: any): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getJobs(): Promise<JobPostBaseResponse[]> {

  //let response = await get<JobPostBaseResponse[]>("/jobs");
  let response = [{
    id: 1,
    company: {
      id: 1,
      name: "Company 1",
      companyLogo: "https://static.vecteezy.com/system/resources/thumbnails/012/986/755/small/abstract-circle-logo-icon-free-png.png",
    },
    type: {
      id: 1,
      type: "Full-Time",
    },
    gradation: {
      id: 1,
      gradation: "Senior",
    },
    title: "Job 1",
    jobDescription: "Job 1 description",
    jobLocation: "Job 1 location",
    latitude: 1,
    longitude: 1,
    isCompanyNameHidden: false,
    createdAt: new Date(),
    isActive: true,
  },
{
    id: 2,
    company: {
      id: 1,
      name: "Company 1",
      companyLogo: "https://static.vecteezy.com/system/resources/thumbnails/012/986/755/small/abstract-circle-logo-icon-free-png.png",
    },
    type: {
      id: 2,
      type: "Part-Time",
    },
    gradation: {
      id: 2,
      gradation: "Junior",
    },
    title: "Job 2",
    jobDescription: "Job 2 description",
    jobLocation: "Job 2 location",
    latitude: 2,
    longitude: 2,
    isCompanyNameHidden: true,
    createdAt: new Date(),
    isActive: true,
  },
  {
    id: 3,
    company: {
      id: 3,
      name: "Company 3",
      companyLogo: "https://static.vecteezy.com/system/resources/thumbnails/012/986/755/small/abstract-circle-logo-icon-free-png.png",
    },
    type: {
      id: 3,
      type: "Full-Time",
    },
    gradation: {
      id: 3,
      gradation: "Senior",
    },
    title: "Job 3",
    jobDescription: "Job 3 description",
    jobLocation: "Job 3 location",
    latitude: 3,
    longitude: 3,
    isCompanyNameHidden: false,
    createdAt: new Date(),
    isActive: true,
  },
    ]
  return response;
}

export async function getJob(id: string): Promise<JobPostBaseResponse> {
  const response = await get<JobPostBaseResponse>(`/jobs/${id}`);
  return response;
}

// export async function getAllCompanies(id: string): Promise<Job> {
//   return fetchData<Job>(`/jobs/${id}`);
// }

export async function getAllCompaniesWithPosts(): Promise<CompanyWithPosts[]> {
  const response = await get<CompanyWithPosts[]>(`/api/companies/all_companies`);
  return response;
}
