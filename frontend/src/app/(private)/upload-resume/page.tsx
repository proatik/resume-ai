import { Metadata } from "next";

import ResumeUploader from "@/components/ResumeUploader";

export const metadata: Metadata = {
  title: "Upload Resume | Resume AI",
  description: "Upload your resume for instant AI-powered parsing.",
};

const UploadResumePage = () => {
  return <ResumeUploader />;
};

export default UploadResumePage;
