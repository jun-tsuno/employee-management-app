'use client';
import ReactPaginate from 'react-paginate';

const CustomPagination = ({
	pageSize = 15,
	totalCount,
	setCurrentPage,
	className,
}) => {
	const pageCount = totalCount ? Math.ceil(totalCount / pageSize) : 0;

	const handlePageClick = (event) => {
		const nextPage = event.selected + 1;
		setCurrentPage(nextPage);
	};

	return (
		<div className={`w-fit mx-auto ${className ? className : ''}`}>
			<ReactPaginate
				breakLabel='...'
				nextLabel='>'
				pageRangeDisplayed={2}
				marginPagesDisplayed={2}
				onPageChange={handlePageClick}
				pageCount={pageCount}
				previousLabel='<'
				renderOnZeroPageCount={null}
				containerClassName='pagination-container'
				pageClassName='pagination-item'
				pageLinkClassName='pagination-item-link'
				nextClassName='pagination-next'
				nextLinkClassName='pagination-next-link'
				previousClassName='pagination-prev'
				previousLinkClassName='pagination-prev-link'
				activeClassName='pagination-active'
				breakLinkClassName='pagination-break-link'
			/>
		</div>
	);
};

export default CustomPagination;
