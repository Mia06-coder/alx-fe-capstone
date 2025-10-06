import type { ReactElement } from "react";

export interface InputProps {
  id: string;
  label: string;
  name: string;
  type: string;
  icon?: ReactElement;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  pattern?: string;
  title?: string;
  autoComplete?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  step?: number;
  max?: string | number;
  min?: string | number;
  style?: string;
}
