import * as React from "react";
import { useControllable } from "./useControllable";

export type DialogAnimationState = "entering" | "entered" | "exiting";

export interface UseDialogOptions {
  /** 열림 상태 (controlled) */
  open?: boolean;
  /** 상태 변경 시 호출되는 콜백 */
  onOpenChange?: (open: boolean) => void;
  /** true면 외부 클릭/ESC로 닫히지 않음 */
  modal?: boolean;
}

export interface UseDialogReturn {
  /** 현재 열림 상태 */
  open: boolean;
  /** 열림 상태 변경 함수 */
  setOpen: (open: boolean) => void;
  /** 모달 모드 여부 */
  modal: boolean;
  /** 애니메이션 상태 */
  animationState: DialogAnimationState;
  /** DOM이 렌더링되어야 하는지 (exit 애니메이션 중에도 true) */
  isVisible: boolean;
  /** enter 애니메이션이 완료되었는지 */
  isAnimatingIn: boolean;
}

export function useDialog({
  open: controlledOpen,
  onOpenChange,
  modal = false,
}: UseDialogOptions = {}): UseDialogReturn {
  const { value: open, setValue: setOpen } = useControllable<boolean>({
    value: controlledOpen,
    defaultValue: false,
    onChange: onOpenChange,
  });

  const [animationState, setAnimationState] =
    React.useState<DialogAnimationState>("entering");
  const [isVisible, setIsVisible] = React.useState(false);
  const wasOpen = React.useRef(false);

  React.useEffect(() => {
    if (open) {
      wasOpen.current = true;
      setIsVisible(true);
      setAnimationState("entering");
      const timer = setTimeout(() => {
        setAnimationState("entered");
      }, 16);
      return () => clearTimeout(timer);
    } else if (wasOpen.current) {
      setAnimationState("exiting");
      const timer = setTimeout(() => {
        setIsVisible(false);
        setAnimationState("entering");
        wasOpen.current = false;
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return {
    open,
    setOpen,
    modal,
    animationState,
    isVisible,
    isAnimatingIn: animationState === "entered",
  };
}
