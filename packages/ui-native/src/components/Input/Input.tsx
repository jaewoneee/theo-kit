import * as React from "react";
import { TextInput, View, Text } from "react-native";
import { cn } from "../../utils/cn";

export interface InputProps {
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  className?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  multiline?: boolean;
}

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      value,
      defaultValue,
      onChangeText,
      placeholder,
      disabled,
      error,
      errorMessage,
      label,
      className,
      secureTextEntry,
      keyboardType,
      multiline,
    },
    ref
  ) => {
    return (
      <View>
        {label && (
          <Text className="mb-1.5 text-sm font-medium text-gray-700">
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          placeholder={placeholder}
          editable={!disabled}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          placeholderTextColor="#9ca3af"
          className={cn(
            "rounded-md border bg-white px-3 py-2 text-sm",
            error ? "border-red-500" : "border-gray-200",
            disabled && "opacity-50 bg-gray-100",
            multiline && "min-h-[80px] py-3",
            className
          )}
        />
        {error && errorMessage && (
          <Text className="mt-1.5 text-sm text-red-500">{errorMessage}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

export { Input };
