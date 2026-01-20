import * as React from "react";
import { cn } from "../../utils";
import { X } from "lucide-react";

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** true면 외부 클릭해도 닫히지 않음 */
  modal?: boolean;
  children: React.ReactNode;
}

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modal: boolean;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

const useDialogContext = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog");
  }
  return context;
};

const Dialog = ({
  open: controlledOpen,
  onOpenChange,
  modal = false,
  children,
}: DialogProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen ?? internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <DialogContext.Provider value={{ open, onOpenChange: handleOpenChange, modal }}>
      {children}
    </DialogContext.Provider>
  );
};

export interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

const DialogTrigger = ({ children, asChild, className }: DialogTriggerProps) => {
  const { onOpenChange } = useDialogContext();

  const handleClick = () => {
    onOpenChange(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: handleClick,
    });
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

export interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

const DialogContent = ({ children, className }: DialogContentProps) => {
  const { open, onOpenChange, modal } = useDialogContext();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [animationState, setAnimationState] = React.useState<
    "entering" | "entered" | "exiting"
  >("entering");
  const wasOpen = React.useRef(false);

  React.useEffect(() => {
    if (open) {
      wasOpen.current = true;
      setIsVisible(true);
      setAnimationState("entering");
      // 다음 프레임에서 entered로 전환하여 애니메이션 트리거
      const enterTimer = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationState("entered");
        });
      });
      return () => cancelAnimationFrame(enterTimer);
    } else if (wasOpen.current) {
      setAnimationState("exiting");
      const exitTimer = setTimeout(() => {
        setIsVisible(false);
        setAnimationState("entering");
        wasOpen.current = false;
      }, 200);
      return () => clearTimeout(exitTimer);
    }
  }, [open]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !modal) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [open, onOpenChange, modal]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (!modal && event.target === event.currentTarget) {
      onOpenChange(false);
    }
  };

  if (!isVisible) return null;

  const isAnimatingIn = animationState === "entered";

  return (
    <div className="fixed inset-0 z-50">
      <div
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-200",
          isAnimatingIn ? "opacity-100" : "opacity-0"
        )}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 flex items-center justify-center p-4"
        onClick={handleOverlayClick}
      >
        <div
          ref={contentRef}
          role="dialog"
          aria-modal="true"
          className={cn(
            "relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg",
            "transition-all duration-200 ease-out",
            isAnimatingIn
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95",
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const DialogHeader = ({ children, className }: DialogHeaderProps) => {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
};

export interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

const DialogTitle = ({ children, className }: DialogTitleProps) => {
  return (
    <h2 className={cn("text-lg font-semibold", className)}>
      {children}
    </h2>
  );
};

export interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const DialogDescription = ({ children, className }: DialogDescriptionProps) => {
  return (
    <p className={cn("mt-1 text-sm text-gray-500", className)}>
      {children}
    </p>
  );
};

export interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

const DialogFooter = ({ children, className }: DialogFooterProps) => {
  return (
    <div className={cn("mt-6 flex justify-end gap-2", className)}>
      {children}
    </div>
  );
};

export interface DialogCloseProps {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

const DialogClose = ({ children, asChild, className }: DialogCloseProps) => {
  const { onOpenChange } = useDialogContext();

  const handleClick = () => {
    onOpenChange(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: handleClick,
    });
  }

  if (!children) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          className
        )}
      >
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </button>
    );
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

Dialog.displayName = "Dialog";
DialogTrigger.displayName = "DialogTrigger";
DialogContent.displayName = "DialogContent";
DialogHeader.displayName = "DialogHeader";
DialogTitle.displayName = "DialogTitle";
DialogDescription.displayName = "DialogDescription";
DialogFooter.displayName = "DialogFooter";
DialogClose.displayName = "DialogClose";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  useDialogContext,
};
