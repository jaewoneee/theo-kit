import { Pressable, Text, ActivityIndicator } from "react-native";
import { cn } from "../../utils/cn";

export interface ButtonProps {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  className?: string;
  children: React.ReactNode;
}

const variantClasses = {
  solid: "bg-blue-600 active:bg-blue-700",
  outline: "border border-gray-300 active:bg-gray-100",
  ghost: "active:bg-gray-100",
};

const textVariantClasses = {
  solid: "text-white",
  outline: "text-gray-900",
  ghost: "text-gray-900",
};

const sizeClasses = {
  sm: "px-3 py-1.5 rounded",
  md: "px-4 py-2 rounded-md",
  lg: "px-6 py-3 rounded-lg",
};

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const Button = ({
  variant = "solid",
  size = "md",
  loading = false,
  disabled = false,
  onPress,
  className,
  children,
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={cn(
        "flex-row items-center justify-center",
        variantClasses[variant],
        sizeClasses[size],
        isDisabled && "opacity-50",
        className
      )}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === "solid" ? "white" : "#6b7280"}
          className="mr-2"
        />
      )}
      <Text
        className={cn(
          "font-medium",
          textVariantClasses[variant],
          textSizeClasses[size]
        )}
      >
        {children}
      </Text>
    </Pressable>
  );
};

Button.displayName = "Button";

export { Button };
