import * as React from "react";
import { useControllable } from "./useControllable";

export interface UseQuantityInputOptions {
  /** 현재 값 (controlled) */
  value?: number;
  /** 기본 값 (uncontrolled) */
  defaultValue?: number;
  /** 최소 값 */
  min?: number;
  /** 최대 값 */
  max?: number;
  /** 증감 단위 */
  step?: number;
  /** 값 변경 시 호출되는 콜백 */
  onChange?: (value: number) => void;
}

export interface UseQuantityInputReturn {
  /** 현재 값 */
  value: number;
  /** 증가 */
  increment: () => void;
  /** 감소 */
  decrement: () => void;
  /** 직접 값 설정 (clamping 적용됨) */
  setValue: (value: number) => void;
  /** 최소값에 도달했는지 */
  isAtMin: boolean;
  /** 최대값에 도달했는지 */
  isAtMax: boolean;
}

export function useQuantityInput({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = Infinity,
  step = 1,
  onChange,
}: UseQuantityInputOptions = {}): UseQuantityInputReturn {
  const clamp = React.useCallback(
    (v: number) => Math.min(Math.max(v, min), max),
    [min, max]
  );

  const { value, setValue: setRawValue } = useControllable<number>({
    value: controlledValue,
    defaultValue,
    onChange,
  });

  const setValue = React.useCallback(
    (newValue: number) => {
      setRawValue(clamp(newValue));
    },
    [setRawValue, clamp]
  );

  const increment = React.useCallback(() => {
    setValue(value + step);
  }, [value, step, setValue]);

  const decrement = React.useCallback(() => {
    setValue(value - step);
  }, [value, step, setValue]);

  return {
    value,
    increment,
    decrement,
    setValue,
    isAtMin: value <= min,
    isAtMax: value >= max,
  };
}
