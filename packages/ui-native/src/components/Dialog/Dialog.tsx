import * as React from "react";
import { Modal, Pressable, View, Text } from "react-native";
import { cn } from "../../utils/cn";
import { useDialog } from "theo-kit-core";

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  children: React.ReactNode;
}

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modal: boolean;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

const useDialogContext = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog");
  }
  return context;
};

const Dialog = ({
  open: controlledOpen,
  onOpenChange,
  modal = false,
  children,
}: DialogProps) => {
  const dialog = useDialog({ open: controlledOpen, onOpenChange, modal });

  return (
    <DialogContext.Provider
      value={{ open: dialog.open, onOpenChange: dialog.setOpen, modal: dialog.modal }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export interface DialogTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const DialogTrigger = ({ children, className }: DialogTriggerProps) => {
  const { onOpenChange } = useDialogContext();

  return (
    <Pressable onPress={() => onOpenChange(true)} className={className}>
      {children}
    </Pressable>
  );
};

export interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

const DialogContent = ({ children, className }: DialogContentProps) => {
  const { open, onOpenChange, modal } = useDialogContext();

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => {
        if (!modal) onOpenChange(false);
      }}
    >
      <Pressable
        onPress={() => {
          if (!modal) onOpenChange(false);
        }}
        className="flex-1 items-center justify-center bg-black/50 p-4"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className={cn(
            "w-full max-w-sm rounded-lg bg-white p-6 shadow-lg",
            className
          )}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const DialogHeader = ({ className, children }: DialogHeaderProps) => (
  <View className={cn("mb-4", className)}>{children}</View>
);

export interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

const DialogTitle = ({ className, children }: DialogTitleProps) => (
  <Text className={cn("text-lg font-semibold", className)}>{children}</Text>
);

export interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const DialogDescription = ({ className, children }: DialogDescriptionProps) => (
  <Text className={cn("mt-1 text-sm text-gray-500", className)}>
    {children}
  </Text>
);

export interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

const DialogFooter = ({ className, children }: DialogFooterProps) => (
  <View className={cn("mt-6 flex-row justify-end gap-2", className)}>
    {children}
  </View>
);

export interface DialogCloseProps {
  children?: React.ReactNode;
  className?: string;
}

const DialogClose = ({ children, className }: DialogCloseProps) => {
  const { onOpenChange } = useDialogContext();

  return (
    <Pressable onPress={() => onOpenChange(false)} className={className}>
      {children || <Text className="text-gray-500">✕</Text>}
    </Pressable>
  );
};

Dialog.displayName = "Dialog";
DialogTrigger.displayName = "DialogTrigger";
DialogContent.displayName = "DialogContent";
DialogHeader.displayName = "DialogHeader";
DialogTitle.displayName = "DialogTitle";
DialogDescription.displayName = "DialogDescription";
DialogFooter.displayName = "DialogFooter";
DialogClose.displayName = "DialogClose";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  useDialogContext,
};
