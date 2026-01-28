function PageNav({pageData, highestPageNum, currentPage, setCurrentPage}) {
    return (
        <div className="flex w-full justify-between h-auto items-center">
            {
                currentPage <= 1 ?
                <div className="h-[40px] w-[40px]"></div>:
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="h-[40px] w-[40px]"
                >{"<"}</button>
            }
            {
                highestPageNum == 1 ?
                "1":
                currentPage == 1 ?
                "1 .>. " + highestPageNum:
                currentPage == highestPageNum ?
                "1 .<. " + highestPageNum:
                "1 .. " + currentPage + " .. " + highestPageNum
            }
            {
                currentPage >= highestPageNum ?
                <div className="h-[40px] w-[40px]"></div>:
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="h-[40px] w-[40px]"
                >{">"}</button>
            }

        </div>
    )
}

export default PageNav