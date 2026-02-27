import * as React from "react";
import { cn } from "../../utils";
import { useCarousel } from "theo-kit-core";
import type { UseCarouselReturn } from "theo-kit-core";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
  showArrows?: boolean;
  showIndicators?: boolean;
  draggable?: boolean;
  gap?: number;
}

const CarouselContext = React.createContext<UseCarouselReturn | null>(null);

export const useCarouselContext = () => {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("Carousel components must be used within a Carousel");
  }
  return context;
};

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      children,
      autoPlay = false,
      interval = 3000,
      loop = true,
      showArrows = true,
      showIndicators = true,
      draggable = true,
      gap = 16,
      ...props
    },
    ref
  ) => {
    const carousel = useCarousel({ autoPlay, interval, loop, draggable, gap });
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (node) {
          carousel.setContainerWidth(node.offsetWidth);
        }
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref, carousel]
    );

    return (
      <CarouselContext.Provider value={carousel}>
        <div
          ref={setRefs}
          className={cn("relative w-full overflow-hidden", className)}
          {...props}
        >
          <CarouselContent onSlidesChange={carousel.setTotalSlides}>
            {children}
          </CarouselContent>

          {showArrows && carousel.totalSlides > 1 && (
            <>
              <CarouselPrevButton />
              <CarouselNextButton />
            </>
          )}

          {showIndicators && carousel.totalSlides > 1 && <CarouselIndicators />}
        </div>
      </CarouselContext.Provider>
    );
  }
);

Carousel.displayName = "Carousel";

interface CarouselContentProps {
  children: React.ReactNode;
  onSlidesChange: (count: number) => void;
}

const CarouselContent: React.FC<CarouselContentProps> = ({
  children,
  onSlidesChange,
}) => {
  const {
    currentIndex,
    isDragging,
    dragOffset,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    gap,
  } = useCarouselContext();
  const slides = React.Children.toArray(children);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    onSlidesChange(slides.length);
  }, [slides.length, onSlidesChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const gapOffset = currentIndex * gap;

  return (
    <div
      ref={contentRef}
      className={cn(
        "flex",
        isDragging && "cursor-grabbing",
        !isDragging && "cursor-grab"
      )}
      style={{
        gap: `${gap}px`,
        transform: `translateX(calc(-${currentIndex * 100}% - ${gapOffset}px + ${dragOffset}px))`,
        transition: isDragging
          ? "none"
          : "transform 500ms cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((child, index) => (
        <div key={index} className="w-full shrink-0 select-none">
          {child}
        </div>
      ))}
    </div>
  );
};

export type CarouselSlideProps = React.HTMLAttributes<HTMLDivElement>;

const CarouselSlide = React.forwardRef<HTMLDivElement, CarouselSlideProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {children}
      </div>
    );
  }
);

CarouselSlide.displayName = "CarouselSlide";

const CarouselPrevButton: React.FC = () => {
  const { goPrev } = useCarouselContext();

  return (
    <button
      type="button"
      onClick={goPrev}
      className={cn(
        "absolute left-2 top-1/2 -translate-y-1/2",
        "flex h-8 w-8 items-center justify-center rounded-full",
        "bg-white/80 text-gray-800 shadow-md",
        "hover:bg-white transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      )}
      aria-label="Previous slide"
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
  );
};

const CarouselNextButton: React.FC = () => {
  const { goNext } = useCarouselContext();

  return (
    <button
      type="button"
      onClick={goNext}
      className={cn(
        "absolute right-2 top-1/2 -translate-y-1/2",
        "flex h-8 w-8 items-center justify-center rounded-full",
        "bg-white/80 text-gray-800 shadow-md",
        "hover:bg-white transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      )}
      aria-label="Next slide"
    >
      <ChevronRight className="h-5 w-5" />
    </button>
  );
};

const CarouselIndicators: React.FC = () => {
  const { currentIndex, totalSlides, goTo } = useCarouselContext();

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => goTo(index)}
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            index === currentIndex
              ? "bg-white"
              : "bg-white/50 hover:bg-white/75",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export { Carousel, CarouselSlide };
