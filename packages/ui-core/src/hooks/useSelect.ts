import * as React from "react";
import { useControllable } from "./useControllable";

export interface UseSelectOptions {
  /** 선택된 값 (controlled) */
  value?: string;
  /** 기본 선택 값 (uncontrolled) */
  defaultValue?: string;
  /** 값 변경 시 호출되는 콜백 */
  onValueChange?: (value: string) => void;
  /** 선택 해제 가능 여부 */
  clearable?: boolean;
}

export interface UseSelectReturn {
  /** 현재 선택된 값 */
  value: string;
  /** 값 변경 함수 (변경 후 자동으로 닫힘) */
  onValueChange: (value: string) => void;
  /** 드롭다운 열림 상태 */
  open: boolean;
  /** 드롭다운 열림 상태 변경 함수 */
  setOpen: (open: boolean) => void;
  /** 선택 해제 가능 여부 */
  clearable: boolean;
  /** 특정 값이 선택되었는지 확인 */
  isSelected: (itemValue: string) => boolean;
}

export function useSelect({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  clearable = false,
}: UseSelectOptions = {}): UseSelectReturn {
  const [open, setOpen] = React.useState(false);

  const { value, setValue } = useControllable<string>({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange,
  });

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      setValue(newValue);
      setOpen(false);
    },
    [setValue]
  );

  const isSelected = React.useCallback(
    (itemValue: string) => value === itemValue,
    [value]
  );

  return {
    value,
    onValueChange: handleValueChange,
    open,
    setOpen,
    clearable,
    isSelected,
  };
}
