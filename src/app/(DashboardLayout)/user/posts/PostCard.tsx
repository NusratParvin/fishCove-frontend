// "use client";

// import { Card, Avatar, Chip } from "@heroui/react";
// import { MessageCircle, PartyPopper } from "lucide-react";
// import Link from "next/link";
// import SharePopover from "./SharePopover";

// const REACTIONS = [
//   { key: "like", emoji: "🐾", label: "Paw" },
//   { key: "love", emoji: "❤️", label: "Love" },
//   { key: "haha", emoji: "😂", label: "Zoomies" },
//   { key: "wow", emoji: "😮", label: "Wow" },
//   { key: "sad", emoji: "😢", label: "Sad" },
//   { key: "angry", emoji: "😠", label: "Angry" },
// ];

// const MILESTONE_LABELS: Record<string, string> = {
//   adoption: "🏠 Adoption day",
//   birthday: "🎂 Birthday",
//   "vet-visit": "🩺 Vet visit",
//   health: "💊 Health update",
//   other: "✨ Milestone",
// };

// function timeAgo(date: string) {
//   const diff = Date.now() - new Date(date).getTime();
//   const mins = Math.floor(diff / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins}m`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs}h`;
//   return `${Math.floor(hrs / 24)}d`;
// }

// function PostHeader({ post }: { post: any }) {
//   return (
//     <div className="flex items-center gap-3">
//       <Avatar
//         src={post.authorId?.profilePhoto}
//         name={post.authorId?.name}
//         size="sm"
//       />
//       <div className="flex-1">
//         <div className="flex items-center gap-2 flex-wrap">
//           <span className="font-medium text-sm">{post.authorId?.name}</span>
//           {post.petId && (
//             <span className="text-default-500 text-xs">
//               → {post.petId.name}
//             </span>
//           )}
//           {post.isMilestone && (
//             <Chip
//               size="sm"
//               variant="flat"
//               color="warning"
//               className="rounded-md"
//             >
//               {MILESTONE_LABELS[post.milestoneCategory] ?? "✨ Milestone"}
//             </Chip>
//           )}
//         </div>
//         <span className="text-default-400 text-xs">
//           {timeAgo(post.createdAt)}
//         </span>
//       </div>
//     </div>
//   );
// }

// function MediaGrid({ media }: { media: { url: string; type: string }[] }) {
//   if (!media?.length) return null;
//   return (
//     <div
//       className={`mt-3 grid gap-1 rounded-md overflow-hidden ${
//         media.length === 1 ? "grid-cols-1" : "grid-cols-2"
//       }`}
//     >
//       {media.map((m, i) =>
//         m.type === "video" ? (
//           <video
//             key={i}
//             src={m.url}
//             controls
//             className="w-full max-h-[420px] object-cover"
//           />
//         ) : (
//           <img
//             key={i}
//             src={m.url}
//             className="w-full max-h-[420px] object-cover"
//             alt=""
//           />
//         ),
//       )}
//     </div>
//   );
// }

// // The nested preview shown inside shared_article / shared_post cards.
// // Deliberately compact — it's a preview, not a full re-render of the
// // original card (avoids infinite nesting if someone shares a share).
// function SharedContentPreview({ post }: { post: any }) {
//   const original = post.refId;
//   if (!original) {
//     return (
//       <div className="mt-3 rounded-md border border-default-200 p-3 text-sm text-default-400">
//         This content is no longer available.
//       </div>
//     );
//   }

//   if (post.refType === "Article") {
//     return (
//       <Link href={`/articles/${original._id}`}>
//         <div className="mt-3 rounded-md border border-default-200 overflow-hidden hover:border-steel-blue transition-colors">
//           {original.images && (
//             <img
//               src={original.images}
//               className="w-full h-40 object-cover"
//               alt=""
//             />
//           )}
//           <div className="p-3">
//             <Chip size="sm" variant="flat" className="rounded-md mb-1">
//               {original.category}
//             </Chip>
//             <p className="font-medium text-sm">{original.title}</p>
//             <p className="text-default-500 text-xs line-clamp-2">
//               {original.content}
//             </p>
//           </div>
//         </div>
//       </Link>
//     );
//   }

