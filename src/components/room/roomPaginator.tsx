import React, {useEffect, useMemo, useState} from 'react'
import {Room} from "../types";
import {
    Pagination,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from '../ui/pagination';
import {PaginationContent} from "../ui/pagination.tsx";
import {PagingButton} from "../ui/button.tsx";

type Props = {
    currentPage: number,
    totalPages: number,
    onPaging: (page: number) => void
}

const RoomPaginator: React.FC<Props> = (props: Props) => {
    const isCurrentLastPage = props.totalPages === props.currentPage;
    const isNextLastPage = props.currentPage + 1 >= props.totalPages;
    const isPrevFirstPage = props.currentPage - 1 <= 1;
    const isCurrentFirstPage = props.currentPage === 1;
  return (
      <Pagination>
          <PaginationContent>
              <PaginationItem>
                  <PaginationPrevious className={isCurrentFirstPage ? "cursor-not-allowed pointer-events-none text-gray-400" : ""} onClick={(e) => isCurrentFirstPage ? e.preventDefault() : props.onPaging(props.currentPage - 1)} />
              </PaginationItem>
              <PaginationItem>
                  {!isPrevFirstPage && <PaginationEllipsis/>}
              </PaginationItem>
              {!isCurrentFirstPage && (
                  <PaginationItem>
                    <PagingButton pageNumber={props.currentPage - 1} variant={"destructive"} onPaging={props.onPaging}/>
                  </PaginationItem>
              )}
              <PaginationItem>
                  <PagingButton className={"bg-gray-400"} pageNumber={props.currentPage} variant={"default"} onPaging={props.onPaging}/>
              </PaginationItem>
              {props.currentPage + 1 <= props.totalPages && (
                  <PaginationItem>
                      <PagingButton className={""} pageNumber={props.currentPage + 1} variant={"destructive"} onPaging={props.onPaging}/>
                  </PaginationItem>
              )}
              <PaginationItem>
                  {!isNextLastPage && <PaginationEllipsis/>}
              </PaginationItem>
              <PaginationItem>
                  <PaginationNext className={isCurrentLastPage ? "cursor-not-allowed pointer-events-none text-gray-400" : ""} onClick={(e) => isCurrentLastPage ? e.preventDefault() : props.onPaging(props.currentPage + 1)}  />
              </PaginationItem>
          </PaginationContent>
      </Pagination>
  )
}

export default RoomPaginator