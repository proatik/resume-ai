import { useRef } from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  isLoading: boolean;
  submitForm: () => void;
};

const Textarea: React.FC<TextareaProps> = ({
  value,
  isLoading,
  onChange,
  submitForm,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (isLoading) {
        alert("Please wait for the model to finish its response!");
      } else {
        submitForm();
      }
    }
  };

  return (
    <textarea
      rows={3}
      autoFocus
      value={value}
      ref={textareaRef}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      placeholder="Ask anything"
      className="flex min-h-[60px] max-h-[75dvh] w-full resize-none overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-base shadow-sm placeholder-gray-500 focus:outline-none focus:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  );
};

export default Textarea;
