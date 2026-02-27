import * as React from "react";
import { Pressable, View, Text } from "react-native";
import { cn } from "../../utils/cn";
import { useRadioGroup, useToggle } from "theo-kit-core";
import type { UseRadioGroupReturn } from "theo-kit-core";

type RadioGroupContextValue = UseRadioGroupReturn & { name: string };

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

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
  value,
  defaultValue,
  onValueChange,
  name = "",
  disabled,
  className,
  children,
}: RadioGroupProps) => {
  const radioGroup = useRadioGroup({
    value,
    defaultValue,
    onValueChange,
    disabled,
  });

  return (
    <RadioGroupContext.Provider value={{ ...radioGroup, name }}>
      <View className={cn("gap-2", className)}>{children}</View>
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
  checked: controlledChecked,
  defaultChecked,
  onChange,
  disabled: itemDisabled,
  label,
  labelClassName,
  error,
  errorMessage,
  className,
}: RadioProps) => {
  const groupContext = useRadioGroupContext();
  const { checked: standaloneChecked, toggle: standaloneToggle } = useToggle({
    checked: controlledChecked,
    defaultChecked,
    onChange,
    disabled: itemDisabled,
  });

  const isInGroup = groupContext !== null;
  const disabled = itemDisabled ?? groupContext?.disabled;

  const isChecked = isInGroup
    ? groupContext.isSelected(value)
    : standaloneChecked;

  const handlePress = () => {
    if (disabled) return;
    if (isInGroup) {
      groupContext.onValueChange(value);
    } else {
      standaloneToggle();
    }
  };

  return (
    <View>
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        className={cn(
          "flex-row items-center gap-2",
          disabled && "opacity-50",
          className
        )}
      >
        <View
          className={cn(
            "h-4 w-4 items-center justify-center rounded-full border",
            error
              ? "border-red-500"
              : isChecked
                ? "border-blue-600"
                : "border-gray-300"
          )}
        >
          {isChecked && (
            <View className="h-2 w-2 rounded-full bg-blue-600" />
          )}
        </View>
        {label && (
          <Text className={cn("text-sm", labelClassName)}>{label}</Text>
        )}
      </Pressable>
      {error && errorMessage && (
        <Text className="mt-1.5 text-sm text-red-500">{errorMessage}</Text>
      )}
    </View>
  );
};

RadioGroup.displayName = "RadioGroup";
Radio.displayName = "Radio";

export { Radio, RadioGroup, useRadioGroupContext };
