// "use client";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Avatar,
//   Button,
//   Chip,
//   Tooltip,
// } from "@nextui-org/react";
// import {
//   ArrowUp,
//   ArrowDown,
//   ChevronDown,
//   ChevronUp,
//   MessagesSquare,
// } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// import fallbackImage from "@/src/assets/images/fallback.jpg";
// import { useVoteArticleMutation } from "@/src/redux/features/articles/articlesApi";
// import { TArticle } from "@/src/types";
// import {
//   useFollowUserMutation,
//   useGetUserInfoQuery,
// } from "@/src/redux/features/user/userApi";
// import { useAppSelector } from "@/src/redux/hooks";
// import { useCurrentUser } from "@/src/redux/features/auth/authSlice";

// const ArticleCard = ({ article }: { article: TArticle }) => {
//   const { authorId } = article;
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [voteArticle] = useVoteArticleMutation();
//   const [isExpanded, setIsExpanded] = useState(false);
//   const contentRef = useRef<HTMLDivElement>(null);

//   const [followUser] = useFollowUserMutation();
//   // const user = useAppSelector(useCurrentUser);
//   const router = useRouter();
//   const { data: userInfo } = useGetUserInfoQuery(undefined);
//   const user = userInfo?.data;

//   useEffect(() => {
//     const alreadyFollowing = article?.authorId?.followers?.includes(
//       user?._id as string
//     );

//     setIsFollowing(alreadyFollowing || false);
//   }, [article, user]);

//   const toggleContent = () => {
//     setIsExpanded(!isExpanded);
//   };

//   // Handle article upvote
//   const handleUpvote = async () => {
//     try {
//       await voteArticle({
//         articleId: article._id,
//         voteType: "upvote",
//       }).unwrap();
//     } catch (error) {
//       console.error("Failed to upvote:", error);
//     }
//   };

//   const handleDownvote = async () => {
//     try {
//       await voteArticle({
//         articleId: article._id,
//         voteType: "downvote",
//       }).unwrap();
//     } catch (error) {
//       console.error("Failed to downvote:", error);
//     }
//   };

//   const handleFollow = async () => {
//     try {
//       setIsFollowing((prev) => !prev);
//       const result = await followUser({
//         followUserId: authorId._id,
//       }).unwrap();

//       setIsFollowing(result?.isFollowing || false);
//     } catch (error) {
//       setIsFollowing((prev) => !prev);
//       console.error("Failed to follow/unfollow:", error);
//     }
//   };
//   const handleBuyNow = () => {
//     const paymentData = {
//       articleId: article._id,
//       authorId: article.authorId._id,
//       amount: article.price,
//     };

//     const encodedData = encodeURIComponent(JSON.stringify(paymentData));

//     router.push(`/user/article/payment?data=${encodedData}`);
//   };

//   return (
//     <Card
//       className="max-w-full mx-auto text-black/80 text-sm bg-white shadow-lg"
//       radius="none"
//     >
//       {/* Card Header */}
//       <CardHeader className="flex flex-col items-start p-5">
//         <div className="flex justify-between items-start w-full">
//           <div className="flex items-center   w-full mb-3">
//             <Avatar className="w-12 h-12" src={authorId?.profilePhoto} />
//             <div className="ml-3 flex-grow">
//               <div className="flex gap-6 items-end">
//                 <h3 className="text-base font-bold">
//                   {authorId?.name || "Anonymous"}
//                 </h3>
//                 {user?._id !== authorId?._id && (
//                   <Button
//                     className="mr-2 text-xs h-6 min-w-unit-16 bg-customBlue text-white"
//                     color="primary"
//                     size="sm"
//                     onClick={handleFollow}
//                   >
//                     {isFollowing ? "Unfollow" : "Follow"}
//                   </Button>
//                 )}
//               </div>
//               <div className="flex items-center text-xs text-gray-500 mt-1">
//                 <Chip
//                   className="bg-customBlue/10 text-customBlue font-semibold"
//                   size="sm"
//                 >
//                   {article?.category}
//                 </Chip>
//                 <span className="mx-2">•</span>
//                 <span>{new Date(article?.createdAt).toLocaleDateString()}</span>
//               </div>
//             </div>
//           </div>
//           {/* Toggle content visibility */}
//           <div className="flex items-center gap-1">
//             {article?.isPremium ? (
//               <Chip color="warning" variant="flat">
//                 <strong>Premium</strong>
//               </Chip>
//             ) : (
//               <Chip color="success" variant="flat">
//                 <strong>Free</strong>
//               </Chip>
//             )}
//             {/* Lock icon with premium color */}
//             {article?.isPremium ? (
//               <Tooltip color="warning" content="You have to buy this article">
//                 <ChevronDown size={20} />
//               </Tooltip>
//             ) : (
//               <Button
//                 isIconOnly
//                 className={`text-gray-500 mt-0 h-8 min-w-unit-6 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
//                 variant="light"
//                 onPress={toggleContent}
//               >
//                 {isExpanded ? (
//                   <ChevronUp size={20} />
//                 ) : (
//                   <ChevronDown size={20} />
//                 )}
//               </Button>
//             )}
//           </div>
//         </div>

