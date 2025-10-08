import type { ReactElement } from "react";

export interface OverviewCardProps {
  icon: ReactElement;
  heading: string;
  content: string | string[];
}
