import { forwardRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${"rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 border border-zinc-700 cursor-pointer disabled:cursor-not-allowed"} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
