import * as React from "react";
import { cn } from "../../utils";
import { Check, ChevronDown } from "lucide-react";

interface SelectContextValue {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  clearable: boolean;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select");
  }
  return context;
};

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  /** 선택된 옵션을 다시 클릭하면 선택 해제 */
  clearable?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Select = ({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  placeholder = "Select an option",
  error,
  errorMessage,
  disabled,
  clearable = false,
  children,
  className,
}: SelectProps) => {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const selectRef = React.useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open]);

  const displayValue = React.useMemo(() => {
    let label = "";
    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement<SelectOptionProps>(child) &&
        child.props.value === value
      ) {
        label = child.props.children as string;
      }
    });
    return label;
  }, [children, value]);

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        open,
        setOpen,
        clearable,
      }}
    >
      <div className={cn("relative w-full", className)} ref={selectRef}>
        <button
          type="button"
          onClick={() => !disabled && setOpen(!open)}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm cursor-pointer",
            "focus:outline-none focus:border-blue-500 ",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500" : "border-gray-200",
            !displayValue && "text-gray-400"
          )}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <span className="truncate">{displayValue || placeholder}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-gray-400 transition-transform",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <div
            className={cn(
              "absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 shadow-lg",
              "animate-in fade-in-0 zoom-in-95"
            )}
            role="listbox"
          >
            {children}
          </div>
        )}

        {error && errorMessage && (
          <p className="mt-1.5 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    </SelectContext.Provider>
  );
};

export interface SelectOptionProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const SelectOption = ({
  value,
  children,
  disabled,
  className,
}: SelectOptionProps) => {
  const { value: selectedValue, onValueChange, clearable } = useSelectContext();
  const isSelected = selectedValue === value;

  const handleClick = () => {
    if (disabled) return;
    if (clearable && isSelected) {
      onValueChange("");
    } else {
      onValueChange(value);
    }
  };

  return (
    <div
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      onClick={handleClick}
      className={cn(
        "relative flex cursor-pointer select-none items-center px-3 py-2 text-sm outline-none",
        "hover:bg-gray-100",
        isSelected && "bg-gray-100",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <span className="flex-1">{children}</span>
      {isSelected && <Check className="h-4 w-4 text-blue-600" />}
    </div>
  );
};

Select.displayName = "Select";
SelectOption.displayName = "SelectOption";

export { Select, SelectOption };
