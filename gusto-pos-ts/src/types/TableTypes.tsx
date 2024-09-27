type Action = {
    type: "edit" | "delete"; // You can add more action types if needed
    handler: () => void;
  };
  
export type ColumnType = {
    label: string;
    key: string;
    visible: boolean;
    isAction?: boolean; // Optional, only for action columns
    actions?: Action[]; // Optional, for columns with actions
  };