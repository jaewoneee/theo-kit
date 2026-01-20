import * as React from "react";
import { cn } from "../../utils";

interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
  name: string;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null
);

const useRadioGroupContext = () => {
  return React.useContext(RadioGroupContext);
};

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const RadioGroup = ({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  name,
  disabled,
  className,
  children,
}: RadioGroupProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const generatedName = React.useId();

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <RadioGroupContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        name: name ?? generatedName,
        disabled,
      }}
    >
      <div role="radiogroup" className={cn("flex flex-col gap-2", className)}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

export interface RadioProps {
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  labelClassName?: string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
}

const Radio = ({
  value,
  className,
  label,
  labelClassName,
  error,
  errorMessage,
  disabled: itemDisabled,
  checked: controlledChecked,
  defaultChecked,
  onChange,
}: RadioProps) => {
  const groupContext = useRadioGroupContext();
  const [internalChecked, setInternalChecked] = React.useState(
    defaultChecked ?? false
  );

  const isInGroup = groupContext !== null;
  const disabled = itemDisabled ?? groupContext?.disabled;

  const isChecked = isInGroup
    ? groupContext.value === value
    : (controlledChecked ?? internalChecked);

  const handleChange = () => {
    if (disabled) return;

    if (isInGroup) {
      groupContext.onValueChange(value);
    } else {
      const newChecked = !isChecked;
      setInternalChecked(newChecked);
      onChange?.(newChecked);
    }
  };

  return (
    <div className="flex flex-col">
      <label
        className={cn(
          "inline-flex items-center gap-2",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        )}
      >
        <span
          tabIndex={disabled ? -1 : 0}
          role="radio"
          aria-checked={isChecked}
          onClick={handleChange}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              handleChange();
            }
          }}
          className={cn(
            "inline-flex size-4 shrink-0 items-center justify-center rounded-full border transition-all",
            "focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
            error
              ? "border-red-500"
              : isChecked
                ? "border-blue-600"
                : "border-gray-300",
            className
          )}
        >
          <span
            className={cn(
              "size-2 rounded-full transition-all",
              isChecked ? "bg-blue-600 scale-100" : "bg-transparent scale-0"
            )}
          />
        </span>
        {label && (
          <span
            onClick={handleChange}
            className={cn("select-none text-sm", labelClassName)}
          >
            {label}
          </span>
        )}
      </label>
      {error && errorMessage && (
        <p className="mt-1.5 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

RadioGroup.displayName = "RadioGroup";
Radio.displayName = "Radio";

export { Radio, RadioGroup, useRadioGroupContext };
