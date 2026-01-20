import * as React from "react";
import { cn } from "../../utils";

export interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface PopoverContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within a Popover");
  }
  return context;
};

const Popover = ({
  open: controlledOpen,
  onOpenChange,
  children,
}: PopoverProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const open = controlledOpen ?? internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <PopoverContext.Provider
      value={{ open, onOpenChange: handleOpenChange, triggerRef }}
    >
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
};

export interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

const PopoverTrigger = ({
  children,
  asChild,
  className,
}: PopoverTriggerProps) => {
  const { open, onOpenChange, triggerRef } = usePopoverContext();
  const internalRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (internalRef.current) {
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current =
        internalRef.current;
    }
  }, [triggerRef]);

  const handleClick = () => {
    onOpenChange(!open);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        onClick?: () => void;
        ref?: React.Ref<HTMLElement>;
      }>,
      {
        onClick: handleClick,
        ref: (node: HTMLElement | null) => {
          (triggerRef as React.MutableRefObject<HTMLElement | null>).current =
            node;
        },
      }
    );
  }

  return (
    <button
      type="button"
      ref={internalRef}
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
};

export type PopoverSide = "top" | "right" | "bottom" | "left";
export type PopoverAlign = "start" | "center" | "end";

export interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  side?: PopoverSide;
  align?: PopoverAlign;
  sideOffset?: number;
}

const PopoverContent = ({
  children,
  className,
  side = "bottom",
  align = "start",
  sideOffset = 5,
}: PopoverContentProps) => {
  const { open, onOpenChange, triggerRef } = usePopoverContext();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else if (isVisible) {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [open, isVisible]);

  React.useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // 트리거 클릭은 무시 (트리거에서 토글 처리함)
      if (triggerRef.current?.contains(target)) {
        return;
      }
      if (contentRef.current && !contentRef.current.contains(target)) {
        onOpenChange(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange, triggerRef]);

  if (!isVisible) return null;

  const positionClasses = {
    top: "bottom-full mb-0",
    bottom: "top-full mt-0",
    left: "right-full mr-0",
    right: "left-full ml-0",
  }[side];

  const alignClasses =
    side === "top" || side === "bottom"
      ? {
          start: "left-0",
          center: "left-1/2 -translate-x-1/2",
          end: "right-0",
        }[align]
      : { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" }[
          align
        ];

  const offsetStyle =
    side === "top"
      ? { marginBottom: sideOffset }
      : side === "bottom"
        ? { marginTop: sideOffset }
        : side === "left"
          ? { marginRight: sideOffset }
          : { marginLeft: sideOffset };

  return (
    <div
      ref={contentRef}
      role="dialog"
      aria-modal="false"
      style={offsetStyle}
      className={cn(
        "absolute z-50",
        positionClasses,
        alignClasses,
        "rounded-md border border-gray-200 bg-white p-4 shadow-md",
        "transition-all duration-150 ease-out",
        isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95",
        className
      )}
    >
      {children}
    </div>
  );
};

export interface PopoverCloseProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

const PopoverClose = ({ children, asChild, className }: PopoverCloseProps) => {
  const { onOpenChange } = usePopoverContext();

  const handleClick = () => {
    onOpenChange(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ onClick?: () => void }>,
      {
        onClick: handleClick,
      }
    );
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

Popover.displayName = "Popover";
PopoverTrigger.displayName = "PopoverTrigger";
PopoverContent.displayName = "PopoverContent";
PopoverClose.displayName = "PopoverClose";

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  usePopoverContext,
};