//         <h2 className="text-base text-customOrange/80 font-semibold mb-2 underline">
//           {article?.isPremium ? (
//             <Tooltip color="warning" content="Buy to read more">
//               {article.title}
//             </Tooltip>
//           ) : (
//             <Link href={`/user/article/${article?._id}`}>{article.title}</Link>
//           )}
//         </h2>

//         <div
//           ref={contentRef}
//           className={`transition-all duration-700 ease-in-out overflow-hidden ${
//             isExpanded ? "max-h-[1500px]" : "max-h-[80px]"
//           }`}
//         >
//           <div
//             dangerouslySetInnerHTML={{
//               __html: article.content,
//             }}
//           />
//         </div>
//       </CardHeader>

//       {/* Card Body (Image) */}
//       <CardBody className="p-0">
//         <div className="relative h-64 w-full">
//           <Image
//             alt="Article Image"
//             layout="fill"
//             objectFit="cover"
//             src={article.images || fallbackImage}
//           />
//         </div>
//       </CardBody>

//       {/* Card Footer */}
//       <CardFooter className="flex justify-between items-center p-5 text-gray-700">
//         <div className="flex space-x-3">
//           <Button
//             size="sm"
//             startContent={<ArrowUp className="text-green-500" size={16} />}
//             variant="light"
//             onClick={handleUpvote}
//           >
//             {article.upvotes}
//           </Button>
//           <Button
//             size="sm"
//             startContent={<ArrowDown className="text-red-500" size={16} />}
//             variant="light"
//             onClick={handleDownvote}
//           >
//             {article.downvotes}
//           </Button>
//           <Button
//             as={Link}
//             href={`/user/article/${article._id}`}
//             size="sm"
//             isDisabled={article?.isPremium}
//             startContent={
//               <MessagesSquare className="text-customBlue" size={16} />
//             }
//             variant="light"
//           >
//             {article?.comments?.length}
//           </Button>
//           {/* <Button
//             size="sm"
//             variant="light"
//             startContent={
//               <MessageSquareText size={16} className="text-gray-500" />
//             }
//           >
//             Add Comment
//           </Button> */}
//         </div>
//         <div className="flex items-center">
//           {article.isPremium && (
//             <Button
//               className="bg-customBlue text-white"
//               size="sm"
//               variant="flat"
//               onClick={() => handleBuyNow()}
//             >
//               Buy Now ${article.price.toFixed(2)}
//             </Button>
//           )}
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default ArticleCard;

"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import {
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  MessagesSquare,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import fallbackImage from "@/src/assets/images/fallback.jpg";
import { useVoteArticleMutation } from "@/src/redux/features/articles/articlesApi";
import { TArticle } from "@/src/types";
import {
  useFollowUserMutation,
  useGetUserInfoQuery,
} from "@/src/redux/features/user/userApi";
import { useAppSelector } from "@/src/redux/hooks";

