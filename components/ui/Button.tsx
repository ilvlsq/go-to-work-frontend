import React, { ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  href?: string;
}

export default function Button({
  variant = "primary",
  size = "medium",
  children,
  href,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-semibold transition duration-200 rounded-full drop-shadow-xl";

  const variantStyles = {
    primary: "bg-white text-black hover:bg-gray-200 active:bg-gray-100",
    secondary: "bg-secondary text-black hover:bg-secondaryDark active:bg-secondaryLight",
    outline:
      "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white",
  };

  const sizeStyles = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-4",
    large: "px-6 py-5 text-lg",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${
    sizeStyles[size]
  } ${className || ""}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
