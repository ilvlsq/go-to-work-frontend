export interface CompanyBase {
  id: number;
  name: string;
  companyLogo: string;
}

export interface Company {
  id: number;
  name: string;
  businessStreamName: string;
  companyLogo: string;
  companyDescription: string;
  establishmentDate: Date;
  companyWebsiteUrl: string;
  companyImages: string[];
}

export interface CompanyCreateRequest {
  name: string;
  businessStreamName: string;
  companyLogo: string;
  companyDescription: string;
  establishmentDate: Date;
  companyWebsiteUrl: string;
  companyImages: string[];
}

export interface CompanyUpdateRequest {
  name?: string;
  businessStreamName?: string;
  companyLogo?: string;
  companyDescription?: string;
  establishmentDate?: Date;
  companyWebsiteUrl?: string;
  companyImages?: string[];
}

export interface PaginatedCompanyResponse {
  content: Company[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface CompanyBaseResponse {
  id: number;
  name: string;
  logoUrl: string;
  businessStreamName: string;
  employeesCount: number;
  contactPerson: string;
  contactPhone: string;
  companyDescription: string;
}

export interface CompanyAllInfoResponse {
  id: number;
  name: string;
  businessStreamName: string;
  logoUrl: string;
  description: string;
  establishmentDate: Date;
  websiteUrl: string;
  images: string[];
}

export interface CompanyWithPostsResponse {
  id: number;
  name: string;
  companyLogo: string;
  jobPostIds: number[];
}

export interface JobGradation {
  id: number;
  gradation: string;
}

export interface JobType {
  id: number;
  type: string;
}

export interface JobPost {
  id: number;
  company: CompanyBase;
  type: JobType;
  gradation: JobGradation;
  title: string;
  jobDescription: string;
  jobLocation: string;
  latitude: number;
  longitude: number;
  isCompanyNameHidden: boolean;
  createdAt: Date;
  isActive: boolean;
}

export interface CompanyWithPosts {
  id: number;
  name: string;
  companyLogo: string;
  jobPosts: JobPost[];
}

export interface JobGradationBaseResponse {
  id: number;
  gradation: string;
}

export interface JobTypeBaseResponse {
  id: number;
  type: string;
}

export interface JobPostBaseResponse {
  id: number;
  company: CompanyBaseResponse;
  type: JobTypeBaseResponse;
  gradation: JobGradationBaseResponse;
  title: string;
  description: string;
  jobLocation: string;
  latitude: number;
  longitude: number;
  isCompanyNameHidden: boolean;
  createdAt: Date;
  isActive: boolean;
}

export interface CompanyCardProps {
  id: number;
  name: string;
  logo?: string;
  businessStreamName?: string;
  contactNumber?: string;
  description?: string;
}

export interface VacancyDetailsProps {
  id: number;
  title: string;
  titleEn: string;
  jobLocation: string;
  jobDescription: string;
  jobType: {
    id: number;
    name: string;
  };
  jobGradation: {
    id: number;
    name: string;
  };
  createdDateTime: string;
  salary: string;
  language: string;
  requiredExperience: {
    id: number;
    experience: string;
  };
  tags: {
    id: number;
    name: string;
  }[];
  skills: {
    id: number;
    name: string;
    level: number | null;
  }[];
  active: boolean;
}

export interface SimilarJobCardProps {
  id: number;
  title: string;
  titleEn?: string;
  jobLocation?: string;
  jobType?: { name: string };
  jobDescription?: string;
}

export interface RecentVacancies {
  id: number;
  title: string;
  titleEn: string;
  employmentType: string;
  location: string;
  shortDescription: string;
  shortDescriptionEn: string;
  requiredExperience: {
    id: number;
    experience: string;
  };
  tags: {
    id: number;
    name: string;
  }[];
  skills: {
    id: number;
    name: string;
    level: number;
  }[];
  language: string;
}

export interface RecommendetJobsType {
  id: number;
  logo: string;
  name: string;
  recentVacancies: RecentVacancies[];
}

export interface JobPostsParams {
  searchQuery?: string;
  location?: string;
  jobType?: string;
  experience?: string;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  page?: number;
  size?: number;
}
