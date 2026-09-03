"use client";

import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Textarea,
} from "@heroui/react";
import { useSharePostMutation } from "@/src/redux/features/posts/postsApi";

import { Share2 } from "lucide-react";
import { toast } from "sonner";

export default function SharePopover({
  refId,
  refType,
  shareCount,
}: {
  refId: string;
  refType: "Article" | "Post";
  shareCount: number;
}) {
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [sharePost, { isLoading }] = useSharePostMutation();

  const handleShare = async (withCaption: boolean) => {
    try {
      await sharePost({
        refId,
        refType,
        caption: withCaption ? caption.trim() || undefined : undefined,
      }).unwrap();
      toast.success("Shared to your profile and the feed");
      setCaption("");
      setOpen(false);
    } catch {
      toast.error("Couldn't share — try again.");
    }
  };

  return (
    <Popover isOpen={open} onOpenChange={setOpen} placement="top">
      <PopoverTrigger>
        <button className="flex items-center gap-1 text-default-500 hover:text-steel-blue text-sm">
          <Share2 size={16} />
          {shareCount > 0 && <span>{shareCount}</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3 rounded-md">
        <div className="w-full space-y-2">
          <Textarea
            placeholder="Say something about this (optional)"
            value={caption}
            onValueChange={setCaption}
            minRows={2}
            variant="bordered"
            classNames={{ inputWrapper: "rounded-md" }}
          />
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="light"
              isDisabled={isLoading}
              onPress={() => handleShare(false)}
            >
              Quick share
            </Button>
            <Button
              size="sm"
              className="bg-lime-burst text-black rounded-md"
              isDisabled={isLoading}
              isLoading={isLoading}
              onPress={() => handleShare(true)}
            >
              Share
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
