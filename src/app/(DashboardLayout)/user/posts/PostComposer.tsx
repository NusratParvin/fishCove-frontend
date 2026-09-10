"use client";

import { useState, useRef, useCallback } from "react";
import {
  Card,
  Avatar,
  Textarea,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import {
  ImagePlus,
  Video,
  PartyPopper,
  X,
  Loader2,
  PawPrint,
  Send,
  Check,
  Sparkles,
} from "lucide-react";
import Confetti from "react-confetti";
import { toast } from "sonner";
import { useCreatePostMutation } from "@/src/redux/features/posts/postsApi";
import { uploadToCloudinary } from "@/src/components/home/cloudinaryUpload ";

type TMediaDraft = {
  url: string;
  type: "image" | "video";
  uploading?: boolean;
};

const MAX_IMAGES = 3;

const MILESTONE_CATEGORIES = [
  { key: "adoption", label: "🏠 Adoption" },
  { key: "birthday", label: "🎂 Birthday" },
  { key: "vet-visit", label: "🩺 Vet Visit" },
  { key: "health", label: "💊 Health" },
  { key: "other", label: "✨ Other" },
];

/* ---------- shared pill styling ---------- */
type Tone = "sky" | "violet" | "emerald" | "amber";

const TONES: Record<
  Tone,
  {
    iconIdle: string;
    iconHover: string;
    iconActive: string;
    pillActive: string;
  }
> = {
  sky: {
    iconIdle: "bg-sky-500/12 text-sky-600 dark:bg-sky-400/15 dark:text-sky-400",
    iconHover: "group-hover:bg-sky-500/20 dark:group-hover:bg-sky-400/25",
    iconActive:
      "bg-sky-500/20 text-sky-700 dark:bg-sky-400/25 dark:text-sky-300",
    pillActive:
      "bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300 ring-1 ring-sky-500/40 dark:ring-sky-400/40",
  },
  violet: {
    iconIdle:
      "bg-violet-500/12 text-violet-600 dark:bg-violet-400/15 dark:text-violet-400",
    iconHover: "group-hover:bg-violet-500/20 dark:group-hover:bg-violet-400/25",
    iconActive:
      "bg-violet-500/20 text-violet-700 dark:bg-violet-400/25 dark:text-violet-300",
    pillActive:
      "bg-violet-500/10 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300 ring-1 ring-violet-500/40 dark:ring-violet-400/40",
  },
  emerald: {
    iconIdle:
      "bg-emerald-500/12 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400",
    iconHover:
      "group-hover:bg-emerald-500/20 dark:group-hover:bg-emerald-400/25",
    iconActive:
      "bg-emerald-500/20 text-emerald-700 dark:bg-emerald-400/25 dark:text-emerald-300",
    pillActive:
      "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300 ring-1 ring-emerald-500/40 dark:ring-emerald-400/40",
  },
  amber: {
    iconIdle:
      "bg-amber-400/15 text-amber-600 dark:bg-amber-400/15 dark:text-amber-400",
    iconHover: "group-hover:bg-amber-400/25 dark:group-hover:bg-amber-400/25",
    iconActive:
      "bg-amber-400/25 text-amber-700 dark:bg-amber-400/25 dark:text-amber-300",
    pillActive:
      "bg-amber-400/15 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300 ring-1 ring-amber-400/40 dark:ring-amber-400/40",
  },
};

const PILL_BASE =
  "group flex h-8 w-16 shrink-0 items-center gap-1.5 rounded-full pl-1 pr-1 text-[11px] font-bold transition-all disabled:opacity-30 sm:w-[100px] sm:pr-1";

/* ---------- toolbar pill ---------- */
function ToolPill({
  icon,
  label,
  onClick,
  disabled,
  active,
  tone = "sky",
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  tone?: Tone;
}) {
  const t = TONES[tone];
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={`${PILL_BASE} ${
        active
          ? t.pillActive
          : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
      }`}
    >
      <span
        className={`grid size-6 shrink-0 place-items-center rounded-full transition-colors ${
          active ? t.iconActive : `${t.iconIdle} ${t.iconHover}`
        }`}
      >
        {icon}
      </span>
      <span className="hidden truncate sm:inline">{label}</span>
    </button>
  );
}

