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
  companyLogo: string;
}

export interface CompanyAllInfoResponse {
  id: number;
  name: string;
  businessStreamName: string;
  companyLogo: string;
  companyDescription: string;
  establishmentDate: Date;
  companyWebsiteUrl: string;
  companyImages: string[];
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
  jobDescription: string;
  jobLocation: string;
  latitude: number;
  longitude: number;
  isCompanyNameHidden: boolean;
  createdAt: Date;
  isActive: boolean;
}
