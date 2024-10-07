"use client";
import { useParams } from "next/navigation";

import ErrorNewsfeed from "../../newsfeed/components/errorNewsfeed";
import LoaderNewsfeed from "../../newsfeed/components/loaderNewsfeed";
import ArticleDetailsCard from "../components/articleDetailsCard";
import CommentCard from "../components/commentCard";
import AddCommentCard from "../components/addCommentCard";

import { useGetArticleByIdQuery } from "@/src/redux/features/articles/articlesApi";
import { TComment } from "@/src/types";

const ArticleDetails = () => {
  const { id } = useParams();
  const { data: article, isLoading, isError } = useGetArticleByIdQuery(id);
  const comments: TComment[] = article?.data?.comments || [];

  if (isLoading) {
    return <LoaderNewsfeed />;
  }
  // console.log(article);
  if (isError || !article) {
    return <ErrorNewsfeed />;
  }

  return (
    <div className="my-12">
      <ArticleDetailsCard articleInfo={article?.data} />

      {comments.length > 0 ? (
        <div className="mt-8 mx-4">
          <h3 className="text-sm text-gray-800 font-semibold mb-4">Comments</h3>
          <div className="mx-6  ">
            {comments.map((comment: TComment) => (
              <CommentCard
                key={comment._id}
                articleId={article?.data?._id}
                comment={comment}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-6 mx-4 text-sm text-gray-500">
          No comments yet. Be the first to post!
        </p>
      )}

      {/* <CommentsSection articleId={article?.data?._id} /> */}

      <div className="mt-6 mx-4">
        <h3 className="text-sm text-gray-800 font-semibold mb-4">
          Share your Thoughts ?
        </h3>
        <div className="mx-6  ">
          <AddCommentCard articleId={article?.data?._id} />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
