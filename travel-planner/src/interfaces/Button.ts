export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  label: string;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}