//   // shared_post — nested original post, compact
//   return (
//     <div className="mt-3 rounded-md border border-default-200 p-3">
//       <div className="flex items-center gap-2">
//         <Avatar
//           src={original.authorId?.profilePhoto}
//           name={original.authorId?.name}
//           size="sm"
//         />
//         <span className="font-medium text-sm">{original.authorId?.name}</span>
//       </div>
//       {original.caption && <p className="text-sm mt-1">{original.caption}</p>}
//       <MediaGrid media={original.media} />
//     </div>
//   );
// }

// export default function PostCard({
//   post,
//   onReact,
//   onComment,
// }: {
//   post: any;
//   onReact: (postId: string, reaction: string) => void;
//   onComment: (postId: string) => void;
// }) {
//   const totalReactions = REACTIONS.reduce(
//     (sum, r) => sum + (post.reactionSummary?.[r.key] ?? 0),
//     0,
//   );

//   const isShare = post.type === "shared_article" || post.type === "shared_post";

//   return (
//     <Card className="rounded-md shadow-sm dark:shadow-primary p-4">
//       <PostHeader post={post} />

//       {post.caption && (
//         <p className="text-sm mt-3 whitespace-pre-wrap">{post.caption}</p>
//       )}

//       {isShare ? (
//         <SharedContentPreview post={post} />
//       ) : (
//         <MediaGrid media={post.media} />
//       )}

//       {/* Reaction summary + counts */}
//       {(totalReactions > 0 || post.commentCount > 0) && (
//         <div className="flex items-center justify-between text-xs text-default-500 mt-3 pt-2 border-t border-default-100">
//           <span>{totalReactions > 0 && `${totalReactions} reactions`}</span>
//           <span>
//             {post.commentCount > 0 && `${post.commentCount} comments`}
//           </span>
//         </div>
//       )}

//       {/* Action row */}
//       <div className="flex items-center justify-between mt-2 pt-2 border-t border-default-200">
//         <div className="flex gap-1">
//           {REACTIONS.map((r) => {
//             const isActive = post.myReaction === r.key;
//             return (
//               <button
//                 key={r.key}
//                 onClick={() => onReact(post._id, r.key)}
//                 title={r.label}
//                 className={`text-lg hover:scale-125 transition-transform px-1 rounded-md ${
//                   isActive ? "bg-steel-blue/20 scale-110" : ""
//                 }`}
//               >
//                 {r.emoji}
//               </button>
//             );
//           })}
//         </div>
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => onComment(post._id)}
//             className="flex items-center gap-1 text-default-500 hover:text-steel-blue text-sm"
//           >
//             <MessageCircle size={16} />
//             Comment
//           </button>
//           <SharePopover
//             refId={post._id}
//             refType="Post"
//             shareCount={post.shareCount}
//           />
//         </div>
//       </div>
//     </Card>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { Card, Avatar, Chip } from "@heroui/react";
import { MessageCircle, MoreHorizontal, Eye, X } from "lucide-react";
import Link from "next/link";
import SharePopover from "./SharePopover";

import { formatDistanceToNow } from "date-fns";

const REACTIONS = [
  { key: "like", emoji: "🐾", label: "Paw" },
  { key: "love", emoji: "❤️", label: "Love" },
  { key: "haha", emoji: "😂", label: "Zoomies" },
  { key: "wow", emoji: "😮", label: "Woow" },
  { key: "sad", emoji: "😢", label: "Aww" },
  { key: "angry", emoji: "😠", label: "Grr" },
];

const MILESTONE_LABELS = {
  adoption: "🏠 Adoption day",
  birthday: "🎂 Birthday",
  "vet-visit": "🩺 Vet visit",
  health: "💊 Health update",
  other: "✨ Milestone",
};

const timeAgo = (date: string) => {
  return (
    formatDistanceToNow(new Date(date), {
      includeSeconds: true,
    }) + " ago"
  );
};

