"use client";
import Link from "next/link";

import GeneralLoader from "../shared/generalLoader";

import ArticleCard from "./articleCard";

import { useGetAllArticlesQuery } from "@/src/redux/features/articles/articlesApi";
import { TArticle } from "@/src/types";
import ErrorNewsfeed from "@/src/app/(DashboardLayout)/user/newsfeed/components/errorNewsfeed";

const Articles = () => {
  const {
    data: allArticles,
    isLoading,
    error,
  } = useGetAllArticlesQuery(undefined);

  if (isLoading) return <GeneralLoader />;
  if (error) return <ErrorNewsfeed />;

  // Filter the articles by isPremium false
  const filteredArticles =
    allArticles?.data?.filter((article: TArticle) => !article.isPremium) || [];

  return (
    <div className="container mx-auto mb-40 mt-16 py-8">
      <div className="border-b mb-12 flex justify-between text-sm">
        <div className="text-customOrange flex items-center pb-2 pr-2 border-b border-customOrange">
          <Link className="font-semibold inline-block text-4xl" href="#">
            Free Articles on Fish Care , Health & Stories
          </Link>
        </div>
        <Link href="#">See All</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article: TArticle) => (
            <ArticleCard key={article._id} article={article} />
          ))
        ) : (
          <p>No free articles available</p>
        )}
      </div>
    </div>
  );
};

export default Articles;
