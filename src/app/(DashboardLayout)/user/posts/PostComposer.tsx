"use client";

import { useState, useRef } from "react";
import {
  Card,
  Avatar,
  Textarea,
  Button,
  Select,
  SelectItem,
  Chip,
} from "@heroui/react";
import { ImagePlus, Video, PartyPopper, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
// Swap this for whatever your existing CloudinaryUpload logic exposes —
// this is just the shape the composer needs: give it a file, get back a url+type.
import { useCreatePostMutation } from "@/src/redux/features/posts/postsApi";
import { uploadToCloudinary } from "@/src/components/home/cloudinaryUpload ";

type TMediaDraft = {
  url: string;
  type: "image" | "video";
  uploading?: boolean;
};

const MILESTONE_CATEGORIES = [
  { key: "adoption", label: "🏠 Adoption" },
  { key: "birthday", label: "🎂 Birthday" },
  { key: "vet-visit", label: "🩺 Vet Visit" },
  { key: "health", label: "💊 Health" },
  { key: "other", label: "✨ Other" },
];

export default function PostComposer({
  currentUser,
  pets, // [{ _id, name, profilePhoto }] — the user's own pets, for the "about which pet" selector
}: {
  currentUser: { name: string; profilePhoto?: string };
  pets: { _id: string; name: string; profilePhoto?: string }[];
}) {
  const [expanded, setExpanded] = useState(false);
  const [caption, setCaption] = useState("");
  const [petId, setPetId] = useState<string | undefined>();
  const [media, setMedia] = useState<TMediaDraft[]>([]);
  const [isMilestone, setIsMilestone] = useState(false);
  const [milestoneCategory, setMilestoneCategory] = useState<
    string | undefined
  >();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createPost, { isLoading }] = useCreatePostMutation();

  const canPost = caption.trim().length > 0 || media.length > 0;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    // Enforce single-type media (see earlier note: no mixing images and
    // video in one post — keeps `type` inference on the backend unambiguous)
    const incomingKind = files[0].type.startsWith("video") ? "video" : "image";
    if (media.length > 0 && media[0].type !== incomingKind) {
      toast.error("A post can have photos or a video, not both.");
      return;
    }

    for (const file of files) {
      const draftIndex = media.length;
      setMedia((prev) => [
        ...prev,
        { url: "", type: incomingKind, uploading: true },
      ]);
      try {
        const result = await uploadToCloudinary(file);
        setMedia((prev) =>
          prev.map((m, i) =>
            i === draftIndex ? { url: result.url, type: incomingKind } : m,
          ),
        );
      } catch {
        toast.error("Upload failed, try again.");
        setMedia((prev) => prev.filter((_, i) => i !== draftIndex));
      }
    }
  };

  const removeMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const resetComposer = () => {
    setCaption("");
    setPetId(undefined);
    setMedia([]);
    setIsMilestone(false);
    setMilestoneCategory(undefined);
    setExpanded(false);
  };

  const handlePost = async () => {
    if (media.some((m) => m.uploading)) {
      toast.error("Still uploading — hang on a sec.");
      return;
    }
    try {
      console.log(media);
      await createPost({
        caption: caption.trim() || undefined,
        petId,
        media: media.map(({ url, type }) => ({ url, type })),
        isMilestone,
        milestoneCategory: isMilestone ? milestoneCategory : undefined,
      }).unwrap();
      toast.success("Posted!");
      resetComposer();
    } catch (err) {
      toast.error("Couldn't post — try again.");
      console.log(err);
    }
  };

  return (
    <Card className="rounded-md shadow-sm dark:shadow-primary p-4">
      <div className="flex gap-3">
        <Avatar
          src={currentUser.profilePhoto}
          name={currentUser.name}
          size="md"
        />
        <div className="flex-1">
          <Textarea
            value={caption}
            onValueChange={setCaption}
            onFocus={() => setExpanded(true)}
            placeholder={
              pets?.[0]
                ? `What's ${pets[0].name} up to today?`
                : "What's on your mind?"
            }
            minRows={expanded ? 3 : 1}
            variant="bordered"
            classNames={{ inputWrapper: "rounded-md" }}
          />

          {expanded && (
            <div className="mt-3 space-y-3">
              {/* Media previews */}
              {media.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {media.map((m, i) => (
                    <div
                      key={i}
                      className="relative rounded-md overflow-hidden aspect-square bg-default-100"
                    >
                      {m.uploading ? (
                        <div className="flex h-full items-center justify-center">
                          <Loader2
                            className="animate-spin text-steel-blue"
                            size={20}
                          />
                        </div>
                      ) : m.type === "video" ? (
                        <video
                          src={m.url}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <img
                          src={m.url}
                          className="h-full w-full object-cover"
                          alt=""
                        />
                      )}
                      <button
                        onClick={() => removeMedia(i)}
                        className="absolute top-1 right-1 rounded-full bg-black/60 p-0.5 text-white"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Which pet is this about */}
              {pets?.length > 0 && (
                <Select
                  placeholder="Tag a pet (optional)"
                  size="sm"
                  className="max-w-xs"
                  selectedKeys={petId ? [petId] : []}
                  onSelectionChange={(keys) =>
                    setPetId(Array.from(keys)[0] as string)
                  }
                >
                  {pets.map((p) => (
                    <SelectItem key={p._id}>{p.name}</SelectItem>
                  ))}
                </Select>
              )}

              {/* Milestone toggle — this is the flag, not a post type */}
              <div className="flex items-center gap-2 flex-wrap">
                <Chip
                  variant={isMilestone ? "solid" : "bordered"}
                  color={isMilestone ? "warning" : "default"}
                  onClick={() => setIsMilestone((v) => !v)}
                  startContent={<PartyPopper size={14} />}
                  className="cursor-pointer rounded-md"
                >
                  Mark as milestone
                </Chip>

                {isMilestone && (
                  <Select
                    placeholder="Category"
                    size="sm"
                    className="max-w-[160px]"
                    selectedKeys={milestoneCategory ? [milestoneCategory] : []}
                    onSelectionChange={(keys) =>
                      setMilestoneCategory(Array.from(keys)[0] as string)
                    }
                  >
                    {MILESTONE_CATEGORIES.map((c) => (
                      <SelectItem key={c.key}>{c.label}</SelectItem>
                    ))}
                  </Select>
                )}
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between pt-2 border-t border-default-200">
                <div className="flex gap-1">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => fileInputRef.current?.click()}
                    title="Add photo"
                  >
                    <ImagePlus size={18} className="text-steel-blue" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => fileInputRef.current?.click()}
                    title="Add video"
                  >
                    <Video size={18} className="text-steel-blue" />
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    hidden
                    onChange={handleFileSelect}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="light" size="sm" onPress={resetComposer}>
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="bg-lime-burst text-black rounded-md"
                    isDisabled={!canPost || isLoading}
                    isLoading={isLoading}
                    onPress={handlePost}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
