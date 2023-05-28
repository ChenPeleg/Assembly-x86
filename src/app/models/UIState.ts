export interface Panel {
  name: "console" | "memory" | "cpu";
  order: number;
  isVisible: boolean;
}
export interface UIState {
  panels: Panel[];
  theme: string;
}
