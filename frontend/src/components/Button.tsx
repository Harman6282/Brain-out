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
  secondary: "bg-purple-300 text-purple-600",
};

const defaultStyles = "rounded-md p-4 flex items-center gap-1";

const sizeStyles = {
  "sm": "py-1 px-2 text-sm",
  "md": "py-2 px-3 text-md",
  "lg": "py-3 px-6 text-lg",
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${variantStyles[props.variant]} ${defaultStyles}
       ${sizeStyles[props.size]}`}
    >
     {props.startIcon ? <div className="">{props.startIcon}</div> : null} {props.text} {props.endIcon}
    </button>
  );
};