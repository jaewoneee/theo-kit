import { View, Text } from "react-native";
import { cn } from "../../utils/cn";

export interface BadgeProps {
  variant?: "default" | "success" | "warning" | "error" | "info";
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-gray-100 text-gray-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
};

const Badge = ({
  variant = "default",
  className,
  children,
}: BadgeProps) => {
  return (
    <View
      className={cn(
        "self-start rounded-full px-2.5 py-0.5",
        variantClasses[variant],
        className
      )}
    >
      <Text className={cn("text-xs font-medium", variantClasses[variant])}>
        {children}
      </Text>
    </View>
  );
};

Badge.displayName = "Badge";

export { Badge };
