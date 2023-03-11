import Article from "@/model/article.model";
import { PageWrapper } from "@/model/pageWrapper.model";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ArticleCard from "./ArticleCard";
import { GrNext, GrPrevious } from "react-icons/gr";
import { debounce } from "lodash";

const DEBOUNCE_TIME = 300;

const fetchArticlesPage = async (
  page: number,
  sort: string,
  searchKey: string
) => {
  const res = await fetch(
    `/api/article?page=${page}&sort=${sort}&searchKey=${searchKey}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  return data;
};

export default function ArticleList({
  pageData,
  setPage,
}: {
  pageData: PageWrapper<Article>;
  setPage: CallableFunction;
}) {
  const [currPage, setCurrPage] = useState<number>(pageData.page);
  const [sort, setSort] = useState<string>("new");
  const [searchKey, setSearchKey] = useState<string>("");
  const router = useRouter();

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchArticlesPage(currPage, sort, searchKey).then((res) => {
      setPage(res);
    });
    return () => debouncedSearch.cancel();
  }, [currPage, sort, searchKey]);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    router.push({
      query: {
        searchKey: searchKey,
        sort: e.target.value,
        page: currPage,
      },
    });
  };

  const handlePageChange = (page: number) => {
    if (page > pageData.totalPages) return;
    if (page < 1) return;
    setCurrPage(page);
    router.push({
      query: {
        searchKey: searchKey,
        sort: sort,
        page: page,
      },
    });
  };

  const hanldeSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = searchRef.current?.value;
    if (!searchValue) return;
    setSearchKey(searchValue!);
    router.push({
      query: {
        searchKey: searchValue,
        sort: sort,
        page: currPage,
      },
    });
  };

  const debouncedSearch = useMemo(() => {
    return debounce(hanldeSearchChange, DEBOUNCE_TIME);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-2 mt-2 self-end mr-4">
        <input
          ref={searchRef}
          className="p-2 border rounded-sm"
          type="text"
          name="search"
          id="search"
          placeholder="Search by title"
          onChange={debouncedSearch}
        />
        <select value={sort} onChange={handleSortChange} id="sort" name="sort">
          <option value={"new"}>Newest</option>
          <option value={"old"}>Oldest</option>
          <option value={"group"}>Group by source</option>
        </select>
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 p-2 w-full">
        {pageData &&
          pageData.data.length > 0 &&
          pageData.data.map((article, index) => {
            return <ArticleCard key={index} article={article} />;
          })}
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <span>displaying page</span>
        <GrPrevious size={30} onClick={() => handlePageChange(currPage - 1)} />
        <input
          onChange={(e) => handlePageChange(Number(e.target.value))}
          value={currPage}
          type="number"
          max={pageData.totalPages}
          min={1}
          name="page"
          id="page"
          className="p-2 border rounded-md"
        />
        <span>of {pageData.totalPages}</span>
        <span>
          <GrNext size={30} onClick={() => handlePageChange(currPage + 1)} />
        </span>
      </div>
    </div>
  );
}
