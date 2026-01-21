import * as React from "react";
import { cn } from "../../utils";

export type TypographyVariant = "heading" | "body";
export type TypographyLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type TypographyWeight =
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 타이포그래피 변형
   * @default "body"
   */
  variant?: TypographyVariant;
  /**
   * 레벨 (heading: h1-h6, body: 크기 조절)
   * @default 1
   */
  level?: TypographyLevel;
  /**
   * 폰트 굵기
   * @default variant에 따라 다름 (heading: "bold", body: "normal")
   */
  weight?: TypographyWeight;
  /**
   * 렌더링할 HTML 요소 (지정하지 않으면 variant와 level에 따라 자동 결정)
   */
  as?: React.ElementType;
}

const headingSizes: Record<TypographyLevel, string> = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-2xl",
  4: "text-xl",
  5: "text-lg",
  6: "text-base",
};

const bodySizes: Record<TypographyLevel, string> = {
  1: "text-xl",
  2: "text-lg",
  3: "text-base",
  4: "text-sm",
  5: "text-xs",
  6: "text-xs",
};

const weightClasses: Record<TypographyWeight, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant = "body",
      level = 1,
      weight,
      as,
      children,
      ...props
    },
    ref
  ) => {
    const defaultWeight = variant === "heading" ? "bold" : "normal";
    const resolvedWeight = weight ?? defaultWeight;

    const sizeClass =
      variant === "heading" ? headingSizes[level] : bodySizes[level];

    const Component =
      as ?? (variant === "heading" ? (`h${level}` as React.ElementType) : "p");

    return (
      <Component
        ref={ref}
        className={cn(
          sizeClass,
          weightClasses[resolvedWeight],
          variant === "body" && "text-gray-700",
          variant === "heading" && "text-gray-900",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";

export { Typography };
