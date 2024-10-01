export interface Company {
    id: string;
    name: string;
    logo: string | null;
  }

export interface Job {
    id: string;
    title: string;
    company: Company;
    location: string;
    shortDescription: string;
    fullDescription: string;
    salary: {
      min: number;
      max: number;
      currency: string;
    };
    postedDate: string; 
    employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY' | 'INTERNSHIP';
    experienceLevel: 'ENTRY' | 'INTERMEDIATE' | 'SENIOR' | 'EXECUTIVE';
    tags: string[];
    requirements: string[];
    applicationUrl: string;
  }