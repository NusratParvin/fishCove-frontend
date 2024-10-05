"use client";

import { Divider } from "@nextui-org/react";

import { useGetAllArticlesQuery } from "@/src/redux/features/articles/articlesApi";
import ArticleCard from "./components/articleCard";
import ErrorNewsfeed from "./components/errorNewsfeed";
import LoaderNewsfeed from "./components/loaderNewsfeed";

const Page = () => {
  const {
    data: allArticles,
    error,
    isLoading,
  } = useGetAllArticlesQuery(undefined);

  if (isLoading) {
    return <LoaderNewsfeed />;
  }

  if (error) {
    return <ErrorNewsfeed />;
  }

  return (
    <div className="mr-2">
      <div className="py-3">
        <h1 className="font-semibold text-base text-start text-customBlue ms-3">
          Articles
        </h1>
      </div>
      <Divider className="bg-gray-400/20 border-none" />
      <div className="p-2 flex flex-col gap-2">
        {allArticles?.data?.map((article: any) => (
          <div key={article._id}>
            <ArticleCard article={article} />
          </div>
        ))}
        {/* <ArticleCard /> */}
      </div>
    </div>
  );
};

export default Page;
