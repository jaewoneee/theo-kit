import { Pressable, View, Text } from "react-native";
import { cn } from "../../utils/cn";
import { useToggle } from "theo-kit-core";

export interface CheckboxProps {
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

const Checkbox = ({
  checked,
  defaultChecked,
  onChange,
  disabled,
  label,
  labelClassName,
  error,
  errorMessage,
  className,
}: CheckboxProps) => {
  const { checked: isChecked, toggle } = useToggle({
    checked,
    defaultChecked,
    onChange,
    disabled,
  });

  return (
    <View>
      <Pressable
        onPress={toggle}
        disabled={disabled}
        className={cn(
          "flex-row items-center gap-2",
          disabled && "opacity-50",
          className
        )}
      >
        <View
          className={cn(
            "h-5 w-5 items-center justify-center rounded border",
            error
              ? "border-red-500"
              : isChecked
                ? "border-blue-600 bg-blue-600"
                : "border-gray-300"
          )}
        >
          {isChecked && (
            <Text className="text-xs font-bold text-white">✓</Text>
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

Checkbox.displayName = "Checkbox";

export { Checkbox };
