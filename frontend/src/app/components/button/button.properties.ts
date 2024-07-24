export type ButtonColors =
  | "primary"
  | "dark"
  | "light"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "indigo";

export type ButtonSizes = "xs" | "sm" | "md" | "lg" | "xl";

export const buttonBaseClass = [
  "group",
  "flex",
  "items-center",
  "justify-center",
  "text-center",
  "font-medium",
  "focus:z-10",
  "focus:outline-none",
];

export const buttonColorClasses: Record<ButtonColors, string[]> = {
  primary: [
    "text-white",
    "bg-cyan-600",
    "hover:bg-cyan-700",
    "focus:ring-4",
    "focus:ring-cyan-100",
  ],
  dark: [
    "text-white",
    "bg-gray-800",
    "hover:bg-gray-900",
    "focus:ring-4",
    "focus:ring-gray-300",
  ],
  light: [
    "text-gray-900",
    "bg-white",
    "border",
    "border-gray-300",
    "hover:bg-gray-100",
    "focus:ring-4",
    "focus:ring-blue-300",
  ],
  info: [
    "text-white",
    "bg-blue-700",
    "hover:bg-blue-800",
    "focus:ring-4",
    "focus:ring-blue-300",
  ],
  success: [
    "text-white",
    "bg-green-700",
    "hover:bg-green-800",
    "focus:ring-4",
    "focus:ring-green-100",
  ],
  warning: [
    "text-white",
    "bg-yellow-400",
    "hover:bg-yellow-500",
    "focus:ring-4",
    "focus:ring-yellow-200",
  ],
  danger: [
    "text-white",
    "bg-red-700",
    "hover:bg-red-800",
    "focus:ring-4",
    "focus:ring-red-300",
  ],
  indigo: [
    "text-white",
    "bg-indigo-600",
    "hover:bg-indigo-700",
    "focus:ring-4",
    "focus:ring-indigo-300",
  ],
};

export const buttonSizeClasses: Record<ButtonSizes, string[]> = {
  xs: ["text-xs", "py-2", "px-3"],
  sm: ["text-sm", "py-2", "px-3"],
  md: ["text-sm", "px-5", "py-2.5"],
  lg: ["text-base", "py-3", "px-5"],
  xl: ["text-base", "px-6", "py-3.5"],
};
