// "use client";
// import { useEffect } from "react";

// import ErrorNewsfeed from "../newsfeed/components/errorNewsfeed";
// import LoaderNewsfeed from "../newsfeed/components/loaderNewsfeed";

// import ArticleCardManage from "./components/articleCardManage";

// import { useGetMyArticlesQuery } from "@/src/redux/features/articles/articlesApi";
// import { TArticle } from "@/src/types";
// import NoArticlesFound from "@/src/components/shared/noArticleFound";
// import { Divider } from "@nextui-org/react";

// const Page = () => {
//   const {
//     data: myArticles,
//     isLoading,
//     error,
//     refetch,
//   } = useGetMyArticlesQuery(undefined);

//   //   console.log(myArticles);

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   return (
//     <div>
//       <div className="w-full p-4 font-semibold text-base text-black/70 border-b border-gray-200">
//         Manage My Articles
//       </div>

//       <div className="flex flex-col gap-20">
//         {myArticles?.data?.length > 0 ? (
//           myArticles.data?.map((article: TArticle) => (
//             <ArticleCardManage key={article._id} article={article} />
//           ))
//         ) : (
//           <NoArticlesFound />
//         )}
//         {isLoading && <LoaderNewsfeed />}
//         {error && <ErrorNewsfeed />}
//       </div>
//     </div>
//   );
// };

// export default Page;
"use client";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react"; // Import Input for search
import ErrorNewsfeed from "../newsfeed/components/errorNewsfeed";
import LoaderNewsfeed from "../newsfeed/components/loaderNewsfeed";
import ArticleCardManage from "./components/articleCardManage";
import { useGetMyArticlesQuery } from "@/src/redux/features/articles/articlesApi";
import { TArticle } from "@/src/types";
import NoArticlesFound from "@/src/components/shared/noArticleFound";

const Page = () => {
  const {
    data: myArticles,
    isLoading,
    error,
    refetch,
  } = useGetMyArticlesQuery(undefined);

  const [searchTerm, setSearchTerm] = useState(""); // Manage search input

  useEffect(() => {
    refetch();
  }, [refetch]);

  const filteredArticles = myArticles?.data?.filter(
    (article: TArticle) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="w-full p-4 font-semibold text-base text-black/70 border-b border-gray-200 flex justify-between items-center">
        <span>Manage My Articles</span>

        {/* Search Input */}
        <Input
          isClearable
          placeholder="Search by title/category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />
      </div>

      <div className="flex flex-col gap-20">
        {/* Display filtered articles */}
        {filteredArticles?.length > 0 ? (
          filteredArticles.map((article: TArticle) => (
            <ArticleCardManage key={article._id} article={article} />
          ))
        ) : (
          <NoArticlesFound />
        )}
        {isLoading && <LoaderNewsfeed />}
        {error && <ErrorNewsfeed />}
      </div>
    </div>
  );
};

export default Page;
