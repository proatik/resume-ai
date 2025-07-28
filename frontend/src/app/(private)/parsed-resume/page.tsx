import { Metadata } from "next";

import ParsedResumeViewer from "@/components/ParsedResumeViewer";

export const metadata: Metadata = {
  title: "Parsed Resume | Resume AI",
  description: "View and explore your parsed resume data.",
};

const ParsedResumePage = () => {
  return <ParsedResumeViewer />;
};

export default ParsedResumePage;
