import { Pressable, View, Text, Animated, Platform } from "react-native";
import { useRef, useEffect } from "react";
import { cn } from "../../utils/cn";
import { useToggle } from "theo-kit-core";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  labelClassName?: string;
  className?: string;
}

const sizeConfig = {
  sm: { trackW: 28, trackH: 16, thumbSize: 12, translate: 12 },
  md: { trackW: 36, trackH: 20, thumbSize: 16, translate: 16 },
  lg: { trackW: 44, trackH: 24, thumbSize: 20, translate: 20 },
};

const Switch = ({
  checked,
  defaultChecked,
  onChange,
  disabled,
  size = "md",
  label,
  labelClassName,
  className,
}: SwitchProps) => {
  const { checked: isChecked, toggle } = useToggle({
    checked,
    defaultChecked,
    onChange,
    disabled,
  });

  const config = sizeConfig[size];
  const translateAnim = useRef(new Animated.Value(isChecked ? config.translate : 2)).current;

  useEffect(() => {
    Animated.timing(translateAnim, {
      toValue: isChecked ? config.translate : 2,
      duration: 200,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [isChecked, config.translate, translateAnim]);

  return (
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
        style={{ width: config.trackW, height: config.trackH }}
        className={cn(
          "rounded-full justify-center",
          isChecked ? "bg-blue-600" : "bg-gray-200"
        )}
      >
        <Animated.View
          style={{
            width: config.thumbSize,
            height: config.thumbSize,
            transform: [{ translateX: translateAnim }],
          }}
          className="rounded-full bg-white shadow-sm"
        />
      </View>
      {label && (
        <Text className={cn("text-sm", labelClassName)}>{label}</Text>
      )}
    </Pressable>
  );
};

Switch.displayName = "Switch";

export { Switch };
