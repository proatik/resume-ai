export type ContactInfo = {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string | null;
  github?: string | null;
  portfolio?: string | null;
  google_scholar?: string | null;
};

export type Education = {
  institution: string;
  degree: string;
  field_of_study: string;
  graduation_date?: string | null;
  gpa?: number | null;
  honors?: string | null;
  relevant_courses?: string[] | null;
};

export type WorkExperience = {
  company: string;
  position: string;
  start_date?: string | null;
  end_date?: string | null;
  is_current: boolean;
  responsibilities?: string[] | null;
  technologies?: string[] | null;
};

export type Skill = {
  name: string;
  level?: string | null;
  years_of_experience?: number | null;
};

export type TechnicalSkills = {
  programming_languages?: Skill[] | null;
  frameworks_libraries?: Skill[] | null;
  databases?: Skill[] | null;
  tools?: Skill[] | null;
  cloud_platforms?: Skill[] | null;
  other?: Skill[] | null;
};

export type Certification = {
  name: string;
  issuer: string;
  date_obtained?: string | null;
  expiration_date?: string | null;
  credential_id?: string | null;
};

export type Project = {
  name: string;
  description?: string | null;
  technologies?: string[] | null;
  url?: string | null;
  demo_url?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  status?: string | null;
  team_size?: number | null;
  role?: string | null;
  key_features?: string[] | null;
};

export type ResumeData = {
  contact_info?: ContactInfo;
  summary?: string | null;
  education?: Education[] | null;
  work_experience?: WorkExperience[] | null;
  technical_skills?: TechnicalSkills | null;
  projects?: Project[] | null;
  open_source_contributions?: any[] | null;
  certifications?: Certification[] | null;
  publications?: any[] | null;
  conferences?: any[] | null;
  languages?: string[] | null;
  volunteer_work?: any[] | null;
  interests?: string[] | null;
  references?: any[] | null;
  additional_sections?: any | null;
};

export type ResumeResponse = {
  result: ResumeData;
};

export type MissingFieldAlertProps = {
  fieldName: string;
  description: string;
};

export type ContactInfoProps = {
  contactInfo: ContactInfo;
};

export type SummaryProps = {
  summary?: string | null;
};

export type WorkExperienceProps = {
  workExperience?: WorkExperience[] | null;
};

export type EducationProps = {
  education?: Education[] | null;
};

export type TechnicalSkillsProps = {
  technicalSkills?: TechnicalSkills | null;
};

export type CertificationsProps = {
  certifications?: Certification[] | null;
};

export type ProjectsProps = {
  projects?: Project[] | null;
};

export type InterestsProps = {
  interests?: string[] | null;
};

export type AdditionalMissingFieldsProps = {
  resumeData: ResumeData;
};
