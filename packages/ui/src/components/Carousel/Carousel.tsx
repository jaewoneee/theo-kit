import * as React from "react";
import { cn } from "../../utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 자동 재생 여부
   * @default false
   */
  autoPlay?: boolean;
  /**
   * 자동 재생 간격 (ms)
   * @default 3000
   */
  interval?: number;
  /**
   * 무한 루프 여부
   * @default true
   */
  loop?: boolean;
  /**
   * 네비게이션 화살표 표시 여부
   * @default true
   */
  showArrows?: boolean;
  /**
   * 인디케이터(dots) 표시 여부
   * @default true
   */
  showIndicators?: boolean;
  /**
   * 드래그로 슬라이드 넘기기 활성화 여부
   * @default true
   */
  draggable?: boolean;
  /**
   * 슬라이드 간 간격 (px)
   * @default 16
   */
  gap?: number;
}

interface CarouselContextValue {
  currentIndex: number;
  totalSlides: number;
  goTo: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  isDragging: boolean;
  dragOffset: number;
  handleDragStart: (clientX: number) => void;
  handleDragMove: (clientX: number) => void;
  handleDragEnd: () => void;
  gap: number;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

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
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [totalSlides, setTotalSlides] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragOffset, setDragOffset] = React.useState(0);
    const dragStartX = React.useRef(0);
    const containerWidthRef = React.useRef(0);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const autoPlayRef = React.useRef<ReturnType<typeof setInterval> | null>(
      null
    );

    const goTo = React.useCallback(
      (index: number) => {
        if (loop) {
          setCurrentIndex(((index % totalSlides) + totalSlides) % totalSlides);
        } else {
          setCurrentIndex(Math.max(0, Math.min(index, totalSlides - 1)));
        }
      },
      [loop, totalSlides]
    );

    const goNext = React.useCallback(() => {
      if (!loop && currentIndex >= totalSlides - 1) return;
      goTo(currentIndex + 1);
    }, [currentIndex, goTo, loop, totalSlides]);

    const goPrev = React.useCallback(() => {
      if (!loop && currentIndex <= 0) return;
      goTo(currentIndex - 1);
    }, [currentIndex, goTo, loop]);

    const handleDragStart = React.useCallback(
      (clientX: number) => {
        if (!draggable) return;
        setIsDragging(true);
        dragStartX.current = clientX;
        if (containerRef.current) {
          containerWidthRef.current = containerRef.current.offsetWidth;
        }
      },
      [draggable]
    );

    const handleDragMove = React.useCallback(
      (clientX: number) => {
        if (!isDragging || !draggable) return;
        const diff = clientX - dragStartX.current;
        setDragOffset(diff);
      },
      [isDragging, draggable]
    );

    const handleDragEnd = React.useCallback(() => {
      if (!isDragging || !draggable) return;
      setIsDragging(false);

      const threshold = containerWidthRef.current * 0.2;

      if (dragOffset > threshold) {
        goPrev();
      } else if (dragOffset < -threshold) {
        goNext();
      }

      setDragOffset(0);
    }, [isDragging, draggable, dragOffset, goNext, goPrev]);

    React.useEffect(() => {
      if (autoPlay && totalSlides > 1 && !isDragging) {
        autoPlayRef.current = setInterval(goNext, interval);
        return () => {
          if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
          }
        };
      }
    }, [autoPlay, interval, goNext, totalSlides, isDragging]);

    const contextValue = React.useMemo(
      () => ({
        currentIndex,
        totalSlides,
        goTo,
        goNext,
        goPrev,
        isDragging,
        dragOffset,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
        gap,
      }),
      [
        currentIndex,
        totalSlides,
        goTo,
        goNext,
        goPrev,
        isDragging,
        dragOffset,
        handleDragStart,
        handleDragMove,
        handleDragEnd,
        gap,
      ]
    );

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    return (
      <CarouselContext.Provider value={contextValue}>
        <div
          ref={setRefs}
          className={cn("relative w-full overflow-hidden", className)}
          {...props}
        >
          <CarouselContent onSlidesChange={setTotalSlides}>
            {children}
          </CarouselContent>

          {showArrows && totalSlides > 1 && (
            <>
              <CarouselPrevButton />
              <CarouselNextButton />
            </>
          )}

          {showIndicators && totalSlides > 1 && <CarouselIndicators />}
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
