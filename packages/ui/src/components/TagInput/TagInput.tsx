import * as React from "react";
import { cn } from "../../utils";
import { X } from "lucide-react";
import { Badge } from "../Badge";

export interface TagInputProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  /** 중복 태그 허용 여부 */
  allowDuplicates?: boolean;
  /** 최대 태그 개수 */
  maxTags?: number;
  className?: string;
}

const TagInput = ({
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = "Enter a tag...",
  disabled,
  error,
  errorMessage,
  allowDuplicates = false,
  maxTags,
  className,
}: TagInputProps) => {
  const [internalTags, setInternalTags] =
    React.useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = React.useState("");
  const [isComposing, setIsComposing] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const tags = controlledValue ?? internalTags;

  const updateTags = (newTags: string[]) => {
    if (controlledValue === undefined) {
      setInternalTags(newTags);
    }
    onChange?.(newTags);
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;
    if (!allowDuplicates && tags.includes(trimmedTag)) return;
    if (maxTags && tags.length >= maxTags) return;

    updateTags([...tags, trimmedTag]);
    setInputValue("");
  };

  const removeTag = (index: number) => {
    if (disabled) return;
    updateTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isComposing) return;
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col">
      <div
        onClick={handleContainerClick}
        className={cn(
          "flex flex-wrap items-center gap-1.5 rounded-md border bg-white px-3 py-2 min-h-10",
          "focus-within:border-blue-500 ",
          disabled && "cursor-not-allowed opacity-50",
          error ? "border-red-500" : "border-gray-200",
          className
        )}
      >
        {tags.map((tag, index) => (
          <Badge
            key={`${tag}-${index}`}
            className={cn(disabled && "opacity-50")}
            rightSlot={
              !disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(index);
                  }}
                  className="rounded-sm hover:bg-gray-200 p-0.5"
                >
                  <X size={14} className="text-gray-500" />
                </button>
              )
            }
          >
            {tag}
          </Badge>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder={tags.length === 0 ? placeholder : ""}
          disabled={disabled}
          className={cn(
            "flex-1 min-w-20 bg-transparent text-sm outline-none",
            "placeholder:text-gray-400",
            "disabled:cursor-not-allowed"
          )}
        />
      </div>
      {error && errorMessage && (
        <p className="mt-1.5 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

TagInput.displayName = "TagInput";

export { TagInput };
