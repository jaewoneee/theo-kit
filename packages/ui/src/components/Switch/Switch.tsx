import * as React from "react";
import { cn } from "../../utils";

export interface SwitchProps {
  /**
   * 스위치의 체크 상태 (controlled)
   */
  checked?: boolean;
  /**
   * 스위치의 기본 체크 상태 (uncontrolled)
   */
  defaultChecked?: boolean;
  /**
   * 체크 상태 변경 시 호출되는 콜백
   */
  onChange?: (checked: boolean) => void;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 스위치 크기
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * 레이블 텍스트
   */
  label?: string;
  /**
   * 레이블 className
   */
  labelClassName?: string;
  /**
   * 스위치 className
   */
  className?: string;
}

const Switch = ({
  className,
  checked,
  defaultChecked,
  onChange,
  disabled,
  size = "md",
  label,
  labelClassName,
}: SwitchProps) => {
  const [internalChecked, setInternalChecked] = React.useState(
    defaultChecked ?? false
  );
  const isChecked = checked ?? internalChecked;

  const handleChange = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    setInternalChecked(newChecked);
    onChange?.(newChecked);
  };

  const sizeClasses = {
    sm: {
      track: "h-4 w-7",
      thumb: "size-3",
      translate: "translate-x-3",
    },
    md: {
      track: "h-5 w-9",
      thumb: "size-4",
      translate: "translate-x-4",
    },
    lg: {
      track: "h-6 w-11",
      thumb: "size-5",
      translate: "translate-x-5",
    },
  }[size];

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleChange}
        className={cn(
          "relative inline-flex shrink-0 items-center rounded-full transition-colors cursor-pointer",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          isChecked ? "bg-blue-600" : "bg-gray-200",
          sizeClasses.track,
          className
        )}
      >
        <span
          className={cn(
            "inline-block rounded-full bg-white shadow-sm transition-transform",
            "translate-x-0.5",
            isChecked && sizeClasses.translate,
            sizeClasses.thumb
          )}
        />
      </button>
      {label && (
        <span className={cn("select-none text-sm", labelClassName)}>
          {label}
        </span>
      )}
    </label>
  );
};

Switch.displayName = "Switch";

export { Switch };
