import { Text } from "react-native";
import { cn } from "../../utils/cn";

export interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "overline";
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<NonNullable<TypographyProps["variant"]>, string> = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-bold",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-semibold",
  body: "text-base",
  caption: "text-sm text-gray-500",
  overline: "text-xs uppercase tracking-wider text-gray-500",
};

const Typography = ({
  variant = "body",
  className,
  children,
}: TypographyProps) => {
  return (
    <Text className={cn(variantClasses[variant], className)}>
      {children}
    </Text>
  );
};

Typography.displayName = "Typography";

export { Typography };