const ArticleCard = ({ article }: { article: TArticle }) => {
  const { authorId } = article;
  const [isFollowing, setIsFollowing] = useState(false);
  const [voteArticle] = useVoteArticleMutation();
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const [followUser] = useFollowUserMutation();
  const router = useRouter();

  // Fetch user information
  const { data: userInfo } = useGetUserInfoQuery(undefined);
  const user = userInfo?.data;

  // Check if the article is purchased by the user
  const hasPurchased = user?.purchasedArticles?.some(
    (purchasedArticle) => purchasedArticle === article._id
  );

  useEffect(() => {
    const alreadyFollowing = article?.authorId?.followers?.includes(
      user?._id as string
    );
    setIsFollowing(alreadyFollowing || false);
  }, [article, user]);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle article upvote
  const handleUpvote = async () => {
    try {
      await voteArticle({
        articleId: article._id,
        voteType: "upvote",
      }).unwrap();
    } catch (error) {
      console.error("Failed to upvote:", error);
    }
  };

  const handleDownvote = async () => {
    try {
      await voteArticle({
        articleId: article._id,
        voteType: "downvote",
      }).unwrap();
    } catch (error) {
      console.error("Failed to downvote:", error);
    }
  };

  const handleFollow = async () => {
    try {
      setIsFollowing((prev) => !prev);
      const result = await followUser({
        followUserId: authorId._id,
      }).unwrap();

      setIsFollowing(result?.isFollowing || false);
    } catch (error) {
      setIsFollowing((prev) => !prev);
      console.error("Failed to follow/unfollow:", error);
    }
  };

  const handleBuyNow = () => {
    const paymentData = {
      articleId: article._id,
      authorId: article.authorId._id,
      amount: article.price,
    };

    const encodedData = encodeURIComponent(JSON.stringify(paymentData));
    router.push(`/user/article/payment?data=${encodedData}`);
  };

  return (
    <Card
      className="max-w-full mx-auto text-black/80 text-sm bg-white shadow-lg"
      radius="none"
    >
      {/* Card Header */}
      <CardHeader className="flex flex-col items-start p-5">
        <div className="flex justify-between items-start w-full">
          <div className="flex items-center   w-full mb-3">
            <Avatar className="w-12 h-12" src={authorId?.profilePhoto} />
            <div className="ml-3 flex-grow">
              <div className="flex gap-6 items-end">
                <h3 className="text-base font-bold">
                  {authorId?.name || "Anonymous"}
                </h3>
                {user?._id !== authorId?._id && (
                  <Button
                    className="mr-2 text-xs h-6 min-w-unit-16 bg-customBlue text-white"
                    color="primary"
                    size="sm"
                    onClick={handleFollow}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                )}
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Chip
                  className="bg-customBlue/10 text-customBlue font-semibold"
                  size="sm"
                >
                  {article?.category}
                </Chip>
                <span className="mx-2">•</span>
                <span>{new Date(article?.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          {/* Toggle content visibility */}
          <div className="flex items-center gap-1">
            {article?.isPremium && !hasPurchased ? (
              <Chip color="warning" variant="flat">
                <strong>Premium</strong>
              </Chip>
            ) : article?.isPremium && hasPurchased ? (
              <Chip color="success" variant="flat">
                <strong>Purchased</strong>
              </Chip>
            ) : (
              <Chip color="success" variant="flat">
                <strong>Free</strong>
              </Chip>
            )}
            {/* Lock icon with premium color */}
            {article?.isPremium && !hasPurchased ? (
              <Tooltip color="warning" content="You have to buy this article">
                <ChevronDown size={20} />
              </Tooltip>
            ) : (
              <Button
                isIconOnly
                className={`text-gray-500 mt-0 h-8 min-w-unit-6 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                variant="light"
                onPress={toggleContent}
              >
                {isExpanded ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </Button>
            )}
          </div>
        </div>

        <h2 className="text-base text-customOrange/80 font-semibold mb-2 underline">
          {article?.isPremium && !hasPurchased ? (
            <Tooltip color="warning" content="Buy to read more">
              {article.title}
            </Tooltip>
          ) : (
            <Link href={`/user/article/${article?._id}`}>{article.title}</Link>
          )}
        </h2>

        <div
          ref={contentRef}
          className={`transition-all duration-700 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[1500px]" : "max-h-[80px]"
          }`}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          />
        </div>
      </CardHeader>

      {/* Card Body (Image) */}
      <CardBody className="p-0">
        <div className="relative h-64 w-full">
          <Image
            alt="Article Image"
            layout="fill"
            objectFit="cover"
            src={article.images || fallbackImage}
          />
        </div>
      </CardBody>

      {/* Card Footer */}
      <CardFooter className="flex justify-between items-center p-5 text-gray-700">
        <div className="flex space-x-3">
          <Button
            size="sm"
            startContent={<ArrowUp className="text-green-500" size={16} />}
            variant="light"
            onClick={handleUpvote}
          >
            {article.upvotes}
          </Button>
          <Button
            size="sm"
            startContent={<ArrowDown className="text-red-500" size={16} />}
            variant="light"
            onClick={handleDownvote}
          >
            {article.downvotes}
          </Button>
          <Button
            as={Link}
            href={`/user/article/${article._id}`}
            size="sm"
            isDisabled={article?.isPremium && !hasPurchased}
            startContent={
              <MessagesSquare className="text-customBlue" size={16} />
            }
            variant="light"
          >
            {article?.comments?.length}
          </Button>
        </div>
        <div className="flex items-center">
          {article.isPremium && !hasPurchased && (
            <Button
              className="bg-customBlue text-white"
              size="sm"
              variant="flat"
              onClick={() => handleBuyNow()}
            >
              Buy Now ${article.price.toFixed(2)}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
