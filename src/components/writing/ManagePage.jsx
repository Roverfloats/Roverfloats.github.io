import { useEffect, useMemo, useState } from "react";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../firebase";

import { FetchData } from "../../endpoints/General";
import { AddPage, UpdatePage } from "../../endpoints/Pages";

import PageNav from "./PageNav";
import DeletePagePopup from "../popups/DeletePagePopup";

function ManagePage({ storyId, reload, setReload, setPopup, setPopupContent }) {
    const [pageData, setPageData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState("");

    const highestPageNum = useMemo(() => {
        if (!pageData.length) return null;
        return Math.max(...pageData.map(p => p.number));
    }, [pageData]);

    const currentPageData = useMemo(
        () => pageData.find(p => p.number === currentPage),
        [pageData, currentPage]
    );

    useEffect(() => {
        if (!storyId) return;

        const fetchPages = async () => {
            const q = query(
                collection(db, "Pages"),
                where("storyId", "==", storyId)
            );

            const data = await FetchData(q);
            setPageData(data);
        };

        fetchPages();
    }, [storyId, reload]);

    useEffect(() => {
        const updateContent = async () => {
            setContent(currentPageData?.content || "");
        }
        updateContent()
    }, [currentPageData]);

    async function handleAddPage() {
        await AddPage(storyId);
        setReload(prev => !prev);

        if (pageData.length) {
            setCurrentPage(prev => prev + 1);
        }
    }

    async function handleUpdatePage() {
        if (!currentPageData) return;

        await UpdatePage(currentPageData.id, content);
        setEditing(false);
        setReload(prev => !prev);
    }

    return (
        <div className="mt-[20px]">
            <div className="w-full rounded-[15px] border-2 border-[#D0D0D0] dark:border-black text-black dark:text-white px-[20px]">
                {editing ? (
                    <textarea
                        placeholder="Description..."
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="w-full my-[20px] min-h-[100px] h-[500px] border-2 rounded-[15px] p-[10px] border-[#D0D0D0] dark:border-black bg-[#F4F4F4] dark:bg-[#292929]"
                    />
                ) : !pageData.length ? (
                    <div className="w-full flex justify-center py-[20px]">
                        <p>No Pages Found.</p>
                    </div>
                ) : (
                    <>
                        <PageNav
                            pageData={pageData}
                            highestPageNum={highestPageNum}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                        {content}
                        <PageNav
                            pageData={pageData}
                            highestPageNum={highestPageNum}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                )}
            </div>

            <div className="flex w-full flex-col items-center mt-[20px]">
                {pageData.length > 0 && (
                    !editing ? (
                        <button
                            className="w-[150px] h-[40px] rounded-[15px] text-white bg-[#0096FF] dark:bg-[#0065AD] mb-[20px]"
                            onClick={() => setEditing(true)}
                        >Edit Page
                        </button>
                    ) : (
                        <button
                            className="w-[150px] h-[40px] rounded-[15px] text-white bg-[#0096FF] dark:bg-[#0065AD] mb-[20px]"
                            onClick={handleUpdatePage}
                        >Save
                        </button>
                    )
                )}

                {(currentPage >= highestPageNum || !pageData.length) && !editing && (
                    <div className="flex md:w-[400px] md:flex-row flex-col justify-evenly">
                        <button
                            className="w-[150px] h-[40px] rounded-[15px] text-white bg-[#0096FF] dark:bg-[#0065AD]"
                            onClick={handleAddPage}
                        >New Page
                        </button>

                        {!!pageData.length && (
                            <button
                                className="w-[150px] h-[40px] border-2 rounded-[15px] border-[#D0D0D0] dark:border-black bg-white dark:bg-[#171717] text-black dark:text-white md:mt-0 mt-[20px]"
                                onClick={() => {
                                    setPopupContent(
                                        <DeletePagePopup
                                            setReload={setReload}
                                            setPopup={setPopup}
                                            pageId={currentPageData.id}
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                        />
                                    );
                                    setPopup(true);
                                }}
                            >Delete Page
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManagePage;
