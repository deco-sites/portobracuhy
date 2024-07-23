import { useMemo } from "preact/hooks";

export const DOTS = "...";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  leftSiblingCount = 2,
  rightSiblingCount = 1,
  currentPage,
}: {
  totalCount: number;
  pageSize: number;
  leftSiblingCount?: number;
  rightSiblingCount?: number;
  currentPage: number;
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = leftSiblingCount + rightSiblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      console.log("caiu aqui 0");
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - leftSiblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + rightSiblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, leftSiblingIndex + rightSiblingCount + 2);

      if (leftRange.length > 4) {
        const middleRange = range(2, leftSiblingIndex + rightSiblingCount + 2);
        return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      }

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(
        totalPageCount - (rightSiblingIndex - leftSiblingIndex) - 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return range(1, totalPageCount);
  }, [totalCount, pageSize, leftSiblingCount, rightSiblingCount, currentPage]);

  return paginationRange;
};
