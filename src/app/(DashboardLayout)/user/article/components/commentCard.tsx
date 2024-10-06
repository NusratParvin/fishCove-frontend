"use client";
import { TComment } from "@/src/types";
import { Card, CardBody, Avatar, Button } from "@nextui-org/react";
import { ArrowUp, ArrowDown } from "lucide-react";

const CommentCard = ({ comment }: { comment: TComment }) => {
  return (
    <Card className="max-w-full shadow-sm  mx-auto bg-white text-gray-700  my-4">
      <CardBody className="p-2">
        <div className="flex items-start space-x-2 relative">
          <div className="flex flex-col items-center">
            <Avatar
              src={comment?.commenter?.profilePhoto || "/fallback.svg"}
              size="sm"
              className="bg-orange-500 text-white w-7 h-7 z-10"
              fallback={comment?.commenter?.name?.charAt(0) || "U"}
            />
          </div>
          <div className="flex-grow pt-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-sm">
                {comment?.commenter?.name || "Anonymous"}
              </span>
              <span className="text-xs text-gray-500">
                • {new Date(comment?.createdAt).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-sm mb-2">{comment?.content}</p>
            <div className="flex items-center space-x-1 text-gray-500 text-xs">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="min-w-unit-6 h-unit-6"
              >
                <ArrowUp size={16} />
              </Button>
              <span className="font-medium">{comment?.upvotes}</span>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="min-w-unit-6 h-unit-6"
              >
                <ArrowDown size={16} />
              </Button>
              <Button
                size="sm"
                variant="light"
                className="text-xs min-w-unit-6 h-unit-6"
              >
                Reply
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CommentCard;
