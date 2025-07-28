"use client";

import type { Message } from "ai";
import { motion } from "framer-motion";

import { Markdown } from "./Markdown";
import { SparklesIcon } from "./Icons";

export const PreviewMessage = ({
  message,
}: {
  message: Message;
  isLoading: boolean;
}) => {
  return (
    <motion.div
      className="w-full max-w-3xl px-4 mx-auto group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={message.role}
    >
      <div className="group-data-[role=user]/message:bg-zinc-700 group-data-[role=user]/message:text-primary-foreground flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl">
        {(message.role === "assistant" || message.role === "system") && (
          <div className="flex items-center justify-center rounded-full size-8 ring-1 shrink-0 ring-border">
            <SparklesIcon size={14} />
          </div>
        )}

        <div className="flex flex-col w-full gap-2">
          {message.content && (
            <div className="flex flex-col gap-4">
              {message.role === "system" ? (
                <div>
                  I've your resume data. You can ask me to assist you with it.
                </div>
              ) : (
                <Markdown>{message.content as string}</Markdown>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const ThinkingMessage = () => {
  const role = "assistant";

  return (
    <motion.div
      data-role={role}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      className="w-full max-w-3xl px-4 mx-auto group/message "
    >
      <div className="flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl">
        <div className="flex items-center justify-center rounded-full size-8 ring-1 shrink-0 ring-border">
          <SparklesIcon size={14} />
        </div>

        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col gap-4 text-muted-foreground">
            Thinking...
          </div>
        </div>
      </div>
    </motion.div>
  );
};
