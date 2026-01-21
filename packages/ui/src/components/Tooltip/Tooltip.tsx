import * as React from "react";
import { cn } from "../../utils";

export type TooltipSide = "top" | "right" | "bottom" | "left";
export type TooltipAlign = "start" | "center" | "end";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: TooltipSide;
  align?: TooltipAlign;
  sideOffset?: number;
  delayDuration?: number;
  className?: string;
}

const Tooltip = ({
  content,
  children,
  side = "top",
  align = "center",
  sideOffset = 6,
  delayDuration = 100,
  className,
}: TooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delayDuration);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(false);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (isOpen) {
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
  }, [isOpen, isVisible]);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
      : {
          start: "top-0",
          center: "top-1/2 -translate-y-1/2",
          end: "bottom-0",
        }[align];

  const offsetStyle =
    side === "top"
      ? { marginBottom: sideOffset }
      : side === "bottom"
        ? { marginTop: sideOffset }
        : side === "left"
          ? { marginRight: sideOffset }
          : { marginLeft: sideOffset };

  const arrowClasses = {
    top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-l-transparent border-r-transparent border-b-transparent border-t-gray-800",
    bottom:
      "top-0 left-1/2 -translate-x-1/2 -translate-y-full border-l-transparent border-r-transparent border-t-transparent border-b-gray-800",
    left: "right-0 top-1/2 -translate-y-1/2 translate-x-full border-t-transparent border-b-transparent border-r-transparent border-l-gray-800",
    right:
      "left-0 top-1/2 -translate-y-1/2 -translate-x-full border-t-transparent border-b-transparent border-l-transparent border-r-gray-800",
  }[side];

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          style={offsetStyle}
          className={cn(
            "absolute z-50 whitespace-nowrap",
            positionClasses,
            alignClasses,
            "rounded-md bg-gray-800 px-2.5 py-1.5 text-xs text-white shadow-md",
            "transition-all duration-150 ease-out",
            isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95",
            className
          )}
        >
          {content}
          <span
            className={cn("absolute border-4 border-solid", arrowClasses)}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = "Tooltip";

export { Tooltip };
