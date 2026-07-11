'use client';

import { Card, Avatar, Chip } from '@heroui/react';
import { MessageCircle, PartyPopper } from 'lucide-react';
import Link from 'next/link';
import SharePopover from './SharePopover';

const REACTIONS = [
  { key: 'like', emoji: '🐾', label: 'Paw' },
  { key: 'love', emoji: '❤️', label: 'Love' },
  { key: 'haha', emoji: '😂', label: 'Zoomies' },
  { key: 'wow', emoji: '😮', label: 'Wow' },
  { key: 'sad', emoji: '😢', label: 'Sad' },
  { key: 'angry', emoji: '😠', label: 'Angry' },
];

const MILESTONE_LABELS: Record<string, string> = {
  adoption: '🏠 Adoption day',
  birthday: '🎂 Birthday',
  'vet-visit': '🩺 Vet visit',
  health: '💊 Health update',
  other: '✨ Milestone',
};

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

function PostHeader({ post }: { post: any }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar src={post.authorId?.profilePhoto} name={post.authorId?.name} size="sm" />
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-sm">{post.authorId?.name}</span>
          {post.petId && (
            <span className="text-default-500 text-xs">→ {post.petId.name}</span>
          )}
          {post.isMilestone && (
            <Chip size="sm" variant="flat" color="warning" className="rounded-md">
              {MILESTONE_LABELS[post.milestoneCategory] ?? '✨ Milestone'}
            </Chip>
          )}
        </div>
        <span className="text-default-400 text-xs">{timeAgo(post.createdAt)}</span>
      </div>
    </div>
  );
}

function MediaGrid({ media }: { media: { url: string; type: string }[] }) {
  if (!media?.length) return null;
  return (
    <div
      className={`mt-3 grid gap-1 rounded-md overflow-hidden ${
        media.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
      }`}
    >
      {media.map((m, i) =>
        m.type === 'video' ? (
          <video key={i} src={m.url} controls className="w-full max-h-[420px] object-cover" />
        ) : (
          <img key={i} src={m.url} className="w-full max-h-[420px] object-cover" alt="" />
        ),
      )}
    </div>
  );
}

// The nested preview shown inside shared_article / shared_post cards.
// Deliberately compact — it's a preview, not a full re-render of the
// original card (avoids infinite nesting if someone shares a share).
function SharedContentPreview({ post }: { post: any }) {
  const original = post.refId;
  if (!original) {
    return (
      <div className="mt-3 rounded-md border border-default-200 p-3 text-sm text-default-400">
        This content is no longer available.
      </div>
    );
  }

  if (post.refType === 'Article') {
    return (
      <Link href={`/articles/${original._id}`}>
        <div className="mt-3 rounded-md border border-default-200 overflow-hidden hover:border-steel-blue transition-colors">
          {original.images && (
            <img src={original.images} className="w-full h-40 object-cover" alt="" />
          )}
          <div className="p-3">
            <Chip size="sm" variant="flat" className="rounded-md mb-1">
              {original.category}
            </Chip>
            <p className="font-medium text-sm">{original.title}</p>
            <p className="text-default-500 text-xs line-clamp-2">{original.content}</p>
          </div>
        </div>
      </Link>
    );
  }

  // shared_post — nested original post, compact
  return (
    <div className="mt-3 rounded-md border border-default-200 p-3">
      <div className="flex items-center gap-2">
        <Avatar src={original.authorId?.profilePhoto} name={original.authorId?.name} size="sm" />
        <span className="font-medium text-sm">{original.authorId?.name}</span>
      </div>
      {original.caption && <p className="text-sm mt-1">{original.caption}</p>}
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
  const totalReactions = REACTIONS.reduce(
    (sum, r) => sum + (post.reactionSummary?.[r.key] ?? 0),
    0,
  );

  const isShare = post.type === 'shared_article' || post.type === 'shared_post';

  return (
    <Card className="rounded-md shadow-sm dark:shadow-primary p-4">
      <PostHeader post={post} />

      {post.caption && <p className="text-sm mt-3 whitespace-pre-wrap">{post.caption}</p>}

      {isShare ? <SharedContentPreview post={post} /> : <MediaGrid media={post.media} />}

      {/* Reaction summary + counts */}
      {(totalReactions > 0 || post.commentCount > 0) && (
        <div className="flex items-center justify-between text-xs text-default-500 mt-3 pt-2 border-t border-default-100">
          <span>{totalReactions > 0 && `${totalReactions} reactions`}</span>
          <span>{post.commentCount > 0 && `${post.commentCount} comments`}</span>
        </div>
      )}

      {/* Action row */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-default-200">
        <div className="flex gap-1">
          {REACTIONS.map((r) => (
            <button
              key={r.key}
              onClick={() => onReact(post._id, r.key)}
              title={r.label}
              className="text-lg hover:scale-125 transition-transform px-1"
            >
              {r.emoji}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onComment(post._id)}
            className="flex items-center gap-1 text-default-500 hover:text-steel-blue text-sm"
          >
            <MessageCircle size={16} />
            Comment
          </button>
          <SharePopover refId={post._id} refType="Post" shareCount={post.shareCount} />
        </div>
      </div>
    </Card>
  );
}
