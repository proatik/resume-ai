import { Metadata } from "next";

import Chat from "@/components/chat/Chat";

export const metadata: Metadata = {
  title: "AI Chat | Resume AI",
  description: "Ask AI questions about your resume or get career guidance.",
};

const AiChatPage = () => {
  return <Chat />;
};

export default AiChatPage;
