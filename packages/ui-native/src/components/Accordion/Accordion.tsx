import * as React from "react";
import { Pressable, View, Text, LayoutAnimation, Platform, UIManager } from "react-native";
import { cn } from "../../utils/cn";
import { useAccordion } from "theo-kit-core";
import type { UseAccordionReturn } from "theo-kit-core";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface AccordionProps {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: React.ReactNode;
  className?: string;
}

const AccordionContext = React.createContext<UseAccordionReturn | null>(null);

const useAccordionContext = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
};

const Accordion = ({
  type,
  value,
  defaultValue,
  onValueChange,
  children,
  className,
}: AccordionProps) => {
  const accordion = useAccordion({ type, value, defaultValue, onValueChange });

  return (
    <AccordionContext.Provider value={accordion}>
      <View className={cn("border-t border-gray-200", className)}>
        {children}
      </View>
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
    throw new Error("AccordionItem components must be used within an AccordionItem");
  }
  return context;
};

const AccordionItem = ({
  value,
  children,
  className,
  disabled = false,
}: AccordionItemProps) => {
  const { isOpen } = useAccordionContext();

  return (
    <AccordionItemContext.Provider
      value={{ value, isOpen: isOpen(value), disabled }}
    >
      <View className={cn("border-b border-gray-200", className)}>
        {children}
      </View>
    </AccordionItemContext.Provider>
  );
};

export interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionTrigger = ({ children, className }: AccordionTriggerProps) => {
  const { toggle } = useAccordionContext();
  const { value, isOpen, disabled } = useAccordionItemContext();

  const handlePress = () => {
    if (disabled) return;
    if (Platform.OS !== "web") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    toggle(value);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={cn(
        "flex-row items-center justify-between py-4",
        disabled && "opacity-50",
        className
      )}
    >
      <Text className="flex-1 font-medium text-gray-900">{children}</Text>
      <Text className={cn("text-gray-500", isOpen && "rotate-180")}>
        ▾
      </Text>
    </Pressable>
  );
};

export interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionContent = ({ children, className }: AccordionContentProps) => {
  const { isOpen } = useAccordionItemContext();

  if (!isOpen) return null;

  return (
    <View className={cn("pb-4", className)}>
      <Text className="text-sm text-gray-600">{children}</Text>
    </View>
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
