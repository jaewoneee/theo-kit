import * as React from "react";
import { useControllable } from "./useControllable";

export interface UseTagInputOptions {
  /** 태그 목록 (controlled) */
  value?: string[];
  /** 기본 태그 목록 (uncontrolled) */
  defaultValue?: string[];
  /** 태그 변경 시 호출되는 콜백 */
  onChange?: (tags: string[]) => void;
  /** 중복 태그 허용 여부 */
  allowDuplicates?: boolean;
  /** 최대 태그 개수 */
  maxTags?: number;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export interface UseTagInputReturn {
  /** 현재 태그 목록 */
  tags: string[];
  /** 태그 추가 (빈 문자열/중복/최대 개수 초과 시 무시) */
  addTag: (tag: string) => void;
  /** 인덱스로 태그 제거 */
  removeTag: (index: number) => void;
  /** 비활성화 여부 */
  disabled: boolean;
}

export function useTagInput({
  value: controlledValue,
  defaultValue = [],
  onChange,
  allowDuplicates = false,
  maxTags,
  disabled = false,
}: UseTagInputOptions = {}): UseTagInputReturn {
  const { value: tags, setValue: setTags } = useControllable<string[]>({
    value: controlledValue,
    defaultValue,
    onChange,
  });

  const addTag = React.useCallback(
    (tag: string) => {
      const trimmedTag = tag.trim();
      if (!trimmedTag) return;
      if (!allowDuplicates && tags.includes(trimmedTag)) return;
      if (maxTags && tags.length >= maxTags) return;

      setTags([...tags, trimmedTag]);
    },
    [tags, allowDuplicates, maxTags, setTags]
  );

  const removeTag = React.useCallback(
    (index: number) => {
      if (disabled) return;
      setTags(tags.filter((_, i) => i !== index));
    },
    [tags, disabled, setTags]
  );

  return { tags, addTag, removeTag, disabled };
}
