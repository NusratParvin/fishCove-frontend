"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@heroui/react";
import { toast } from "sonner";
import PostComposer from "./PostComposer";
import PostCard from "./PostCard";
import {
  useGetFeedQuery,
  useReactToPostMutation,
} from "@/src/redux/features/posts/postsApi";
import { useGetMyPetsQuery } from "@/src/redux/features/pets/petsApi";
import { useCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useAppSelector } from "@/src/redux/hooks";

export default function HomeFeed() {
  const currentUser = useAppSelector(useCurrentUser);
  const { data: myPets } = useGetMyPetsQuery(undefined);
  const pets = myPets?.data ?? myPets ?? [];
  if (!currentUser) return null;

  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { ref: sentinelRef, inView } = useInView();

  const { data, isFetching, isLoading } = useGetFeedQuery({ page, limit: 15 });
  const [reactToPost] = useReactToPostMutation();

  // Append each new page's results rather than replacing — same
  // accumulation pattern as Vet Finder's infinite scroll.
  useEffect(() => {
    if (!data) return;
    const incoming = data.data ?? data; // adjust to match your sendResponse envelope
    setAllPosts((prev) => (page === 1 ? incoming : [...prev, ...incoming]));
    if (incoming.length < 15) setHasMore(false);
  }, [data, page]);

  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      setPage((p) => p + 1);
    }
  }, [inView, hasMore, isFetching]);

  const handleReact = async (postId: string, reaction: string) => {
    try {
      await reactToPost({ postId, reaction }).unwrap();
    } catch {
      toast.error("Couldn't react — try again.");
    }
  };

  const handleComment = (postId: string) => {
    // TODO: open comment drawer/modal — reuses your existing polymorphic
    // Comment component with targetType: 'Post', targetId: postId
  };

  return (
    <div className="w-full space-y-4 pb-8">
      <PostComposer currentUser={currentUser} pets={pets} />

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner color="primary" />
        </div>
      ) : allPosts.length === 0 ? (
        <div className="text-center text-default-400 py-12 text-sm">
          No posts yet — be the first to share something.
        </div>
      ) : (
        allPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onReact={handleReact}
            onComment={handleComment}
          />
        ))
      )}

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-4">
          {isFetching && <Spinner size="sm" color="primary" />}
        </div>
      )}
    </div>
  );
}
