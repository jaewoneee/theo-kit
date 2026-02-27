import * as React from "react";

export interface UseAccordionOptions {
  /** 아코디언 타입: single(하나만 열림) 또는 multiple(여러 개 열림) */
  type?: "single" | "multiple";
  /** 열린 항목들 (controlled) */
  value?: string | string[];
  /** 기본 열린 항목들 (uncontrolled) */
  defaultValue?: string | string[];
  /** 값 변경 시 호출되는 콜백 */
  onValueChange?: (value: string | string[]) => void;
}

export interface UseAccordionReturn {
  /** 아코디언 타입 */
  type: "single" | "multiple";
  /** 현재 열린 항목들 */
  openItems: string[];
  /** 항목 토글 함수 */
  toggle: (itemValue: string) => void;
  /** 특정 항목이 열려있는지 확인 */
  isOpen: (itemValue: string) => boolean;
}

export function useAccordion({
  type = "single",
  value: controlledValue,
  defaultValue,
  onValueChange,
}: UseAccordionOptions = {}): UseAccordionReturn {
  const [internalValue, setInternalValue] = React.useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const openItems = controlledValue
    ? Array.isArray(controlledValue)
      ? controlledValue
      : [controlledValue]
    : internalValue;

  const toggle = React.useCallback(
    (itemValue: string) => {
      let newValue: string[];

      if (type === "single") {
        newValue = openItems.includes(itemValue) ? [] : [itemValue];
      } else {
        newValue = openItems.includes(itemValue)
          ? openItems.filter((v) => v !== itemValue)
          : [...openItems, itemValue];
      }

      setInternalValue(newValue);
      onValueChange?.(type === "single" ? (newValue[0] ?? "") : newValue);
    },
    [type, openItems, onValueChange]
  );

  const isOpen = React.useCallback(
    (itemValue: string) => openItems.includes(itemValue),
    [openItems]
  );

  return { type, openItems, toggle, isOpen };
}
