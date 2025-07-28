import Link from "next/link";
import React, { memo } from "react";

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

type MarkdownProps = {
  children: string;
};

const components: Components = {
  // @ts-expect-error
  code({ inline, className = "", children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      // @ts-expect-error
      <pre
        className={`text-sm w-[80dvw] max-w-[500px] overflow-x-scroll bg-zinc-800 p-3 rounded-lg mt-2`}
        {...props}
      >
        <code className={match[1]}>{children}</code>
      </pre>
    ) : (
      <code
        className={`text-sm bg-zinc-800 py-0.5 px-1 rounded-md ${className}`}
        {...props}
      >
        {children}
      </code>
    );
  },

  ol({ children, ...props }) {
    return (
      <ol className="ml-4 list-decimal list-outside" {...props}>
        {children}
      </ol>
    );
  },

  li({ children, ...props }) {
    return (
      <li className="py-1" {...props}>
        {children}
      </li>
    );
  },

  ul({ children, ...props }) {
    return (
      <ul className="ml-4 list-decimal list-outside" {...props}>
        {children}
      </ul>
    );
  },

  strong({ children, ...props }) {
    return (
      <span className="font-semibold" {...props}>
        {children}
      </span>
    );
  },

  a({ href, children, ...props }) {
    if (!href) return <span {...props}>{children}</span>;
    return (
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 hover:underline"
        {...props}
      >
        {children}
      </Link>
    );
  },

  h1({ children, ...props }) {
    return (
      <h1 className="mt-6 mb-2 text-3xl font-semibold" {...props}>
        {children}
      </h1>
    );
  },

  h2({ children, ...props }) {
    return (
      <h2 className="mt-6 mb-2 text-2xl font-semibold" {...props}>
        {children}
      </h2>
    );
  },

  h3({ children, ...props }) {
    return (
      <h3 className="mt-6 mb-2 text-xl font-semibold" {...props}>
        {children}
      </h3>
    );
  },

  h4({ children, ...props }) {
    return (
      <h4 className="mt-6 mb-2 text-lg font-semibold" {...props}>
        {children}
      </h4>
    );
  },

  h5({ children, ...props }) {
    return (
      <h5 className="mt-6 mb-2 text-base font-semibold" {...props}>
        {children}
      </h5>
    );
  },

  h6({ children, ...props }) {
    return (
      <h6 className="mt-6 mb-2 text-sm font-semibold" {...props}>
        {children}
      </h6>
    );
  },
};

const NonMemoizedMarkdown: React.FC<MarkdownProps> = ({ children }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prev, next) => prev.children === next.children
);
