import { Toaster as Sonner, toast } from "sonner";
import { cn } from "../../utils";

export type ToasterPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToasterProps {
  /**
   * 토스트가 표시될 위치
   * @default "bottom-right"
   */
  position?: ToasterPosition;
  /**
   * 토스트가 자동으로 사라지기까지의 시간 (ms)
   * @default 4000
   */
  duration?: number;
  /**
   * 최대로 표시할 토스트 개수
   * @default 3
   */
  visibleToasts?: number;
  /**
   * 닫기 버튼 표시 여부
   * @default false
   */
  closeButton?: boolean;
  /**
   * 테마 설정
   * @default "light"
   */
  theme?: "light" | "dark" | "system";
  /**
   * 추가 className
   */
  className?: string;
}

const Toaster = ({
  className,
  position = "bottom-right",
  duration = 4000,
  visibleToasts = 3,
  closeButton = false,
  theme = "light",
  ...props
}: ToasterProps) => {
  return (
    <Sonner
      className={cn("toaster group", className)}
      position={position}
      duration={duration}
      visibleToasts={visibleToasts}
      closeButton={closeButton}
      theme={theme}
      toastOptions={{
        classNames: {
          toast: cn(
            "group toast",
            "bg-white text-gray-900 border-gray-200 shadow-lg",
            "group-[.toaster]:rounded-lg group-[.toaster]:border group-[.toaster]:p-4"
          ),
          title: "text-sm font-semibold",
          description: "text-sm text-gray-500",
          actionButton: cn(
            "bg-gray-900 text-white text-xs font-medium",
            "px-3 py-1.5 rounded-md",
            "hover:bg-gray-800"
          ),
          cancelButton: cn(
            "bg-gray-100 text-gray-600 text-xs font-medium",
            "px-3 py-1.5 rounded-md",
            "hover:bg-gray-200"
          ),
          closeButton: cn(
            "text-gray-400 hover:text-gray-600",
            "bg-white border-gray-200 hover:bg-gray-100"
          ),
          success: "border-green-200 bg-green-50 text-green-900",
          error: "border-red-200 bg-red-50 text-red-900",
          warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
          info: "border-blue-200 bg-blue-50 text-blue-900",
        },
      }}
      {...props}
    />
  );
};

Toaster.displayName = "Toaster";

export { Toaster, toast };
