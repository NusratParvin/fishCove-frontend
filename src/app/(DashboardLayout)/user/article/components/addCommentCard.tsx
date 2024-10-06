"use client";
import { useForm } from "react-hook-form";
import { Button, Avatar, Card, CardBody, Input } from "@nextui-org/react";
import { useAppSelector } from "@/src/redux/hooks";
import { useCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useAddCommentMutation } from "@/src/redux/features/comments/commentsApi";
import { toast } from "sonner";

type FormData = {
  content: string;
};

const AddCommentCard = ({ articleId }: { articleId: string }) => {
  const user = useAppSelector(useCurrentUser);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [addComment] = useAddCommentMutation();

  const onSubmit = async (data: FormData) => {
    const commentData = {
      articleId,
      content: data.content,
      commenter: {
        commenterId: user?._id,
        name: user?.name,

        profilePhoto: user?.profilePhoto || "",
      },
    };

    const toastId = toast("Posting...", {
      duration: 4000,
    });

    try {
      const response = await addComment(commentData).unwrap();
      console.log(response);
      reset();

      toast.success("Comment added successfully!", {
        id: toastId,
        className: "text-green-500",
      });
    } catch (error) {
      toast.error("Failed to add comment. Please try again.", {
        id: toastId,
        className: "text-red-500",
      });
      console.error("Error adding comment:", error);
    }
  };

  const onCancel = () => {
    reset();
  };

  return (
    <Card
      radius="none"
      className="max-w-full mx-auto bg-white shadow-sm text-gray-700 my-4"
    >
      <CardBody className="p-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-2  ">
            {/* User Avatar */}
            <Avatar
              src={user?.profilePhoto || "/fallback.svg"}
              size="sm"
              className="bg-orange-500 text-white w-7 h-7"
              fallback={user?.name?.charAt(0) || "U"}
            />

            <div className="flex-grow ">
              <Input
                {...register("content", { required: "Comment is required" })}
                placeholder="Write your comment..."
                fullWidth
                isClearable
                variant="flat"
              />
            </div>

            <div className="flex space-x-2 items-center">
              <Button
                size="sm"
                type="submit"
                variant="shadow"
                className="bg-customBlue text-white"
              >
                Post
              </Button>
              <Button
                size="sm"
                variant="shadow"
                color="danger"
                onPress={onCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default AddCommentCard;
