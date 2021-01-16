import React, {memo} from 'react'
import {Pagination} from 'react-bootstrap';

const PaginationList = ({data, currentPage, pageChangeHandle, searchPage}) => {
    const getPageInfo = (currentPage, totalNumber) => {
        const totalPage = Math.min(Math.ceil(totalNumber/10), 100)
        const hasNext = currentPage < totalPage
        const hasPrev = currentPage > 1
        return {totalPage, hasNext, hasPrev}
    }
    const {totalPage, hasNext, hasPrev} = getPageInfo(currentPage, data?.length || 0)
    const currentPageChange = num => {
        pageChangeHandle(num)
    }

    const getPaginationItem = (currentPage,totalPage) => {
        if (searchPage) {
            return <Pagination.Item active={true}>{currentPage}</Pagination.Item>
        }
        let items = [];
        for (let number = 1; number <= totalPage; number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => currentPageChange(number)}>
                  {number}
                </Pagination.Item>,
              );
        }
        return items
    }

    return (
        <Pagination className='news-list-container-pagination'>
            {!searchPage && <Pagination.First onClick={() => currentPageChange(1)}/>}
            {(hasPrev || (searchPage && currentPage !== 1)) && <Pagination.Prev onClick={() => currentPageChange(currentPage - 1)}/>}
            {getPaginationItem(currentPage,totalPage)}
            {(hasNext || searchPage) && <Pagination.Next  onClick={() => currentPageChange(currentPage + 1)}/>}
            {!searchPage && <Pagination.Last onClick={() => currentPageChange(totalPage)}/>}
        </Pagination>
    )
}
export default memo(PaginationList)