"use client";

import { useMainContext } from "@/contexts/MainContext";

import {
  Info,
  Code,
  User,
  Mail,
  Text,
  Phone,
  Award,
  Heart,
  MapPin,
  Github,
  Monitor,
  Contact,
  Calendar,
  Building,
  Linkedin,
  GraduationCap,
  AlertTriangle,
} from "lucide-react";

import type {
  Skill,
  Education,
  ContactInfo,
  WorkExperience,
  TechnicalSkills,
} from "./types";

import type {
  SummaryProps,
  ProjectsProps,
  EducationProps,
  InterestsProps,
  ContactInfoProps,
  CertificationsProps,
  WorkExperienceProps,
  TechnicalSkillsProps,
  MissingFieldAlertProps,
  AdditionalMissingFieldsProps,
} from "./types";

const MissingFieldAlert = ({
  fieldName,
  description,
}: MissingFieldAlertProps) => {
  return (
    <div className="p-4 mb-4 border rounded-lg border-orange-400/30 bg-orange-500/5">
      <div className="flex items-center gap-2 text-orange-300">
        <AlertTriangle size={16} />
        <span className="font-medium">Missing: {fieldName}</span>
      </div>
      <p className="mt-1 text-sm text-orange-400">{description}</p>
    </div>
  );
};

