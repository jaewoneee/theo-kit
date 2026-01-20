import * as React from "react";
import { cn } from "../../utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  /** InputGroup 내부에서 사용될 때 true */
  grouped?: boolean;
  /** IME 조합 중 여부를 외부에서 제어할 때 사용 */
  onComposingChange?: (isComposing: boolean) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      error,
      errorMessage,
      grouped,
      onComposingChange,
      onCompositionStart,
      onCompositionEnd,
      ...props
    },
    ref
  ) => {
    const handleCompositionStart = (
      e: React.CompositionEvent<HTMLInputElement>
    ) => {
      onComposingChange?.(true);
      onCompositionStart?.(e);
    };

    const handleCompositionEnd = (
      e: React.CompositionEvent<HTMLInputElement>
    ) => {
      onComposingChange?.(false);
      onCompositionEnd?.(e);
    };

    const input = (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full bg-transparent px-3 py-2 text-sm transition-all",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-gray-400",
          "focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !grouped && [
            "rounded-md border",
            "focus:border-blue-500",
            error ? "border-red-500" : "border-gray-200",
          ],
          className
        )}
        ref={ref}
        aria-invalid={error}
        aria-describedby={error && errorMessage ? "input-error" : undefined}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        {...props}
      />
    );

    if (grouped) {
      return input;
    }

    return (
      <div className="w-full">
        {input}
        {error && errorMessage && (
          <p id="input-error" className="mt-1.5 text-sm text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
