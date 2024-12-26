import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick: () => void;
}

const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultStyles = "rounded-md px-4 py-1 flex items-center gap-1";

const sizeStyles = {
  "sm": "py-1 px-2 text-sm",
  "md": "py-2 px-3 text-md",
  "lg": "py-3 px-6 text-lg",
};

export const Button = ({text, onClick, size, variant,startIcon, endIcon}: ButtonProps) => {
  return (
    <button
    onClick={onClick}
      className={`${variantStyles[variant]} ${defaultStyles}
       ${sizeStyles[size]}`}
    >
     {startIcon ? <div className="">{startIcon}</div> : null} {text} {endIcon}
    </button>
  );
};