import * as React from "react";
import { useControllable } from "./useControllable";

export interface UsePopoverOptions {
  /** 열림 상태 (controlled) */
  open?: boolean;
  /** 상태 변경 시 호출되는 콜백 */
  onOpenChange?: (open: boolean) => void;
}

export interface UsePopoverReturn {
  /** 현재 열림 상태 */
  open: boolean;
  /** 열림 상태 변경 함수 */
  setOpen: (open: boolean) => void;
  /** 토글 함수 */
  toggle: () => void;
  /** 열기 함수 */
  onOpen: () => void;
  /** 닫기 함수 */
  onClose: () => void;
}

export function usePopover({
  open: controlledOpen,
  onOpenChange,
}: UsePopoverOptions = {}): UsePopoverReturn {
  const { value: open, setValue: setOpen } = useControllable<boolean>({
    value: controlledOpen,
    defaultValue: false,
    onChange: onOpenChange,
  });

  const toggle = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  const onOpen = React.useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const onClose = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return { open, setOpen, toggle, onOpen, onClose };
}
