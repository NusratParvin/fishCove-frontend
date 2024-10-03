"use client";

import { Divider } from "@nextui-org/react";
import SingleArticleCard from "../components/singleArticleCard";
import { useGetAllArticlesQuery } from "@/src/redux/features/articles/articlesApi";

const Page = () => {
  const {
    data: allArticles,
    error,
    isLoading,
  } = useGetAllArticlesQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>{error?.data?.message}</div>;
  }

  return (
    <div className="mr-2">
      <div className="py-3">
        <h1 className="font-semibold text-base text-start text-customBlue ms-3">
          Articles
        </h1>
      </div>
      <Divider className="bg-highlight/20 border-none" />
      <div className="p-2 flex flex-col">
        {allArticles?.data?.map((article: any) => (
          <div key={article._id}>
            <SingleArticleCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
