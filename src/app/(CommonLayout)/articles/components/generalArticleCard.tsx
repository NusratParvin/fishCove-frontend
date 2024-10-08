import { TArticle } from "@/src/types";
import Image from "next/image";
import NextLink from "next/link";
import { Chip } from "@nextui-org/react";
import { useAppSelector } from "@/src/redux/hooks";
import { useCurrentUser } from "@/src/redux/features/auth/authSlice";

const GeneralArticleCard = ({ article }: { article: TArticle }) => {
  const user = useAppSelector(useCurrentUser);

  const articleLink = user
    ? article.isPremium
      ? `/user/newsfeed`
      : `/user/article/${article._id}`
    : article.isPremium
      ? `/login`
      : `/articles/${article._id}`;

  return (
    <div>
      <article
        key={article._id}
        className="flex flex-col items-center gap-4 md:flex-row lg:gap-6"
      >
        {/* Image and Link */}
        <NextLink passHref href={articleLink}>
          <div className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
            <Image
              alt={article.title}
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              fill
              loading="lazy"
              src={article.images || "/fallback.jpg"}
            />
          </div>
        </NextLink>

        {/* Article Info */}
        <div className="flex flex-col gap-2">
          {/* Date and Free/Premium Chip */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">
              {new Date(article.updatedAt).toLocaleDateString()}
            </span>

            {/* Free/Premium Chip */}
            <Chip color={article.isPremium ? "warning" : "success"} size="sm">
              {article.isPremium ? `Buy for ${article?.price} USD` : "Free"}
            </Chip>
          </div>

          {/* Title */}
          <h2 className="text-base font-semibold text-customOrange">
            <NextLink passHref href={articleLink}>
              <span className="transition duration-100 hover:text-customBlue hover:underline">
                {article.title}
              </span>
            </NextLink>
          </h2>

          {/* Description (content snippet) */}
          <p
            className="text-gray-500 text-sm"
            dangerouslySetInnerHTML={{
              __html: `${article.content?.substring(0, 200)}...`,
            }}
          />

          {/* Read More Link */}
          <div>
            <NextLink passHref href={articleLink}>
              <span className="font-semibold text-sm text-rose-500 transition duration-100 hover:text-customBlue ">
                Read more
              </span>
            </NextLink>
          </div>
        </div>
      </article>
    </div>
  );
};

export default GeneralArticleCard;
