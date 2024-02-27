'use client';
import { ChevronIcon } from '@public/svgs';
import { DEFAULT_PAGE_SIZE } from '@/util/constants';
import usePagination from '@/hooks/use-pagination';

const CustomPagination = ({
	totalCount,
	pageSize = DEFAULT_PAGE_SIZE,
	siblingCount = 0,
	currentPage,
	onPageChange,
	className,
}) => {
	const paginationRange = usePagination({
		totalCount,
		pageSize,
		siblingCount,
		currentPage,
	});
	let lastPage = paginationRange[paginationRange.length - 1];

	if (currentPage === 0 || !paginationRange || paginationRange?.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};
	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	return (
		<>
			<div
				className={`flex border-[1px] shadow-sm rounded-sm w-fit mx-auto bg-white items-center justify-center ${
					className ? className : ''
				}`}
			>
				<button
					onClick={onPrevious}
					disabled={currentPage === 1}
					className={`flex items-center w-10 h-8 justify-center hover:bg-text-secondary hover:text-white ${
						currentPage === 1 ? 'text-[#B9C1D0]' : ''
					}`}
				>
					<ChevronIcon className='w-[40%]' />
				</button>

				<ul className='flex items-center'>
					{paginationRange.map((pageNumber) => {
						if (pageNumber === 'DOTS') {
							return (
								<li
									key={Math.random()}
									className='flex items-center text-[#132440]'
								>
									&#8230;
								</li>
							);
						}
						return (
							<li
								key={Math.random()}
								className={`flex h-8 w-10 items-center border-r-[1px] justify-center hover:cursor-pointer ${
									currentPage === pageNumber
										? 'bg-primary text-text-placeholder'
										: 'text-text-gray hover:bg-text-secondary hover:text-text-placeholder'
								}`}
								onClick={() => onPageChange(pageNumber)}
							>
								{pageNumber}
							</li>
						);
					})}
				</ul>

				<button
					onClick={() => onNext()}
					disabled={currentPage === lastPage}
					className={`flex items-center w-10 h-8 justify-center hover:bg-text-secondary hover:text-white ${
						currentPage === lastPage ? 'text-[#B9C1D0]' : ''
					}`}
				>
					<ChevronIcon className='w-[40%] rotate-180' />
				</button>
			</div>
		</>
	);
};

export default CustomPagination;

// const CustomPagination = ({
// 	pageSize = 15,
// 	totalCount,
// 	setCurrentPage,
// 	className,
// }) => {
// 	const pageCount = Math.ceil(totalCount / pageSize) || 0;

// 	const handlePageClick = (event) => {
// 		const nextPage = event.selected + 1;
// 		setCurrentPage(nextPage);
// 	};

// 	return (
// 		<div className={`w-fit mx-auto ${className ? className : ''}`}>
// 			<ReactPaginate
// 				breakLabel='...'
// 				nextLabel='>'
// 				pageRangeDisplayed={2}
// 				marginPagesDisplayed={2}
// 				onPageChange={handlePageClick}
// 				pageCount={pageCount}
// 				previousLabel='<'
// 				renderOnZeroPageCount={null}
// 				containerClassName='pagination-container'
// 				pageClassName='pagination-item'
// 				pageLinkClassName='pagination-item-link'
// 				nextClassName='pagination-next'
// 				nextLinkClassName='pagination-next-link'
// 				previousClassName='pagination-prev'
// 				previousLinkClassName='pagination-prev-link'
// 				activeClassName='pagination-active'
// 				breakLinkClassName='pagination-break-link'
// 			/>
// 		</div>
// 	);
// };

// export default CustomPagination;
