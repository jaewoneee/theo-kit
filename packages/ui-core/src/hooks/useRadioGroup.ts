import * as React from "react";
import { useControllable } from "./useControllable";

export interface UseRadioGroupOptions {
  /** 선택된 값 (controlled) */
  value?: string;
  /** 기본 선택 값 (uncontrolled) */
  defaultValue?: string;
  /** 값 변경 시 호출되는 콜백 */
  onValueChange?: (value: string) => void;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export interface UseRadioGroupReturn {
  /** 현재 선택된 값 */
  value: string;
  /** 값 변경 함수 */
  onValueChange: (value: string) => void;
  /** 비활성화 여부 */
  disabled: boolean;
  /** 특정 값이 선택되었는지 확인 */
  isSelected: (itemValue: string) => boolean;
}

export function useRadioGroup({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  disabled = false,
}: UseRadioGroupOptions = {}): UseRadioGroupReturn {
  const { value, setValue } = useControllable<string>({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange,
  });

  const isSelected = React.useCallback(
    (itemValue: string) => value === itemValue,
    [value]
  );

  return {
    value,
    onValueChange: setValue,
    disabled,
    isSelected,
  };
}
