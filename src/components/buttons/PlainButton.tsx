import React from "react";

type ButtonVariant = "primary" | "secondary" | "text";

type PlainButtonProps = {
  label?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-black",
  secondary: "bg-transparent text-primary border border-primary",
  text: "bg-transparent text-primary",
};

const PlainButton = ({
  label,
  onClick,
  variant = "primary",
  icon,
}: PlainButtonProps) => {
  return (
    <button
      className={`${variantStyles[variant]} px-8 py-2 rounded-md font-semibold text-lg flex items-center gap-2`}
      onClick={onClick}
    >
      <span>{label ?? "Button"}</span>
      {icon && <span className="text-xl">{icon}</span>}
    </button>
  );
};

export default PlainButton;
