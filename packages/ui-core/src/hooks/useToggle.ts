import * as React from "react";
import { useControllable } from "./useControllable";

export interface UseToggleOptions {
  /** 외부에서 제어되는 체크 상태 (controlled) */
  checked?: boolean;
  /** 비제어 모드의 기본 체크 상태 (uncontrolled) */
  defaultChecked?: boolean;
  /** 체크 상태 변경 시 호출되는 콜백 */
  onChange?: (checked: boolean) => void;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export interface UseToggleReturn {
  /** 현재 체크 상태 */
  checked: boolean;
  /** 토글 함수 */
  toggle: () => void;
  /** 직접 상태 설정 함수 */
  setChecked: (checked: boolean | ((prev: boolean) => boolean)) => void;
  /** 비활성화 여부 */
  disabled: boolean;
}

export function useToggle({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
}: UseToggleOptions = {}): UseToggleReturn {
  const { value, setValue } = useControllable<boolean>({
    value: checked,
    defaultValue: defaultChecked ?? false,
    onChange,
  });

  const toggle = React.useCallback(() => {
    if (disabled) return;
    setValue((prev) => !prev);
  }, [disabled, setValue]);

  return {
    checked: value,
    toggle,
    setChecked: setValue,
    disabled,
  };
}
