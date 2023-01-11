import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: FC<ButtonProps> = ({ label, className, ...props }) => {
  return (
    <button className={`btn w-full tracking-wider ${className}`} {...props}>
      {label}
    </button>
  );
};

export default Button;