export default function PostComposer({
  currentUser,
  pets,
}: {
  currentUser: { name: string; profilePhoto?: string };
  pets: { _id: string; name: string; profilePhoto?: string }[];
}) {
  const [expanded, setExpanded] = useState(false);
  const [caption, setCaption] = useState("");
  const [petId, setPetId] = useState<string | undefined>();
  const [media, setMedia] = useState<TMediaDraft[]>([]);
  const [milestoneCategory, setMilestoneCategory] = useState<
    string | undefined
  >();
  const [petOpen, setPetOpen] = useState(false);
  const [milestoneOpen, setMilestoneOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createPost, { isLoading }] = useCreatePostMutation();

  const canPost = caption.trim().length > 0 || media.length > 0;
  const hasVideo = media.some((m) => m.type === "video");
  const isFull = hasVideo || media.length >= MAX_IMAGES;
  const isUploading = media.some((m) => m.uploading);
  const isMilestone = !!milestoneCategory;
  const selectedPet = pets?.find((p) => p._id === petId);
  const selectedMilestone = MILESTONE_CATEGORIES.find(
    (c) => c.key === milestoneCategory,
  );

  const fireConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3500);
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const incomingKind = files[0].type.startsWith("video") ? "video" : "image";

    if (media.length > 0 && media[0].type !== incomingKind) {
      toast.error("Photos or a video — not both 🐾");
      return;
    }
    if (incomingKind === "video" && files.length > 1) {
      toast.error("One video per post, greedy.");
      return;
    }
    if (incomingKind === "image" && media.length + files.length > MAX_IMAGES) {
      toast.error(`${MAX_IMAGES} photos max.`);
      return;
    }

    const filesToUpload =
      incomingKind === "image"
        ? files.slice(0, MAX_IMAGES - media.length)
        : files.slice(0, 1);

    for (const file of filesToUpload) {
      const draftIndex = media.length + filesToUpload.indexOf(file);
      setMedia((prev) => [
        ...prev,
        { url: "", type: incomingKind, uploading: true },
      ]);
      try {
        const url = await uploadToCloudinary(file);
        setMedia((prev) =>
          prev.map((m, i) =>
            i === draftIndex ? { url, type: incomingKind } : m,
          ),
        );
      } catch {
        toast.error("Upload flopped. Try again?");
        setMedia((prev) => prev.filter((_, i) => i !== draftIndex));
      }
    }
    e.target.value = "";
  };

  const removeMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const resetComposer = () => {
    setCaption("");
    setPetId(undefined);
    setMedia([]);
    setMilestoneCategory(undefined);
    setExpanded(false);
  };

  const handlePost = async () => {
    if (isUploading) {
      toast.error("Still uploading — hang on a sec.");
      return;
    }
    try {
      const payload = {
        caption: caption.trim() || undefined,
        petId,
        media: media.map(({ url, type }) => ({ url, type })),
        isMilestone,
        milestoneCategory,
      };
      await createPost(payload).unwrap();
      toast.success(isMilestone ? "Milestone shared! 🎉" : "Posted! 🐾");
      fireConfetti();
      resetComposer();
    } catch (err) {
      toast.error("Couldn't post — try again.");
      console.log(err);
    }
  };
  const amberTone = TONES.amber;
  const emeraldTone = TONES.emerald;

  return (
    <>
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={350}
          gravity={0.3}
          tweenDuration={4000}
          colors={[
            "#F5D020",
            "#00E5CC",
            "#1E90FF",
            "#FF4D6D",
            "#4682B4",
            "#B8FF2E",
            "#5aab1e",
          ]}
          // colors={[
          //   "#F59E0B",
          //   "#FBBF24",
          //   "#FCD34D",
          //   "#60A5FA",
          //   "#34D399",
          //   "#F472B6",
          //   "#A78BFA",
          // ]}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}
        />
      )}

      <Card
        radius="none"
        shadow="none"
        className={`w-full rounded-sm border-none bg-slate-100 p-2 shadow-md transition-colors dark:bg-zinc-900 ${
          isMilestone
            ? "ring-1 ring-amber-400/40 dark:ring-amber-400/30"
            : "ring-1 ring-transparent"
        }`}
      >
        <div className="flex items-start gap-2.5">
          <Avatar
            src={currentUser?.profilePhoto}
            name={currentUser?.name?.charAt(0)?.toUpperCase() ?? "U"}
            className="h-7 w-7 shrink-0 ring-2 ring-steel-blue/20 dark:ring-lime-burst/20"
          />

          <div className="min-w-0 flex-1">
            <Textarea
              value={caption}
              onValueChange={setCaption}
              onFocus={() => setExpanded(true)}
              placeholder={
                selectedPet
                  ? `Spill the tea on ${selectedPet.name}…… ☕🐾`
                  : "Share a little tail-wagging moment…… 🐾💫"
              }
              minRows={expanded ? 2 : 1}
              maxRows={6}
              variant="flat"
              classNames={{
                inputWrapper:
                  "!min-h-0 !rounded-sm !bg-transparent !px-1 !py-0 !shadow-none !ring-0 !ring-offset-0 !outline-none border-0 " +
                  "data-[hover=true]:!bg-transparent data-[hover=true]:!shadow-none data-[hover=true]:!ring-0 " +
                  "group-data-[focus=true]:!bg-transparent group-data-[focus=true]:!ring-0 group-data-[focus=true]:!outline-none " +
                  "group-data-[focus=true]:!shadow-[0_2px_10px_-2px_rgba(15,23,42,0.10)] " +
                  "dark:group-data-[focus=true]:!shadow-[0_2px_12px_-2px_rgba(0,0,0,0.55)] " +
                  "transition-shadow duration-200",
                input:
                  "p-1  !outline-none !ring-0 focus:!outline-none focus:!ring-0 " +
                  "text-[11px] leading-7 tracking-tight text-zinc-800 dark:text-zinc-100 " +
                  "placeholder:text-zinc-400/90 dark:placeholder:text-zinc-500/90 placeholder:italic",
              }}
            />

            {/* ---------- media previews ---------- */}
            {expanded && media.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2.5">
                {media.map((m, i) => (
                  <div
                    key={i}
                    className="group relative size-16 rounded-md border border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-white/[0.06] sm:size-12"
                  >
                    {m.uploading ? (
                      <div className="flex h-full items-center justify-center">
                        <Loader2
                          className="animate-spin text-sky-500 dark:text-sky-400"
                          size={16}
                        />
                      </div>
                    ) : m.type === "video" ? (
                      <video
                        src={m.url}
                        className="h-full w-full object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={m.url}
                        className="h-full w-full object-cover"
                        alt=""
                      />
                    )}

                    {!m.uploading && (
                      <button
                        type="button"
                        onClick={() => removeMedia(i)}
                        aria-label="Remove"
                        className="absolute -right-1.5 -top-2 grid size-4 place-items-center rounded-full  opacity-100 transition-all  bg-rose-500  z-100"
                      >
                        <X size={11} className="text-white" />
                      </button>
                    )}
                  </div>
                ))}

                {!isFull && media[0]?.type === "image" && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="grid size-16 place-items-center rounded-md border-2 border-dashed border-sky-500/30 text-sky-500 transition-colors hover:border-sky-500/60 dark:border-sky-400/30 dark:text-sky-400 dark:hover:border-sky-400/60 sm:size-12"
                  >
                    <span className="text-[10px] font-bold">
                      +{MAX_IMAGES - media.length}
                    </span>
                  </button>
                )}
              </div>
            )}

            {/* ---------- single toolbar — all four in one fixed-width row ---------- */}
            <div className="mt-1 flex items-center gap-1">
              <ToolPill
                tone="sky"
                icon={<ImagePlus size={13} />}
                label="Photo"
                disabled={isFull}
                onClick={() => {
                  setExpanded(true);
                  fileInputRef.current?.click();
                }}
              />
              <ToolPill
                tone="violet"
                icon={<Video size={13} />}
                label="Video"
                disabled={isFull}
                onClick={() => {
                  setExpanded(true);
                  fileInputRef.current?.click();
                }}
              />

              {/* ---------- Pet popover ---------- */}
              {pets?.length > 0 && (
                <Popover
                  placement="top"
                  showArrow
                  isOpen={petOpen}
                  onOpenChange={setPetOpen}
                  classNames={{
                    base: "rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-0 shadow-xl",
                    content: "p-0",
                  }}
                >
                  <PopoverTrigger>
                    <button
                      type="button"
                      title={selectedPet ? selectedPet.name : "Tag a pet"}
                      aria-label="Tag a pet"
                      className={`${PILL_BASE} ${
                        petId
                          ? emeraldTone.pillActive
                          : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
                      }`}
                    >
                      {selectedPet?.profilePhoto ? (
                        <Avatar
                          src={selectedPet.profilePhoto}
                          name={selectedPet.name.charAt(0).toUpperCase()}
                          className="size-6 shrink-0 ring-1 ring-emerald-500/30 dark:ring-emerald-400/30"
                        />
                      ) : (
                        <span
                          className={`grid size-6 shrink-0 place-items-center rounded-full transition-colors ${
                            petId
                              ? emeraldTone.iconActive
                              : `${emeraldTone.iconIdle} ${emeraldTone.iconHover}`
                          }`}
                        >
                          <PawPrint size={13} />
                        </span>
                      )}
                      <span className="hidden truncate sm:inline">
                        {selectedPet ? selectedPet.name : "Tag"}
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="w-52 p-2">
                      <p className="px-2 pb-1 pt-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600/80 dark:text-emerald-400/80">
                        Who's the star?
                      </p>
                      {pets.map((p) => (
                        <button
                          key={p._id}
                          type="button"
                          onClick={() => {
                            setPetId(p._id === petId ? undefined : p._id);
                            setPetOpen(false);
                          }}
                          className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[12px] font-semibold transition-colors ${
                            petId === p._id
                              ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                              : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/[0.06]"
                          }`}
                        >
                          <Avatar
                            src={p.profilePhoto}
                            name={p.name.charAt(0).toUpperCase()}
                            className="h-6 w-6"
                          />
                          <span className="truncate">{p.name}</span>
                          {petId === p._id && (
                            <Check size={12} className="ml-auto shrink-0" />
                          )}
                        </button>
                      ))}
                      {petId && (
                        <button
                          type="button"
                          onClick={() => {
                            setPetId(undefined);
                            setPetOpen(false);
                          }}
                          className="mt-1 w-full rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}

              {/* ---------- Milestone popover ---------- */}
              <Popover
                placement="top"
                showArrow
                isOpen={milestoneOpen}
                onOpenChange={setMilestoneOpen}
                classNames={{
                  base: "rounded-2xl border border-amber-400/30 bg-white dark:bg-zinc-900 p-0 shadow-xl",
                  content: "p-0",
                }}
              >
                <PopoverTrigger>
                  <button
                    type="button"
                    title={
                      selectedMilestone ? selectedMilestone.label : "Milestone"
                    }
                    aria-label="Milestone"
                    className={`${PILL_BASE} ${
                      isMilestone
                        ? amberTone.pillActive
                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-full transition-colors ${
                        isMilestone
                          ? amberTone.iconActive
                          : `${amberTone.iconIdle} ${amberTone.iconHover}`
                      }`}
                    >
                      <PartyPopper size={13} />
                    </span>
                    <span className="hidden truncate sm:inline">
                      {selectedMilestone
                        ? selectedMilestone.label.replace(/^\S+\s/, "")
                        : "Milestone"}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="w-52 p-2">
                    <div className="flex items-center gap-1.5 px-2 pb-1 pt-1">
                      <Sparkles size={11} className="text-amber-500" />
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        What's the occasion?
                      </p>
                    </div>
                    {MILESTONE_CATEGORIES.map((c) => (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => {
                          setMilestoneCategory(
                            c.key === milestoneCategory ? undefined : c.key,
                          );
                          setMilestoneOpen(false);
                        }}
                        className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[12px] font-semibold transition-colors ${
                          milestoneCategory === c.key
                            ? "bg-amber-400/20 text-amber-700 dark:text-amber-300"
                            : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/[0.06]"
                        }`}
                      >
                        <span>{c.label}</span>
                        {milestoneCategory === c.key && (
                          <Check size={12} className="ml-auto" />
                        )}
                      </button>
                    ))}
                    {milestoneCategory && (
                      <button
                        type="button"
                        onClick={() => {
                          setMilestoneCategory(undefined);
                          setMilestoneOpen(false);
                        }}
                        className="mt-1 w-full rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              <div className="ml-auto flex items-center gap-1">
                {expanded && (
                  <button
                    type="button"
                    onClick={resetComposer}
                    aria-label="Cancel"
                    title="Cancel"
                    className="grid size-8 place-items-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-white/[0.06] dark:hover:text-zinc-200"
                  >
                    <X size={15} />
                  </button>
                )}

                <Button
                  size="sm"
                  isDisabled={!canPost || isLoading || isUploading}
                  isLoading={isLoading}
                  onPress={handlePost}
                  startContent={
                    !isLoading ? (
                      <Send size={12} className="shrink-0" />
                    ) : undefined
                  }
                  className={`h-7 min-w-0 !rounded-full px-3.5 text-[10px] font-extrabold uppercase tracking-wide shadow-sm ${
                    isMilestone
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-900"
                      : "bg-gradient-to-r from-steel-blue to-steel-blue/85 text-white dark:from-lime-burst dark:to-lime-burst/85 dark:text-zinc-900"
                  }`}
                >
                  {isMilestone ? "Celebrate" : "Post"}
                </Button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              hidden
              onChange={handleFileSelect}
            />
          </div>
        </div>
      </Card>
    </>
  );
}
