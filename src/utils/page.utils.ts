import { Paging } from "../model/page.model"

export function buildPaging(
    page: number,
    size: number,
    totalData: number,
): Paging {
    const totalPage = Math.ceil(totalData / size)
    return {
        currentPage: page,
        totalPage: totalPage,
        totalElement: totalData,
        size: size,
        nextPage: page < totalPage,
        previousPage: page > 1,
        firstPage: page === 1,
        lastPage: page === totalPage,
    }
}