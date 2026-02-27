import * as React from "react";

export interface UseCarouselOptions {
  /** 자동 재생 여부 */
  autoPlay?: boolean;
  /** 자동 재생 간격 (ms) */
  interval?: number;
  /** 무한 루프 여부 */
  loop?: boolean;
  /** 드래그 활성화 여부 */
  draggable?: boolean;
  /** 슬라이드 간 간격 (px) */
  gap?: number;
}

export interface UseCarouselReturn {
  /** 현재 슬라이드 인덱스 */
  currentIndex: number;
  /** 전체 슬라이드 수 */
  totalSlides: number;
  /** 전체 슬라이드 수 설정 */
  setTotalSlides: (count: number) => void;
  /** 특정 인덱스로 이동 */
  goTo: (index: number) => void;
  /** 다음 슬라이드로 이동 */
  goNext: () => void;
  /** 이전 슬라이드로 이동 */
  goPrev: () => void;
  /** 드래그 중인지 여부 */
  isDragging: boolean;
  /** 현재 드래그 오프셋 (px) */
  dragOffset: number;
  /** 드래그 시작 (clientX 좌표) */
  handleDragStart: (clientX: number) => void;
  /** 드래그 이동 (clientX 좌표) */
  handleDragMove: (clientX: number) => void;
  /** 드래그 종료 */
  handleDragEnd: () => void;
  /** 컨테이너 너비 설정 */
  setContainerWidth: (width: number) => void;
  /** 슬라이드 간 간격 */
  gap: number;
}

export function useCarousel({
  autoPlay = false,
  interval = 3000,
  loop = true,
  draggable = true,
  gap = 16,
}: UseCarouselOptions = {}): UseCarouselReturn {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [totalSlides, setTotalSlides] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState(0);
  const dragStartX = React.useRef(0);
  const containerWidthRef = React.useRef(0);
  const autoPlayRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const setContainerWidth = React.useCallback((width: number) => {
    containerWidthRef.current = width;
  }, []);

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

  return {
    currentIndex,
    totalSlides,
    setTotalSlides,
    goTo,
    goNext,
    goPrev,
    isDragging,
    dragOffset,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    setContainerWidth,
    gap,
  };
}
