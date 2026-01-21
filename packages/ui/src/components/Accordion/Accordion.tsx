import * as React from "react";
import { cn } from "../../utils";
import { ChevronDown } from "lucide-react";

export interface AccordionProps {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: React.ReactNode;
  className?: string;
}

interface AccordionContextValue {
  type: "single" | "multiple";
  value: string[];
  onToggle: (itemValue: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null
);

const useAccordionContext = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
};

const Accordion = ({
  type = "single",
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
  className,
}: AccordionProps) => {
  const [internalValue, setInternalValue] = React.useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const value = controlledValue
    ? Array.isArray(controlledValue)
      ? controlledValue
      : [controlledValue]
    : internalValue;

  const onToggle = (itemValue: string) => {
    let newValue: string[];

    if (type === "single") {
      newValue = value.includes(itemValue) ? [] : [itemValue];
    } else {
      newValue = value.includes(itemValue)
        ? value.filter((v) => v !== itemValue)
        : [...value, itemValue];
    }

    setInternalValue(newValue);
    onValueChange?.(type === "single" ? (newValue[0] ?? "") : newValue);
  };

  return (
    <AccordionContext.Provider value={{ type, value, onToggle }}>
      <div className={cn("divide-y divide-gray-200", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  disabled: boolean;
}

const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null);

const useAccordionItemContext = () => {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "AccordionItem components must be used within an AccordionItem"
    );
  }
  return context;
};

const AccordionItem = ({
  value,
  children,
  className,
  disabled = false,
}: AccordionItemProps) => {
  const { value: openValues } = useAccordionContext();
  const isOpen = openValues.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, disabled }}>
      <div className={cn("", className)}>{children}</div>
    </AccordionItemContext.Provider>
  );
};

export interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionTrigger = ({ children, className }: AccordionTriggerProps) => {
  const { onToggle } = useAccordionContext();
  const { value, isOpen, disabled } = useAccordionItemContext();

  return (
    <button
      type="button"
      onClick={() => !disabled && onToggle(value)}
      disabled={disabled}
      aria-expanded={isOpen}
      className={cn(
        "flex w-full cursor-pointer items-center justify-between py-4 text-left font-medium transition-colors",
        "hover:text-gray-600",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "size-4 shrink-0 text-gray-500 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
};

export interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionContent = ({ children, className }: AccordionContentProps) => {
  const { isOpen } = useAccordionItemContext();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | undefined>(
    isOpen ? undefined : 0
  );

  React.useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
      const timer = setTimeout(() => setHeight(undefined), 200);
      return () => clearTimeout(timer);
    } else {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHeight(0);
        });
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={contentRef}
      style={{ height }}
      className={cn(
        "overflow-hidden transition-[height] duration-200 ease-out"
      )}
    >
      <div className={cn("pb-4 text-sm text-gray-600", className)}>
        {children}
      </div>
    </div>
  );
};

Accordion.displayName = "Accordion";
AccordionItem.displayName = "AccordionItem";
AccordionTrigger.displayName = "AccordionTrigger";
AccordionContent.displayName = "AccordionContent";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  useAccordionContext,
  useAccordionItemContext,
};
