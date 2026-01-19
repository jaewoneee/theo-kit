import * as React from "react";
import { cn } from "../../utils";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: boolean;
  children: React.ReactNode;
}

export interface InputAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const InputGroupContext = React.createContext<{ error?: boolean }>({});

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <InputGroupContext.Provider value={{ error }}>
        <div
          ref={ref}
          className={cn(
            "flex w-full items-center rounded-md border bg-white transition-all",
            "focus-within:border-blue-500",
            error ? "border-red-500" : "border-gray-200",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </InputGroupContext.Provider>
    );
  }
);

InputGroup.displayName = "InputGroup";

const InputLeftAddon = React.forwardRef<HTMLDivElement, InputAddonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center pl-3 text-gray-500",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InputLeftAddon.displayName = "InputLeftAddon";

const InputRightAddon = React.forwardRef<HTMLDivElement, InputAddonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center pr-3 text-gray-500",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InputRightAddon.displayName = "InputRightAddon";

const useInputGroupContext = () => React.useContext(InputGroupContext);

export { InputGroup, InputLeftAddon, InputRightAddon, useInputGroupContext };
