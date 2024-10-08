// "use client";

// import { useState } from "react";
// import { Input, Button, Select, SelectItem, Divider } from "@nextui-org/react";
// import { Search, X } from "lucide-react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import ArticleCard from "./components/articleCard";
// import { useGetAllArticlesQuery } from "@/src/redux/features/articles/articlesApi";
// import ErrorNewsfeed from "./components/errorNewsfeed";
// import LoaderNewsfeed from "./components/loaderNewsfeed";
// import { TArticle } from "@/src/types";

// const Page = () => {
//   const {
//     data: allArticles,
//     error,
//     isLoading,
//   } = useGetAllArticlesQuery(undefined);

//   const [filters, setFilters] = useState({
//     category: "",
//     isPremium: "",
//     searchQuery: "",
//   });

//   const [sortOrder, setSortOrder] = useState<string>("");
//   const [votingOrder, setVotingOrder] = useState<string>("");
//   const [page, setPage] = useState(1);

//   const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       searchQuery: e.target.value,
//     }));
//   };

//   const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSortOrder(e.target.value);
//   };

//   const handleVotingFilterChange = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setVotingOrder(e.target.value);
//   };

//   const clearFilters = () => {
//     setFilters({
//       category: "",
//       isPremium: "",
//       searchQuery: "",
//     });
//     setSortOrder("");
//     setVotingOrder("");
//   };

//   // Infinite Scroll Load More
//   const loadMore = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   if (isLoading) {
//     return <LoaderNewsfeed />;
//   }

//   if (error) {
//     return <ErrorNewsfeed />;
//   }

//   const articles: TArticle[] = allArticles?.data || [];

//   // Filter and sort articles
//   const filteredArticles = articles
//     .filter(
//       (article) =>
//         !filters.searchQuery ||
//         article.title
//           .toLowerCase()
//           .includes(filters.searchQuery.toLowerCase()) ||
//         article.content
//           .toLowerCase()
//           .includes(filters.searchQuery.toLowerCase())
//     )
//     .filter(
//       (article) =>
//         !filters.category ||
//         filters.category === "All" ||
//         article.category === filters.category
//     )
//     .filter(
//       (article) =>
//         !filters.isPremium ||
//         filters.isPremium === "All" ||
//         (filters.isPremium === "Free" && article.isPremium === false) ||
//         (filters.isPremium === "Premium" && article.isPremium === true)
//     )
//     .sort((a, b) =>
//       sortOrder === "newest"
//         ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
//         : sortOrder === "oldest"
//           ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
//           : 0
//     )
//     .sort((a, b) =>
//       votingOrder === "upvotes"
//         ? b.upvotes - a.upvotes
//         : votingOrder === "downvotes"
//           ? b.downvotes - a.downvotes
//           : 0
//     );

//   return (
//     <div className="p-3 bg-white rounded-lg shadow-md">
//       {/* Search and Reset Section */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="font-semibold text-2xl text-customBlue">Articles</h1>
//         <div className="flex space-x-2">
//           <Input
//             value={filters.searchQuery}
//             placeholder="Search articles"
//             size="sm"
//             startContent={<Search size={14} />}
//             onChange={handleSearchChange}
//             className="max-w-xs"
//           />
//           <Button
//             size="sm"
//             variant="light"
//             onClick={clearFilters}
//             startContent={<X size={16} />}
//           >
//             Reset
//           </Button>
//         </div>
//       </div>

//       {/* Filters Section */}
//       <div className="lg:grid lg:grid-cols-4 gap-2 flex flex-wrap lg:justify-evenly items-center mb-4">
//         <Select
//           name="category"
//           placeholder="Category"
//           size="sm"
//           value={filters.category}
//           onChange={handleInputChange}
//           className="max-w-full"
//         >
//           <SelectItem key="All" value="All">
//             All
//           </SelectItem>
//           <SelectItem key="Tip" value="Tip">
//             Tip
//           </SelectItem>
//           <SelectItem key="Story" value="Story">
//             Story
//           </SelectItem>
//         </Select>

//         <Select
//           name="isPremium"
//           placeholder="Type"
//           size="sm"
//           value={filters.isPremium}
//           onChange={handleInputChange}
//           className="max-w-full"
//         >
//           <SelectItem key="All" value="All">
//             All
//           </SelectItem>
//           <SelectItem key="Free" value="Free">
//             Free
//           </SelectItem>
//           <SelectItem key="Premium" value="Premium">
//             Premium
//           </SelectItem>
//         </Select>

//         <Select
//           placeholder="Sort by Date"
//           size="sm"
//           value={sortOrder}
//           onChange={handleSortChange}
//           className="max-w-full"
//         >
//           <SelectItem key="newest" value="newest">
//             Newest
//           </SelectItem>
//           <SelectItem key="oldest" value="oldest">
//             Oldest
//           </SelectItem>
//         </Select>

//         <Select
//           placeholder="Sort by Voting"
//           size="sm"
//           value={votingOrder}
//           onChange={handleVotingFilterChange}
//           className="max-w-full"
//         >
//           <SelectItem key="upvotes" value="upvotes">
//             Upvotes
//           </SelectItem>
//           <SelectItem key="downvotes" value="downvotes">
//             Downvotes
//           </SelectItem>
//         </Select>
//       </div>

//       <Divider className="my-4" />

