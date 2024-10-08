// "use client";
// import { useState } from "react";
// import Image from "next/image"; // Import Image from Next.js
// import NextLink from "next/link";
// import { Skeleton } from "@nextui-org/react"; // Import Skeleton from NextUI

// import Filters from "./components/filters";

// const articles = [
//   {
//     id: 1,
//     title: "The Importance of Clean Water",
//     date: "April 5, 2024",
//     image:
//       "https://images.unsplash.com/photo-1542979506-f6e0e9c8b5e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE4fHxmaXNoJTIwY2FyaXxlbnwwfHx8fDE2NzY5MTI3NTg&ixlib=rb-1.2.1&q=80&w=400",
//     description:
//       "Learn how clean water impacts your fish's health and overall well-being.",
//     category: "Fish Care",
//     author: "John Doe",
//   },
//   // Add more articles as needed
// ];

// const categories = ["Fish Care", "Fish Health", "Aquarium Maintenance"];
// const authors = ["John Doe", "Jane Smith", "Mike Johnson"];

// export default function BlogPage() {
//   const [filteredArticles, setFilteredArticles] = useState(articles);
//   const [loading, setLoading] = useState(false);

//   const handleFilter = (
//     searchTerm: string,
//     selectedCategory: string,
//     selectedAuthor: string
//   ) => {
//     setLoading(true);
//     let filtered = articles;

//     if (typeof searchTerm === "string" && searchTerm.trim() !== "") {
//       filtered = filtered.filter((article) =>
//         article.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (selectedCategory) {
//       filtered = filtered.filter(
//         (article) => article.category === selectedCategory
//       );
//     }
//     if (selectedAuthor) {
//       filtered = filtered.filter(
//         (article) => article.author === selectedAuthor
//       );
//     }

//     setFilteredArticles(filtered);
//     setLoading(false); // Set loading to false after filtering
//   };

//   return (
//     <section className="bg-highlight/10 py-6 sm:py-8 lg:py-12 md:w-10/12 w-full mx-auto mb-36 mt-16">
//       <div className="mx-auto max-w-screen-xl px-4 md:px-8">
//         {/* Filters */}
//         <Filters
//           authors={authors}
//           categories={categories}
//           onFilter={handleFilter} // Call onFilter directly on input change
//         />

//         {/* Article Listing */}
//         <div className="grid gap-8 sm:grid-cols-1 sm:gap-12 lg:grid-cols-2 xl:gap-16">
//           {loading ? (
//             // Show skeleton while loading
//             [...Array(5)].map((_, index) => (
//               <Skeleton key={index} className="h-56 w-full rounded-lg" />
//             ))
//           ) : filteredArticles.length > 0 ? (
//             filteredArticles.map((article) => (
//               <article
//                 key={article.id}
//                 className="flex flex-col items-center gap-4 md:flex-row lg:gap-6"
//               >
//                 <NextLink passHref href={`/articles/${article.id}`}>
//                   <div className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
//                     <Image
//                       alt={article.title}
//                       className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
//                       layout="fill" // Use layout="fill" for absolute positioning
//                       loading="lazy"
//                       src={article.image}
//                     />
//                   </div>
//                 </NextLink>

//                 <div className="flex flex-col gap-2">
//                   <span className="text-sm text-gray-400">{article.date}</span>
//                   <h2 className="text-xl font-bold text-gray-800">
//                     <NextLink passHref href={`/articles/${article.id}`}>
//                       <span className="transition duration-100 hover:text-rose-500 active:text-rose-600">
//                         {article.title}
//                       </span>
//                     </NextLink>
//                   </h2>
//                   <p className="text-gray-500">{article.description}</p>
//                   <div>
//                     <NextLink passHref href={`/articles/${article.id}`}>
//                       <span className="font-semibold text-rose-500 transition duration-100 hover:text-rose-600 active:text-rose-700">
//                         Read more
//                       </span>
//                     </NextLink>
//                   </div>
//                 </div>
//               </article>
//             ))
//           ) : (
//             <div className="text-center text-gray-500 mt-8">
//               <p>No articles found.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import { Search, X } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";

import GeneralArticleCard from "./components/generalArticleCard";

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
  const [hasMore, setHasMore] = useState(true); // To manage if there are more articles to load

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
      setArticles(fetchedArticles.data.slice(0, page * 10)); // Show 10 articles initially
      setHasMore(fetchedArticles.data.length > articles.length); // Check if there are more articles
    }
  }, [fetchedArticles, page]);

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
    e: React.ChangeEvent<HTMLSelectElement>,
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
          .includes(filters.searchQuery.toLowerCase()),
    )
    .filter(
      (article) =>
        !filters.category ||
        filters.category === "All" ||
        article.category === filters.category,
    )
    .filter(
      (article) =>
        !filters.isPremium ||
        filters.isPremium === "All" ||
        (filters.isPremium === "Free" && article.isPremium === false) ||
        (filters.isPremium === "Premium" && article.isPremium === true),
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        : sortOrder === "oldest"
          ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          : 0,
    )
    .sort((a, b) =>
      votingOrder === "upvotes"
        ? b.upvotes - a.upvotes
        : votingOrder === "downvotes"
          ? b.downvotes - a.downvotes
          : 0,
    );

  return (
    <div className="p-3 rounded-lg shadow-md bg-white py-6 sm:py-8 lg:py-12 md:w-10/12 w-full mx-auto mb-36 mt-16">
      {/* Search and Reset Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-center items-start gap-4 mb-4">
        <h1 className="font-semibold text-2xl text-customBlue w-full md:w-1/2">
          Articles
        </h1>
        <div className="flex space-x-2 items-start  md:items-end w-full md:w-1/2">
          <Input
            className="flex-grow"
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
      <div className="lg:grid lg:grid-cols-4 gap-6 flex flex-wrap lg:justify-evenly items-center mb-4">
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

      <div className="p-2">
        {error ? (
          <p className="text-center text-red-500">Error loading data</p>
        ) : (
          <InfiniteScroll
            dataLength={filteredArticles.length}
            endMessage={
              <p className="text-center text-gray-500 my-4">
                No more articles to load.
              </p>
            }
            hasMore={hasMore}
            loader={
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="h-56 w-full rounded-lg" />
                ))}
              </div>
            }
            next={loadMore}
          >
            {/* Article Grid */}
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              {isLoading ? (
                [...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="h-56 w-full rounded-lg" />
                ))
              ) : filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <GeneralArticleCard key={article?._id} article={article} />
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-2">
                  <NoArticlesFound />
                </p>
              )}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default Page;
