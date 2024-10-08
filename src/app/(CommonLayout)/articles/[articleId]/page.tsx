"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

import RelatedPosts from "./components/relatedPosts";
import AuthorBio from "./components/authorBio";

import { useGetArticleByIdQuery } from "@/src/redux/features/articles/articlesApi";
import GeneralLoader from "@/src/components/shared/generalLoader";
import ErrorNewsfeed from "@/src/app/(DashboardLayout)/user/newsfeed/components/errorNewsfeed";

const Page = () => {
  const { articleId } = useParams();

  const {
    data: articleData,
    isLoading,
    error,
  } = useGetArticleByIdQuery(articleId);

  const article = articleData?.data;

  // console.log(article, "here");
  if (isLoading) return <GeneralLoader />;
  if (error || !article) return <ErrorNewsfeed />;

  return (
    <div className="mt-0 mb-36">
      <div className="w-full mx-auto relative">
        <Image
          alt="Aquarium"
          className="w-full object-cover "
          height={1200}
          src={article?.images}
          style={{ height: "30em" }}
          width={2100}
        />

        <div className="pt-8 lg:px-0 w-full md:w-10/12 mx-auto ">
          <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
            {article?.title}
          </h2>
          <Link
            className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
            href="#"
          >
            {article?.category}
          </Link>
        </div>
      </div>

      <div className="flex flex-row  lg:flex-row lg:space-x-12 w-full md:w-10/12 mx-auto ">
        <div className="px-4 lg:px-0  text-gray-700 text-base leading-relaxed w-full lg:w-[70%]">
          <p
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
            className="text-gray-500 text-sm mt-1"
          />
        </div>

        <div className="flex flex-col  w-full lg:w-[30%]">
          <AuthorBio author={article?.authorId} />
          <div>
            <RelatedPosts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
