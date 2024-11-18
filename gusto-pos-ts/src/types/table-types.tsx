export interface Action {
  type: "edit" | "delete" | "custom" | "visibility";
  // eslint-disable-next-line no-unused-vars
  handler: (id: string | number) => void;
  path?: string;
  icon?: React.ReactNode; // Only required for custom actions
}

// src/types/table-types.ts
export type RowDataType = {
  id: string | number; // or another type depending on your data
  [key: string]: unknown; // allow other dynamic properties
};

// Define the ColumnType with T representing row data
export type ColumnType<T = RowDataType> = {
  label: string;
  key: keyof T; // Ensures the key corresponds to a property of T
  id: string | number | null;
  readOnly?: boolean;
  visible: boolean;
  type?: "toggle" | "image" | "text";
  isAction?: boolean; // Optional, only for action columns
  actions?: Action[]; // Optional, for columns with actions
};
