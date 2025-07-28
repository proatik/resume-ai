"use client";

import toast from "react-hot-toast";
import { useChat } from "@ai-sdk/react";
import { useEffect, useState } from "react";

import Button from "./Button";
import Textarea from "./Input";
import { PreviewMessage } from "./Message";
import { ThinkingMessage } from "./Message";
import { ArrowUpIcon, StopIcon } from "./Icons";

import api from "@/lib/aixos";
import { getBaseUrl } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useMainContext } from "@/contexts/MainContext";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";

const Chat = () => {
  const { user } = useAuth();
  const { resumeData } = useMainContext();
  const [prompt, setPrompt] = useState("");

  const baseUrl = getBaseUrl();

  const config: Parameters<typeof useChat>[0] = {
    api: `${baseUrl}/chat`,
    onError: (error) => {
      const data = JSON.parse(error.message);
      toast.error(data?.message);
    },
  };

  if (resumeData) {
    config.initialMessages = [
      {
        id: "01",
        role: "system",
        content: `You are a helpful resume assistant. Analyze the resume structure and suggest improvements based on job-fit, skill gaps, and clarity. Your output should be UI-friendly. Here is the parsed resume data:\n\n${JSON.stringify(
          resumeData,
          null,
          2
        )}`,
      },
    ];
  }

  if (user) {
    config.body = { user_id: user.id, prompt };
  }

  const {
    input,
    messages,
    isLoading,
    setMessages,
    handleSubmit,
    handleInputChange,
  } = useChat(config);

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const customInputChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleInputChange(e);
    setPrompt(e.target.value);
  };

  const fetchMessages = async () => {
    if (user?.id) {
      const { data } = await api.get(`/chat/${user.id}`);

      setMessages((messages) => {
        if (messages.length && resumeData) {
          return [messages[0], ...data];
        }

        return [...data];
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [user]);

  return (
    <div className="flex flex-col max-w-3xl mx-auto min-w-0 h-[calc(100dvh-64px)]">
      <div
        ref={messagesContainerRef}
        className="flex flex-col flex-1 min-w-0 gap-6 py-8 overflow-y-auto custom-scrollbar"
      >
        {messages.map((message, index) => (
          <PreviewMessage
            key={message.id}
            message={message}
            isLoading={isLoading && messages.length - 1 === index}
          />
        ))}

        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && <ThinkingMessage />}

        <div
          ref={messagesEndRef}
          className="shrink-0 min-w-[24px] min-h-[24px]"
        />
      </div>

      <form className="flex w-full gap-2 px-4 pb-6">
        <div className="relative flex flex-col w-full gap-4">
          <Textarea
            value={input}
            isLoading={isLoading}
            submitForm={handleSubmit}
            onChange={customInputChangeHandler}
          />

          {isLoading ? (
            <Button
              onClick={(event) => {
                event.preventDefault();
                stop();
                setMessages(messages);
              }}
            >
              <StopIcon size={14} />
            </Button>
          ) : (
            <Button
              onClick={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
              disabled={input.length === 0}
            >
              <ArrowUpIcon size={14} />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Chat;
