export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "date"
  | "datetime-local"
  | "textarea"
  | "select"
  | "hidden";

export type InputSize = "sm" | "md" | "lg";

export const inputBaseClass = [
  "bg-gray-50",
  "border",
  "border-gray-300",
  "rounded-lg",
  "focus:ring-primary-600",
  "focus:border-primary-600",
  "block",
  "w-full",
];

export const inputAddonClass = [
  "inline-flex",
  "px-3",
  "text-sm",
  "bg-gray-200",
  "border",
  "border-e-0",
  "border-gray-300",
  "rounded-l-md",
];

export const inputSizeClasses: Record<InputSize, string[]> = {
  sm: ["text-xs", "p-2"],
  md: ["text-sm", "p-2.5"],
  lg: ["text-md", "p-4"],
};
