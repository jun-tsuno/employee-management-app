import { useMemo } from 'react';

const range = (start, end) => {
	let length = end - start + 1;
	return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({ totalCount, pageSize, siblingCount, currentPage }) => {
	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize);

		// sibling + first + last + current + dots * 2
		const totalPageNumbers = siblingCount + 5;

		// Case:1 [1,2,3,4]
		if (totalPageCount <= totalPageNumbers) {
			return range(1, totalPageCount);
		}

		// siblings are within range 1 ~ totalPageCount?
		const leftSiblingIdx = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIdx = Math.min(
			currentPage + siblingCount,
			totalPageCount
		);

		const showLeftDots = leftSiblingIdx > 2;
		const showRightDots = rightSiblingIdx < totalPageCount - 2;

		const firstPageIdx = 1;
		const lastPageIdx = totalCount;

		// Case:2 [1,2,3,4,5 ... 100]
		if (!showLeftDots && showRightDots) {
			let leftItemCount = 3 + 2 * siblingCount;
			let leftRange = range(1, leftItemCount);

			return [...leftRange, 'DOTS', totalPageCount];
		}

		// Case:3 [1 ... 96, 97, 98, 99, 100]
		if (showLeftDots && !showRightDots) {
			let rightItemCount = 3 + 2 * siblingCount;
			let rightRange = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount
			);

			return [firstPageIdx, 'DOTS', ...rightRange];
		}

		// Case:4 [1 ... 49, 50, 51 ... 100]
		if (showLeftDots && showRightDots) {
			let middleRange = range(leftSiblingIdx, rightSiblingIdx);

			return [firstPageIdx, 'DOTS', ...middleRange, 'DOTS', lastPageIdx];
		}
	}, [totalCount, pageSize, siblingCount, currentPage]);

	return paginationRange;
};

export default usePagination;