const ContactInfo = ({ contactInfo }: ContactInfoProps) => {
  return (
    <div className="p-6 mb-6 border rounded-lg shadow-sm bg-zinc-900/60 border-zinc-700/60">
      <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-slate-100">
        <Contact className="text-blue-500" size={24} />
        Contact Information
      </h2>

      <div className="grid gap-4 md:grid-cols-2 text-slate-200">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <User size={18} className="text-slate-400" />
            <span className="font-semibold text-md">
              {contactInfo?.full_name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Mail size={18} className="text-slate-400" />
            <a
              href={`mailto:${contactInfo?.email}`}
              className="text-blue-400 hover:underline"
            >
              {contactInfo?.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={18} className="text-slate-400" />
            <span>{contactInfo?.phone}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-slate-400" />
            <span>{contactInfo?.address}</span>
          </div>

          {contactInfo?.linkedin && (
            <div className="flex items-center gap-3">
              <Linkedin size={18} className="text-slate-400" />
              <a
                href={contactInfo?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                LinkedIn Profile
              </a>
            </div>
          )}

          {contactInfo?.github && (
            <div className="flex items-center gap-3">
              <Github size={18} className="text-slate-400" />
              <a
                href={contactInfo?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                GitHub Profile
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Summary = ({ summary }: SummaryProps) => {
  return (
    <div className="p-6 mb-6 border rounded-lg shadow-sm bg-zinc-900/60 border-zinc-700/60">
      <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-slate-100">
        <Text className="text-blue-500" size={24} />
        Professional Summary
      </h2>
      {summary ? (
        <p className="leading-relaxed text-slate-200">{summary}</p>
      ) : (
        <MissingFieldAlert
          fieldName="Professional Summary"
          description="Add a compelling 2-3 sentence summary highlighting your key strengths and career objectives."
        />
      )}
    </div>
  );
};

const WorkExperience = ({ workExperience }: WorkExperienceProps) => {
  return (
    <div className="p-6 mb-6 border rounded-lg shadow-sm bg-zinc-900/60 border-zinc-700/60">
      <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-slate-100">
        <Building className="text-blue-500" size={24} />
        Work Experience
      </h2>

      {workExperience && workExperience?.length > 0 ? (
        <div className="space-y-6">
          {workExperience?.map((job, index) => (
            <div key={index} className="pl-4 border-l-4 border-blue-400/40">
              <div className="flex flex-col mb-2 md:flex-row md:items-center md:justify-between">
                <h3 className="text-lg font-semibold text-slate-100">
                  {job?.position}
                </h3>
                <span className="flex items-center gap-1 text-sm text-slate-400">
                  <Calendar size={14} />
                  {job?.start_date
                    ? new Date(job?.start_date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}{" "}
                  {" - "}
                  {job?.is_current
                    ? " Present"
                    : job?.end_date
                    ? new Date(job?.end_date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </span>
              </div>

              <p className="mb-3 font-medium text-blue-400">{job?.company}</p>

              {job?.responsibilities && job?.responsibilities?.length > 0 && (
                <ul className="mb-3 space-y-1 list-disc list-inside">
                  {job?.responsibilities?.map((resp, idx) => (
                    <li key={idx} className="text-slate-200">
                      {resp}
                    </li>
                  ))}
                </ul>
              )}

              {job?.technologies && job?.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {job?.technologies?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm font-medium rounded-full bg-slate-500/20 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <MissingFieldAlert
          fieldName="Work Experience"
          description="Add your professional work experience with specific achievements and technologies used."
        />
      )}
    </div>
  );
};

const Education = ({ education }: EducationProps) => {
  return (
    <div className="p-6 mb-6 border rounded-lg shadow-sm bg-zinc-900/60 border-zinc-700/60">
      <h2 className="flex items-center gap-2 mb-4 text-xl font-bold text-slate-100">
        <GraduationCap className="text-blue-500" size={24} />
        Education
      </h2>

      {education && education?.length > 0 ? (
        <div className="space-y-4">
          {education?.map((edu, index) => (
            <div key={index} className="pl-4 border-l-4 border-green-400/40">
              <h3 className="text-lg font-semibold text-slate-100">
                {edu?.degree}
              </h3>
              <p className="font-medium text-green-400">{edu?.institution}</p>
              <p className="text-slate-300">{edu?.field_of_study}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                {edu?.graduation_date && (
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    Graduated: {new Date(edu?.graduation_date).getFullYear()}
                  </span>
                )}
                {edu?.gpa && <span>GPA: {edu?.gpa}</span>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <MissingFieldAlert
          fieldName="Education"
          description="Add your educational background including degrees, institutions, and graduation dates."
        />
      )}
    </div>
  );
};

const TechnicalSkills = ({ technicalSkills }: TechnicalSkillsProps) => {
  const renderSkillCategory = (
    title: string,
    skills: Skill[] | null | undefined,
    colorClass: string
  ) =>
    skills && skills?.length > 0 ? (
      <div className="mb-4">
        <h4 className="mb-2 font-semibold text-slate-100">{title}</h4>
        <div className="flex flex-wrap gap-2">
          {skills?.map((skill, idx) => (
            <span
              key={idx}
              className={`${colorClass} px-3 py-1 rounded-full text-sm font-medium`}
            >
              {skill?.name}
            </span>
          ))}
        </div>
      </div>
    ) : null;

  return (
    <div className="p-6 mb-6 border rounded-lg shadow-sm bg-zinc-900/60 border-zinc-700/60">
      <h2 className="flex items-center gap-2 mb-4 text-xl font-bold text-slate-100">
        <Code className="text-blue-500" size={24} />
        Technical Skills
      </h2>

      {technicalSkills ? (
        <div className="space-y-4">
          {renderSkillCategory(
            "Programming Languages",
            technicalSkills.programming_languages,
            "bg-fuchsia-500/10 text-fuchsia-300"
          )}
          {renderSkillCategory(
            "Frameworks & Libraries",
            technicalSkills.frameworks_libraries,
            "bg-emerald-500/10 text-emerald-300"
          )}
          {renderSkillCategory(
            "Databases",
            technicalSkills.databases,
            "bg-orange-500/10 text-orange-300"
          )}
          {renderSkillCategory(
            "Tools",
            technicalSkills.tools,
            "bg-sky-500/10 text-sky-300"
          )}
          {renderSkillCategory(
            "Cloud Platforms",
            technicalSkills.cloud_platforms,
            "bg-violet-500/10 text-violet-300"
          )}
          {renderSkillCategory(
            "Other Skills",
            technicalSkills.other,
            "bg-slate-500/20 text-slate-300"
          )}
        </div>
      ) : (
        <MissingFieldAlert
          fieldName="Technical Skills"
          description="Add your technical skills organized by categories like programming languages, frameworks, databases, etc."
        />
      )}
    </div>
  );
};

const Certifications = ({ certifications }: CertificationsProps) => {
  return (
    <div className="p-6 mb-6 border rounded-lg shadow-sm bg-zinc-900/60 border-zinc-700/60">
      <h2 className="flex items-center gap-2 mb-4 text-xl font-bold text-slate-100">
        <Award className="text-blue-500" size={24} />
        Certifications
      </h2>

      {certifications && certifications?.length > 0 ? (
        <div className="space-y-3">
          {certifications?.map((cert, index) => (
            <div key={index} className="pl-4 border-l-4 border-violet-400/40">
              <h3 className="font-semibold text-slate-100">{cert?.name}</h3>
              <p className="font-medium text-violet-400">{cert?.issuer}</p>
              {cert?.date_obtained && (
                <p className="text-sm text-slate-400">
                  Obtained: {new Date(cert?.date_obtained).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <MissingFieldAlert
          fieldName="Certifications"
          description="Add relevant professional certifications to demonstrate your expertise and commitment to learning."
        />
      )}
    </div>
  );
};

const Projects = ({ projects }: ProjectsProps) => {
  return projects === null ? (
    <div className="p-6 mb-6 border rounded-lg shadow-sm bg-zinc-900/60 border-zinc-700/60">
      <h2 className="flex items-center gap-2 mb-4 text-xl font-bold text-slate-100">
        <Monitor className="text-blue-500" size={24} />
        Projects
      </h2>

      <MissingFieldAlert
        fieldName="Projects"
        description="Showcase your personal or professional projects with descriptions, technologies used, and links."
      />
    </div>
  ) : (
    <div className="p-6 mb-6 border rounded-lg shadow-sm bg-zinc-900/60 border-zinc-700/60">
      <h2 className="flex items-center gap-2 mb-4 text-xl font-bold text-slate-100">
        <Monitor className="text-blue-500" size={24} />
        Projects
      </h2>

      <div className="space-y-6">
        {projects?.map((project, index) => (
          <div key={index} className="pl-4 border-l-4 border-cyan-400/40">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-slate-100">
                {project?.name}
              </h3>
            </div>

            {project?.description && (
              <p className="mb-3 text-slate-200">{project?.description}</p>
            )}

            {project?.key_features && project?.key_features?.length > 0 && (
              <div className="mb-3">
                <h4 className="mb-2 text-sm font-medium text-slate-300">
                  Key Features:
                </h4>
                <ul className="space-y-1 list-disc list-inside">
                  {project?.key_features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-slate-200">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Interests = ({ interests }: InterestsProps) => {
  return interests && interests?.length > 0 ? (
    <div className="p-6 mb-6 border rounded-lg shadow-sm bg-zinc-900/60 border-zinc-700/60">
      <h2 className="flex items-center gap-2 mb-4 text-xl font-bold text-slate-100">
        <Heart className="text-blue-500" size={24} />
        Interests
      </h2>
      <div className="flex flex-wrap gap-2">
        {interests?.map((interest, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm font-medium text-teal-300 rounded-full bg-teal-500/10"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  ) : null;
};

const AdditionalMissingFields = ({
  resumeData,
}: AdditionalMissingFieldsProps) => {
  const missingFields: { name: string; desc: string }[] = [];

  if (!resumeData.projects)
    missingFields.push({ name: "Projects", desc: "Showcase your work" });
  if (!resumeData.languages)
    missingFields.push({ name: "Languages", desc: "List languages you speak" });
  if (!resumeData.volunteer_work)
    missingFields.push({
      name: "Volunteer Work",
      desc: "Show community involvement",
    });
  if (!resumeData.publications)
    missingFields.push({
      name: "Publications",
      desc: "Academic or professional publications",
    });
  if (!resumeData.open_source_contributions)
    missingFields.push({
      name: "Open Source",
      desc: "Contributions to open source projects",
    });

  if (missingFields.length === 0) return null;

  return (
    <div className="p-6 mb-6 border rounded-lg shadow-sm bg-zinc-900/60 border-zinc-700/60">
      <h2 className="flex items-center gap-2 mb-4 text-xl font-bold text-slate-100">
        <Info className="text-blue-500" size={24} />
        Optional Sections to Consider
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        {missingFields.map((field, index) => (
          <div
            key={index}
            className="p-3 border rounded-lg border-orange-400/20 bg-orange-500/5"
          >
            <div className="flex items-center gap-2 text-orange-300">
              <AlertTriangle size={14} />
              <span className="font-medium">{field.name}</span>
            </div>
            <p className="mt-1 text-sm text-orange-400">{field.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ParsedResumeViewer = () => {
  const { resumeData } = useMainContext();

  return (
    <>
      {!resumeData && (
        <div className="max-w-4xl p-6 mx-auto">
          <div className="p-4 border border-zinc-700 rounded-lg bg-zinc-900">
            <p className="text-slate-500 text-center text-lg font-medium">
              No resume data available to display.
            </p>
          </div>
        </div>
      )}

      {resumeData && (
        <div className="max-w-4xl min-h-screen p-5 mx-auto my-6 border rounded-md shadow-lg border-zinc-800 bg-zinc-900/50">
          <div className="mb-10">
            <h1 className="mb-2 text-3xl font-bold text-center text-[#3595F9]">
              Resume Analysis
            </h1>
            <p className="font-medium text-center text-gray-300 text-md">
              ✅ Review your parsed resume data and see recommendations for
              improvement ✅
            </p>
          </div>

          <ContactInfo contactInfo={resumeData?.contact_info} />
          <Summary summary={resumeData?.summary} />
          <WorkExperience workExperience={resumeData?.work_experience} />
          <Education education={resumeData?.education} />
          <TechnicalSkills technicalSkills={resumeData?.technical_skills} />
          <Certifications certifications={resumeData?.certifications} />
          <Projects projects={resumeData?.projects} />
          <Interests interests={resumeData?.interests} />
          <AdditionalMissingFields resumeData={resumeData} />
        </div>
      )}
    </>
  );
};

export default ParsedResumeViewer;
