"use client";
import { useState, useEffect } from "react";
import { Card, CardBody, Button, Avatar } from "@nextui-org/react";
import {
  ArrowUp,
  ArrowDown,
  Share,
  Flag,
  ChevronDown,
  ChevronUp,
  MessageSquareText,
  MessagesSquare,
} from "lucide-react";
import Image from "next/image";
import image from "@/src/assets/images/clown.jpg";
import { useVoteArticleMutation } from "@/src/redux/features/articles/articlesApi";
import { TArticle } from "@/src/types";
import { useFollowUserMutation } from "@/src/redux/features/user/userApi";
import { useAppSelector } from "@/src/redux/hooks";
import { useCurrentUser } from "@/src/redux/features/auth/authSlice";

export default function SingleArticleCard({ article }: { article: TArticle }) {
  const { authorId } = article;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); // Track follow status
  const [voteArticle] = useVoteArticleMutation();
  const [followUser] = useFollowUserMutation();

  const user = useAppSelector(useCurrentUser);

  useEffect(() => {
    // Check if the user is already following the author
    const alreadyFollowing = article?.authorId?.followers?.includes(user?._id);
    setIsFollowing(alreadyFollowing || false);
  }, [article, user]);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

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

  return (
    <Card className="max-w-full bg-secondary/30 text-black/70 rounded-sm">
      <CardBody className="py-2">
        <div className="flex items-start">
          {/* Thumbnail */}
          <div className="w-36 h-32 relative flex items-center justify-center mr-3">
            <Image
              alt="Thumbnail"
              src={image}
              layout="fill"
              objectFit="cover"
              className="rounded-md "
            />
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="flex justify-between ">
              <div className="flex items-center justify-end mb-1">
                <Avatar
                  className="mr-1 bg-primary/30 w-6 h-6"
                  src={authorId?.profilePhoto || "/placeholder.svg"}
                />
                <span className="text-xs font-semibold mr-2">
                  {authorId?.name || "Anonymous"}
                </span>

                {/* Follow/Unfollow Button */}
                <Button
                  onClick={handleFollow}
                  className="mr-2 text-xs h-5 min-w-unit-16 bg-customBlue text-white"
                  color="primary"
                  size="sm"
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
                <span className="text-xs text-gray-500">
                  • {new Date(article?.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Toggle button for expanding/collapsing content */}
              <Button
                isIconOnly
                variant="light"
                className={`text-gray-500 mt-2 transform transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
                onPress={toggleContent}
              >
                {isExpanded ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </Button>
            </div>

            <h2 className="text-base text-cyan-800 font-medium mb-1">
              {article.title}
            </h2>

            {/* Conditionally render the content */}
            <div
              className={`text-xs text-gray-500 ${
                isExpanded ? "whitespace-normal" : "line-clamp-1"
              }`}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: isExpanded
                    ? article.content
                    : `<div>${article.content.slice(0, 150)}...</div>`,
                }}
              />
            </div>

            <div className="flex items-center text-xs text-gray-400 mt-2">
              <Button
                isIconOnly
                className="text-green-500 mr-1"
                size="sm"
                variant="light"
                onPress={handleUpvote}
              >
                <ArrowUp size={16} />
                <span className="mr-1 font-bold text-black/70">
                  {article.upvotes}
                </span>
              </Button>

              <Button
                isIconOnly
                className="text-red-500 mr-4"
                size="sm"
                variant="light"
                onPress={handleDownvote}
              >
                <ArrowDown size={16} />{" "}
                <span className="mr-1 font-bold text-black/70">
                  {article.downvotes}
                </span>
              </Button>

              <Button
                className="mr-4 text-customBlue"
                size="sm"
                startContent={<MessagesSquare size={14} />}
                variant="light"
              >
                <span className="text-black/80">
                  {article.comments.length} comments
                </span>
              </Button>

              <Button
                className="mr-4 text-gray-700"
                size="sm"
                startContent={<MessageSquareText size={14} />}
                variant="light"
              >
                Add Comment
              </Button>
              <Button
                className="mr-4 text-gray-700"
                size="sm"
                startContent={<Share size={14} />}
                variant="light"
                disabled
              >
                Share
              </Button>
              <Button
                size="sm"
                className="mr-4 text-gray-700"
                startContent={<Flag size={14} />}
                variant="light"
                disabled
              >
                Report
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
