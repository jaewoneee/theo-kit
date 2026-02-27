import * as React from "react";
import { Pressable, TextInput, View, Text } from "react-native";
import { cn } from "../../utils/cn";
import { useQuantityInput } from "theo-kit-core";

export interface QuantityInputProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { button: "h-7 w-7", input: "h-7 w-10 text-sm", text: "text-sm" },
  md: { button: "h-9 w-9", input: "h-9 w-12 text-base", text: "text-base" },
  lg: { button: "h-11 w-11", input: "h-11 w-14 text-lg", text: "text-lg" },
};

const QuantityInput = ({
  value: controlledValue,
  defaultValue,
  min,
  max,
  step,
  onChange,
  size = "md",
  disabled,
  className,
}: QuantityInputProps) => {
  const quantity = useQuantityInput({
    value: controlledValue,
    defaultValue,
    min,
    max,
    step,
    onChange,
  });

  const handleInputChange = (text: string) => {
    const newValue = parseInt(text, 10);
    if (!isNaN(newValue)) {
      quantity.setValue(newValue);
    }
  };

  const sizes = sizeConfig[size];

  return (
    <View className={cn("flex-row items-center", className)}>
      <Pressable
        onPress={quantity.decrement}
        disabled={disabled || quantity.isAtMin}
        className={cn(
          "items-center justify-center rounded-l border border-gray-300 bg-gray-50",
          (disabled || quantity.isAtMin) && "opacity-40",
          sizes.button
        )}
      >
        <Text className={cn("text-gray-600", sizes.text)}>−</Text>
      </Pressable>

      <TextInput
        value={String(quantity.value)}
        onChangeText={handleInputChange}
        editable={!disabled}
        keyboardType="numeric"
        className={cn(
          "border-y border-gray-300 text-center",
          disabled && "opacity-50 bg-gray-100",
          sizes.input
        )}
      />

      <Pressable
        onPress={quantity.increment}
        disabled={disabled || quantity.isAtMax}
        className={cn(
          "items-center justify-center rounded-r border border-gray-300 bg-gray-50",
          (disabled || quantity.isAtMax) && "opacity-40",
          sizes.button
        )}
      >
        <Text className={cn("text-gray-600", sizes.text)}>+</Text>
      </Pressable>
    </View>
  );
};

QuantityInput.displayName = "QuantityInput";

export { QuantityInput };