//       {filteredArticles.length > 0 ? (
//         <InfiniteScroll
//           dataLength={filteredArticles.length}
//           // dataLength={page * 2}
//           next={loadMore}
//           // hasMore={true}
//           hasMore={page * 1 < filteredArticles.length}
//           loader={<LoaderNewsfeed />}
//           endMessage={
//             <p className="text-center text-gray-500 my-4">
//               No more articles to load.
//             </p>
//           }
//         >
//           <div className="p-2 flex flex-col gap-4">
//             {filteredArticles.slice(0, page * 10).map(
//               (
//                 article // Show 10 articles per page
//               ) => (
//                 <ArticleCard key={article._id} article={article} />
//               )
//             )}
//           </div>
//         </InfiniteScroll>
//       ) : (
//         <p className="text-center text-gray-500">
//           No articles found with the selected filters.
//         </p>
//       )}
//     </div>
//   );
// };

// export default Page;

"use client";

import { useState, useEffect } from "react";
import { Input, Button, Select, SelectItem, Divider } from "@nextui-org/react";
import { Search, X } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";

import ArticleCard from "./components/articleCard";
import ErrorNewsfeed from "./components/errorNewsfeed";
import LoaderNewsfeed from "./components/loaderNewsfeed";

import { useGetAllArticlesQuery } from "@/src/redux/features/articles/articlesApi";
import { TArticle } from "@/src/types";
import NoArticlesFound from "@/src/components/shared/noArticleFound";

const Page = () => {
  const [articles, setArticles] = useState<TArticle[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    isPremium: "",
    searchQuery: "",
  });
  const [sortOrder, setSortOrder] = useState<string>("");
  const [votingOrder, setVotingOrder] = useState<string>("");
  const [page, setPage] = useState(1);

  const {
    data: fetchedArticles,
    error,
    isLoading,
    refetch,
  } = useGetAllArticlesQuery(undefined);

  // Polling effect: Refetch data every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetch]);

  // Update state when articles are fetched
  useEffect(() => {
    if (fetchedArticles?.data) {
      setArticles(fetchedArticles.data);
    }
  }, [fetchedArticles]);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchQuery: e.target.value,
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleVotingFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setVotingOrder(e.target.value);
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      isPremium: "",
      searchQuery: "",
    });
    setSortOrder("");
    setVotingOrder("");
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading) {
    return <LoaderNewsfeed />;
  }

  if (error) {
    return <ErrorNewsfeed />;
  }

  // Filter and sort articles
  const filteredArticles = articles
    .filter(
      (article) =>
        !filters.searchQuery ||
        article.title
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        article.content
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())
    )
    .filter(
      (article) =>
        !filters.category ||
        filters.category === "All" ||
        article.category === filters.category
    )
    .filter(
      (article) =>
        !filters.isPremium ||
        filters.isPremium === "All" ||
        (filters.isPremium === "Free" && article.isPremium === false) ||
        (filters.isPremium === "Premium" && article.isPremium === true)
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        : sortOrder === "oldest"
          ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          : 0
    )
    .sort((a, b) =>
      votingOrder === "upvotes"
        ? b.upvotes - a.upvotes
        : votingOrder === "downvotes"
          ? b.downvotes - a.downvotes
          : 0
    );

  return (
    <div className="p-3 bg-white rounded-lg shadow-md">
      {/* Search and Reset Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold text-2xl text-customBlue">Articles</h1>
        <div className="flex space-x-2">
          <Input
            className="max-w-xs"
            placeholder="Search articles"
            size="sm"
            startContent={<Search size={14} />}
            value={filters.searchQuery}
            onChange={handleSearchChange}
          />
          <Button
            size="sm"
            startContent={<X size={16} />}
            variant="light"
            onClick={clearFilters}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="lg:grid lg:grid-cols-4 gap-2 flex flex-wrap lg:justify-evenly items-center mb-4">
        <Select
          className="max-w-full"
          name="category"
          placeholder="Category"
          size="sm"
          value={filters.category}
          onChange={handleInputChange}
        >
          <SelectItem key="All" value="All">
            All
          </SelectItem>
          <SelectItem key="Tip" value="Tip">
            Tip
          </SelectItem>
          <SelectItem key="Story" value="Story">
            Story
          </SelectItem>
        </Select>

        <Select
          className="max-w-full"
          name="isPremium"
          placeholder="Type"
          size="sm"
          value={filters.isPremium}
          onChange={handleInputChange}
        >
          <SelectItem key="All" value="All">
            All
          </SelectItem>
          <SelectItem key="Free" value="Free">
            Free
          </SelectItem>
          <SelectItem key="Premium" value="Premium">
            Premium
          </SelectItem>
        </Select>

        <Select
          className="max-w-full"
          placeholder="Sort by Date"
          size="sm"
          value={sortOrder}
          onChange={handleSortChange}
        >
          <SelectItem key="newest" value="newest">
            Newest
          </SelectItem>
          <SelectItem key="oldest" value="oldest">
            Oldest
          </SelectItem>
        </Select>

        <Select
          className="max-w-full"
          placeholder="Sort by Voting"
          size="sm"
          value={votingOrder}
          onChange={handleVotingFilterChange}
        >
          <SelectItem key="upvotes" value="upvotes">
            Upvotes
          </SelectItem>
          <SelectItem key="downvotes" value="downvotes">
            Downvotes
          </SelectItem>
        </Select>
      </div>

      <Divider className="my-4" />

      {filteredArticles.length > 0 ? (
        <InfiniteScroll
          dataLength={page * 2}
          endMessage={
            <p className="text-center text-gray-500 my-4">
              No more articles to load.
            </p>
          }
          hasMore={page * 2 < filteredArticles.length}
          loader={<LoaderNewsfeed />}
          next={loadMore}
        >
          <div className="p-2 flex flex-col gap-4">
            {filteredArticles.slice(0, page * 2).map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <p className="text-center text-gray-500">
          <NoArticlesFound />{" "}
        </p>
      )}
    </div>
  );
};

export default Page;