function PostHeader({ post }: { post: any }) {
  return (
    <div className="flex items-start gap-3">
      <Avatar
        src={post.authorId?.profilePhoto}
        name={post.authorId?.name?.charAt(0)?.toUpperCase() ?? "U"}
        className="w-10 h-10 shrink-0 ring-2 ring-steel-blue/20 dark:ring-lime-burst/20"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">
            {post.authorId?.name}
          </span>
          {post.petId && (
            <span className="text-[11px] font-semibold text-steel-blue dark:text-lime-burst">
              → {post.petId.name}
            </span>
          )}
          {post.isMilestone && (
            <Chip
              size="sm"
              classNames={{
                base: "h-5 bg-amber-400/15 border border-amber-400/40 rounded-full",
                content:
                  "text-[9px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400 px-1",
              }}
            >
              {MILESTONE_LABELS[post.milestoneCategory] ?? "✨ Milestone"}
            </Chip>
          )}
        </div>
        <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
          {timeAgo(post.createdAt)}
        </span>
      </div>

      <button
        type="button"
        aria-label="Post options"
        className="shrink-0 grid place-items-center size-8 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
      >
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
}

function MediaGrid({ media }: { media: { url: string; type: string }[] }) {
  if (!media?.length) return null;

  return (
    <div
      className={`grid gap-2 ${media.length === 1 ? "grid-cols-1" : media.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
    >
      {media.map((m, i) =>
        m.type === "video" ? (
          <video
            key={i}
            src={m.url}
            controls
            className={`w-full rounded-xl border border-zinc-200 dark:border-white/10 object-cover ${
              media.length === 1 ? "max-h-[420px]" : "aspect-square"
            }`}
          />
        ) : (
          <img
            key={i}
            src={m.url}
            alt=""
            loading="lazy"
            className={`w-full rounded-xl border border-zinc-200 dark:border-white/10 object-cover ${
              media.length === 1 ? "max-h-[420px]" : "aspect-square"
            }`}
          />
        ),
      )}
    </div>
  );
}

function SharedContentPreview({ post }: { post: any }) {
  const original = post.refId;

  if (!original) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 dark:border-white/10 p-4 text-center text-xs text-zinc-400">
        This content is no longer available.
      </div>
    );
  }

  if (post.refType === "Article") {
    return (
      <Link href={`/articles/${original._id}`} className="block">
        <div className="flex gap-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.03] p-3 hover:border-steel-blue/50 dark:hover:border-lime-burst/40 transition-colors">
          {original.images && (
            <img
              src={original.images}
              alt=""
              className="size-16 shrink-0 rounded-lg object-cover"
            />
          )}
          <div className="min-w-0 space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-wide text-steel-blue dark:text-lime-burst">
              {original.category}
            </span>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
              {original.title}
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
              {original.content}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.03] p-3 space-y-2">
      <div className="flex items-center gap-2">
        <Avatar
          src={original.authorId?.profilePhoto}
          name={original.authorId?.name?.charAt(0) ?? "U"}
          className="w-6 h-6"
        />
        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
          {original.authorId?.name}
        </span>
      </div>
      {original.caption && (
        <p className="text-[11px] text-zinc-600 dark:text-zinc-300 line-clamp-3">
          {original.caption}
        </p>
      )}
      <MediaGrid media={original.media} />
    </div>
  );
}

export default function PostCard({
  post,
  onReact,
  onComment,
}: {
  post: any;
  onReact: (postId: string, reaction: string) => void;
  onComment: (postId: string) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pickerOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setPickerOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [pickerOpen]);

  const totalReactions = REACTIONS.reduce(
    (sum, r) => sum + (post.reactionSummary?.[r.key] ?? 0),
    0,
  );

  const topReactions = REACTIONS.filter(
    (r) => (post.reactionSummary?.[r.key] ?? 0) > 0,
  ).slice(0, 3);

  const isShare = post.type === "shared_article" || post.type === "shared_post";
  const mine = REACTIONS.find((r) => r.key === post.myReaction);

  const pick = (key: string) => {
    onReact(post._id, key);
    setPickerOpen(false);
  };

  return (
    <Card
      radius="none"
      shadow="none"
      className="w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-4 sm:p-5 space-y-3 overflow-visible"
    >
      <PostHeader post={post} />

      {post.caption && (
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-200 break-words whitespace-pre-wrap">
          {post.caption}
        </p>
      )}

      {isShare ? (
        <SharedContentPreview post={post} />
      ) : (
        <MediaGrid media={post.media} />
      )}

      {/* Counters row */}
      {(totalReactions > 0 || post.commentCount > 0) && (
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="flex min-w-0 items-center gap-2">
            {topReactions.length > 0 && (
              <div className="flex items-center -space-x-1.5">
                {topReactions.map((r) => (
                  <span
                    key={r.key}
                    className="grid size-6 shrink-0 place-items-center rounded-full bg-zinc-100 dark:bg-zinc-800 ring-2 ring-white dark:ring-zinc-900 text-[11px]"
                  >
                    {r.emoji}
                  </span>
                ))}
              </div>
            )}
            {totalReactions > 0 && (
              <span className="truncate text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                {totalReactions}
              </span>
            )}
          </div>
          {post.commentCount > 0 && (
            <span className="shrink-0 text-xs text-zinc-400 dark:text-zinc-500">
              {post.commentCount} comments
            </span>
          )}
        </div>
      )}

      {/* Action row — pill buttons */}
      <div
        ref={wrapRef}
        className="relative grid grid-cols-2 sm:grid-cols-3 items-center gap-2 pt-3 border-t border-zinc-100 dark:border-white/[0.06]"
      >
        {/* Floating reaction bar (reference: pill above the button) */}
        {pickerOpen && (
          <div className="absolute -top-11 right-0 z-20 flex items-center gap-1 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-800 px-2 py-1.5 shadow-xl animate-in fade-in slide-in-from-bottom-1 duration-150">
            {REACTIONS.map((r) => (
              <button
                key={r.key}
                type="button"
                title={r.label}
                onClick={() => pick(r.key)}
                className={`grid size-8 place-items-center rounded-full text-lg transition-transform hover:scale-125 ${
                  post.myReaction === r.key
                    ? "bg-steel-blue/15 dark:bg-lime-burst/15 scale-110"
                    : ""
                }`}
              >
                {r.emoji}
              </button>
            ))}
            <button
              type="button"
              aria-label="Close reactions"
              onClick={() => setPickerOpen(false)}
              className="ml-0.5 grid size-6 place-items-center rounded-full border border-zinc-300 dark:border-white/15 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              <X size={12} />
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => onComment(post._id)}
          className="flex h-10 items-center justify-center gap-2 rounded-xl bg-zinc-100 dark:bg-white/[0.06] text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-steel-blue/10 dark:hover:bg-lime-burst/10 hover:text-steel-blue dark:hover:text-lime-burst transition-colors"
        >
          <MessageCircle size={15} />
          Comment
        </button>

        <div className="flex h-10 items-center justify-center gap-2 rounded-xl bg-zinc-100 dark:bg-white/[0.06] text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-steel-blue/10 dark:hover:bg-lime-burst/10 transition-colors">
          <SharePopover post={post} />
        </div>

        {/* Reaction button — pill, like the "Woow!!!" CTA */}
        <button
          type="button"
          onClick={() => setPickerOpen((v) => !v)}
          className={`col-span-2 sm:col-span-1 flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-xs font-extrabold uppercase tracking-wide shadow-sm transition-all active:scale-95 ${
            mine
              ? "bg-gradient-to-r from-steel-blue to-steel-blue/85 dark:from-lime-burst dark:to-lime-burst/85 text-white dark:text-zinc-900"
              : "bg-gradient-to-r from-steel-blue/10 to-lime-burst/10 dark:from-white/[0.08]  dark:to-white/[0.04] text-steel-blue dark:text-lime-burst border border-steel-blue/20 dark:border-lime-burst/20"
          }`}
        >
          <span className="text-base leading-none">{mine?.emoji ?? "🐾"}</span>
          {mine ? `${mine.label}!!!` : "React"}
        </button>
      </div>
    </Card>
  );
}
