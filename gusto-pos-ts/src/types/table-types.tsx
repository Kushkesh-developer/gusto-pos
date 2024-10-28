export interface Action {
  type: "edit" | "delete" | "custom" | "visibility";
  // eslint-disable-next-line no-unused-vars
  handler: (id: string) => void;
  path?: string;
  icon?: React.ReactNode; // Only required for custom actions
}

export type ColumnType = {
  label: string;
  key: string;
  visible: boolean;
  isAction?: boolean; // Optional, only for action columns
  actions?: Action[]; // Optional, for columns with actions
};
