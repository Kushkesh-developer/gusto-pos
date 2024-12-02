export interface Action {
  type: 'edit' | 'delete' | 'custom' | 'visibility';
  // eslint-disable-next-line no-unused-vars
  handler: (id: string | number) => void;
  path?: string;
  icon?: React.ReactNode; // Only required for custom actions
}

// src/types/table-types.ts

export type ColumnType = {
  label: string;
  key: string;
  readOnly?: boolean;
  visible: boolean;
  type?: 'toggle' | 'image' | 'text'; // New field for conditional rendering of toggle or image
  isAction?: boolean; // Optional, only for action columns
  actions?: Action[]; // Optional, for columns with actions
};

export interface UserRecord {
  id?: string | number; // Required unique identifier
  Name?: string; // Optional name field
  status?: 'Active' | 'Pending' | 'Waiting' | 'Cancelled'; // Restricted to specific status values
  RewardValidPeriod?: string; // Optional field for a date or period (should be string in ISO date format)
  [key: string]: unknown; // Allows additional dynamic fields
  name?: string;
  phone?: string;
  email?: string;
  role?: string;
  group?: string;
  rewardName?: string;
  // Add any additional fields you might have
}
