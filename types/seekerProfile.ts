export interface SeekerSkill {
  skillId: number;
  description: string;
  skillLevel: number;
}

export interface SeekerEducation {
  certificateDegreeId: number | null;
  major: string;
  instituteOrUniversityName: string;
  startDate: string | null;
  completionDate: string | null;
  cgpa: number | null;
}

export interface SeekerExperience {
  isCurrentJob: boolean;
  startDate: string | null;
  endDate: string | null;
  jobTitle: string;
  companyName: string;
  jobLocationCity: string;
  jobLocationCountry: string;
  description: string;
}

export interface SeekerProfile {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  currentMonthlySalary: number;
  cvUrl: string | null;
  email: string;
  contactNumber: string;
  skills: SeekerSkill[];
  education: SeekerEducation[];
  experience: SeekerExperience[];
  registrationDate: string | null;
}

export interface SeekerProfileResponse {
  success: boolean;
  message: string;
  data?: SeekerProfile;
}

export interface SeekerProfileCvResponse {
  success: boolean;
  message: string;
  data: { cvUrl: string };
}
