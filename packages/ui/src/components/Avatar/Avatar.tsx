import * as React from "react";
import { cn } from "../../utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  src?: string;
  fallbackSrc?: string;
  name?: string;
}

const AVATAR_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
];

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { className, size = 40, src, fallbackSrc, name = "", style, ...props },
    ref
  ) => {
    const [imgError, setImgError] = React.useState(false);
    const [fallbackError, setFallbackError] = React.useState(false);

    const showMainImage = src && !imgError;
    const showFallbackImage = !showMainImage && fallbackSrc && !fallbackError;
    const showInitial = !showMainImage && !showFallbackImage;
    const bgColor = getColorFromName(name);

    const sizeStyle = {
      width: size,
      height: size,
      fontSize: size * 0.5,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0",
          showInitial && bgColor,
          className
        )}
        style={sizeStyle}
        {...props}
      >
        {showMainImage ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : showFallbackImage ? (
          <img
            src={fallbackSrc}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setFallbackError(true)}
          />
        ) : (
          <span className="font-medium text-white select-none">
            {getInitial(name)}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
