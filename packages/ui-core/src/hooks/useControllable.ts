import * as React from "react";

export interface UseControllableOptions<T> {
  /** 외부에서 제어되는 값 (controlled) */
  value?: T;
  /** 비제어 모드의 기본값 (uncontrolled) */
  defaultValue: T;
  /** 값 변경 시 호출되는 콜백 */
  onChange?: (value: T) => void;
}

export interface UseControllableReturn<T> {
  /** 현재 값 (controlled 또는 internal) */
  value: T;
  /** 값 업데이트 함수 */
  setValue: (value: T | ((prev: T) => T)) => void;
  /** controlled 모드 여부 */
  isControlled: boolean;
}

export function useControllable<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseControllableOptions<T>): UseControllableReturn<T> {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const value = isControlled ? controlledValue! : internalValue;

  const setValue = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      const nextValue =
        typeof next === "function"
          ? (next as (prev: T) => T)(value)
          : next;

      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange, value]
  );

  return { value, setValue, isControlled };
}
