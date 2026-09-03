// "use client";

// import { useState, useRef } from "react";
// import {
//   Card,
//   Avatar,
//   Textarea,
//   Button,
//   Select,
//   SelectItem,
//   Chip,
// } from "@heroui/react";
// import { ImagePlus, Video, PartyPopper, X, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// // Swap this for whatever your existing CloudinaryUpload logic exposes —
// // this is just the shape the composer needs: give it a file, get back a url+type.
// import { useCreatePostMutation } from "@/src/redux/features/posts/postsApi";
// import { uploadToCloudinary } from "@/src/components/home/cloudinaryUpload ";

// type TMediaDraft = {
//   url: string;
//   type: "image" | "video";
//   uploading?: boolean;
// };

// const MILESTONE_CATEGORIES = [
//   { key: "adoption", label: "🏠 Adoption" },
//   { key: "birthday", label: "🎂 Birthday" },
//   { key: "vet-visit", label: "🩺 Vet Visit" },
//   { key: "health", label: "💊 Health" },
//   { key: "other", label: "✨ Other" },
// ];

// export default function PostComposer({
//   currentUser,
//   pets, // [{ _id, name, profilePhoto }] — the user's own pets, for the "about which pet" selector
// }: {
//   currentUser: { name: string; profilePhoto?: string };
//   pets: { _id: string; name: string; profilePhoto?: string }[];
// }) {
//   const [expanded, setExpanded] = useState(false);
//   const [caption, setCaption] = useState("");
//   const [petId, setPetId] = useState<string | undefined>();
//   const [media, setMedia] = useState<TMediaDraft[]>([]);
//   const [isMilestone, setIsMilestone] = useState(false);
//   const [milestoneCategory, setMilestoneCategory] = useState<
//     string | undefined
//   >();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const [createPost, { isLoading }] = useCreatePostMutation();

//   const canPost = caption.trim().length > 0 || media.length > 0;

//   const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files ?? []);
//     if (files.length === 0) return;

//     // Enforce single-type media (see earlier note: no mixing images and
//     // video in one post — keeps `type` inference on the backend unambiguous)
//     const incomingKind = files[0].type.startsWith("video") ? "video" : "image";
//     if (media.length > 0 && media[0].type !== incomingKind) {
//       toast.error("A post can have photos or a video, not both.");
//       return;
//     }

//     for (const file of files) {
//       const draftIndex = media.length;
//       setMedia((prev) => [
//         ...prev,
//         { url: "", type: incomingKind, uploading: true },
//       ]);
//       try {
//         const result = await uploadToCloudinary(file);
//         setMedia((prev) =>
//           prev.map((m, i) =>
//             i === draftIndex ? { url: result.url, type: incomingKind } : m,
//           ),
//         );
//       } catch {
//         toast.error("Upload failed, try again.");
//         setMedia((prev) => prev.filter((_, i) => i !== draftIndex));
//       }
//     }
//   };

//   const removeMedia = (index: number) => {
//     setMedia((prev) => prev.filter((_, i) => i !== index));
//   };

//   const resetComposer = () => {
//     setCaption("");
//     setPetId(undefined);
//     setMedia([]);
//     setIsMilestone(false);
//     setMilestoneCategory(undefined);
//     setExpanded(false);
//   };

//   const handlePost = async () => {
//     if (media.some((m) => m.uploading)) {
//       toast.error("Still uploading — hang on a sec.");
//       return;
//     }
//     try {
//       console.log(media);
//       await createPost({
//         caption: caption.trim() || undefined,
//         petId,
//         media: media.map(({ url, type }) => ({ url, type })),
//         isMilestone,
//         milestoneCategory: isMilestone ? milestoneCategory : undefined,
//       }).unwrap();
//       toast.success("Posted!");
//       resetComposer();
//     } catch (err) {
//       toast.error("Couldn't post — try again.");
//       console.log(err);
//     }
//   };

//   return (
//     <Card className="rounded-md shadow-sm dark:shadow-primary p-4">
//       <div className="flex gap-3">
//         <Avatar
//           src={currentUser.profilePhoto}
//           name={currentUser.name}
//           size="md"
//         />
//         <div className="flex-1">
//           <Textarea
//             value={caption}
//             onValueChange={setCaption}
//             onFocus={() => setExpanded(true)}
//             placeholder={
//               pets?.[0]
//                 ? `What's ${pets[0].name} up to today?`
//                 : "What's on your mind?"
//             }
//             minRows={expanded ? 3 : 1}
//             variant="bordered"
//             classNames={{ inputWrapper: "rounded-md" }}
//           />

//           {expanded && (
//             <div className="mt-3 space-y-3">
//               {/* Media previews */}
//               {media.length > 0 && (
//                 <div className="grid grid-cols-3 gap-2">
//                   {media.map((m, i) => (
//                     <div
//                       key={i}
//                       className="relative rounded-md overflow-hidden aspect-square bg-default-100"
//                     >
//                       {m.uploading ? (
//                         <div className="flex h-full items-center justify-center">
//                           <Loader2
//                             className="animate-spin text-steel-blue"
//                             size={20}
//                           />
//                         </div>
//                       ) : m.type === "video" ? (
//                         <video
//                           src={m.url}
//                           className="h-full w-full object-cover"
//                         />
//                       ) : (
//                         <img
//                           src={m.url}
//                           className="h-full w-full object-cover"
//                           alt=""
//                         />
//                       )}
//                       <button
//                         onClick={() => removeMedia(i)}
//                         className="absolute top-1 right-1 rounded-full bg-black/60 p-0.5 text-white"
//                       >
//                         <X size={12} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Which pet is this about */}
//               {pets?.length > 0 && (
//                 <Select
//                   placeholder="Tag a pet (optional)"
//                   size="sm"
//                   className="max-w-xs"
//                   selectedKeys={petId ? [petId] : []}
//                   onSelectionChange={(keys) =>
//                     setPetId(Array.from(keys)[0] as string)
//                   }
//                 >
//                   {pets.map((p) => (
//                     <SelectItem key={p._id}>{p.name}</SelectItem>
//                   ))}
//                 </Select>
//               )}

//               {/* Milestone toggle — this is the flag, not a post type */}
//               <div className="flex items-center gap-2 flex-wrap">
//                 <Chip
//                   variant={isMilestone ? "solid" : "bordered"}
//                   color={isMilestone ? "warning" : "default"}
//                   onClick={() => setIsMilestone((v) => !v)}
//                   startContent={<PartyPopper size={14} />}
//                   className="cursor-pointer rounded-md"
//                 >
//                   Mark as milestone
//                 </Chip>

//                 {isMilestone && (
//                   <Select
//                     placeholder="Category"
//                     size="sm"
//                     className="max-w-[160px]"
//                     selectedKeys={milestoneCategory ? [milestoneCategory] : []}
//                     onSelectionChange={(keys) =>
//                       setMilestoneCategory(Array.from(keys)[0] as string)
//                     }
//                   >
//                     {MILESTONE_CATEGORIES.map((c) => (
//                       <SelectItem key={c.key}>{c.label}</SelectItem>
//                     ))}
//                   </Select>
//                 )}
//               </div>

//               {/* Action row */}
//               <div className="flex items-center justify-between pt-2 border-t border-default-200">
//                 <div className="flex gap-1">
//                   <Button
//                     isIconOnly
//                     variant="light"
//                     size="sm"
//                     onPress={() => fileInputRef.current?.click()}
//                     title="Add photo"
//                   >
//                     <ImagePlus size={18} className="text-steel-blue" />
//                   </Button>
//                   <Button
//                     isIconOnly
//                     variant="light"
//                     size="sm"
//                     onPress={() => fileInputRef.current?.click()}
//                     title="Add video"
//                   >
//                     <Video size={18} className="text-steel-blue" />
//                   </Button>
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*,video/*"
//                     multiple
//                     hidden
//                     onChange={handleFileSelect}
//                   />
//                 </div>

//                 <div className="flex gap-2">
//                   <Button variant="light" size="sm" onPress={resetComposer}>
//                     Cancel
//                   </Button>
//                   <Button
//                     size="sm"
//                     className="bg-lime-burst text-black rounded-md"
//                     isDisabled={!canPost || isLoading}
//                     isLoading={isLoading}
//                     onPress={handlePost}
//                   >
//                     Post
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// }

// second one

// "use client";

// import { useState } from "react";
// import {
//   Card,
//   Avatar,
//   Textarea,
//   Button,
//   Select,
//   SelectItem,
//   Chip,
// } from "@heroui/react";
// import { PartyPopper, X } from "lucide-react";
// import { toast } from "sonner";
// import { useCreatePostMutation } from "@/src/redux/features/posts/postsApi";
// import { CloudinaryUpload } from "@/src/components/home/cloudinaryUpload ";

// const MILESTONE_CATEGORIES = [
//   { key: "adoption", label: "🏠 Adoption" },
//   { key: "birthday", label: "🎂 Birthday" },
//   { key: "vet-visit", label: "🩺 Vet Visit" },
//   { key: "health", label: "💊 Health" },
//   { key: "other", label: "✨ Other" },
// ];

// export default function PostComposer({
//   currentUser,
//   pets,
// }: {
//   currentUser: { name: string; profilePhoto?: string };
//   pets: { _id: string; name: string; profilePhoto?: string }[];
// }) {
//   const [expanded, setExpanded] = useState(false);
//   const [caption, setCaption] = useState("");
//   const [petId, setPetId] = useState<string | undefined>();
//   const [mediaUrls, setMediaUrls] = useState<string[]>([]); // Store just URLs
//   const [isMilestone, setIsMilestone] = useState(false);
//   const [milestoneCategory, setMilestoneCategory] = useState<
//     string | undefined
//   >();

//   const [createPost, { isLoading }] = useCreatePostMutation();

//   const canPost = caption.trim().length > 0 || mediaUrls.length > 0;

//   const resetComposer = () => {
//     setCaption("");
//     setPetId(undefined);
//     setMediaUrls([]);
//     setIsMilestone(false);
//     setMilestoneCategory(undefined);
//     setExpanded(false);
//   };

//   const handlePost = async () => {
//     if (isMilestone && !milestoneCategory) {
//       toast.error("Select a milestone category");
//       return;
//     }

//     try {
//       // Convert URLs to the format backend expects
//       const media = mediaUrls.map((url) => {
//         // Check if it's a video by URL extension
//         const isVideo = url.match(/\.(mp4|webm|mov|avi|wmv|flv|mkv)/i);
//         return {
//           url,
//           type: isVideo ? "video" : ("image" as "image" | "video"),
//         };
//       });

//       await createPost({
//         caption: caption.trim() || undefined,
//         petId: petId || undefined,
//         media,
//         isMilestone,
//         milestoneCategory: isMilestone ? milestoneCategory : undefined,
//       }).unwrap();

//       toast.success("Posted! 🎉");
//       resetComposer();
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to post");
//     }
//   };

//   return (
//     <Card className="rounded-md shadow-sm p-4">
//       <div className="flex gap-3">
//         <Avatar
//           src={currentUser.profilePhoto}
//           name={currentUser.name}
//           size="md"
//         />
//         <div className="flex-1">
//           <Textarea
//             value={caption}
//             onValueChange={setCaption}
//             onFocus={() => setExpanded(true)}
//             placeholder={
//               pets?.[0]
//                 ? `What's ${pets[0].name} up to?`
//                 : "What's on your mind?"
//             }
//             minRows={expanded ? 3 : 1}
//             variant="bordered"
//           />

//           {expanded && (
//             <div className="mt-3 space-y-3">
//               {/* Use CloudinaryUpload directly with string[] */}
//               <CloudinaryUpload
//                 value={mediaUrls}
//                 onChange={(val) => setMediaUrls(val as string[])}
//                 mode="multiple"
//                 maxImages={5}
//                 label="Add Photos or Videos"
//                 hint="Upload up to 5 images or videos"
//               />

//               {/* Pet selector */}
//               {pets?.length > 0 && (
//                 <Select
//                   placeholder="Tag a pet (optional)"
//                   size="sm"
//                   className="max-w-xs"
//                   selectedKeys={petId ? [petId] : []}
//                   onSelectionChange={(keys) =>
//                     setPetId(Array.from(keys)[0] as string)
//                   }
//                 >
//                   {pets.map((p) => (
//                     <SelectItem key={p._id}>{p.name}</SelectItem>
//                   ))}
//                 </Select>
//               )}

//               {/* Milestone toggle */}
//               <div className="flex items-center gap-2 flex-wrap">
//                 <Chip
//                   variant={isMilestone ? "solid" : "bordered"}
//                   color={isMilestone ? "warning" : "default"}
//                   onClick={() => setIsMilestone(!isMilestone)}
//                   startContent={<PartyPopper size={14} />}
//                   className="cursor-pointer rounded-md"
//                 >
//                   {isMilestone ? "✨ Milestone" : "Mark as milestone"}
//                 </Chip>

//                 {isMilestone && (
//                   <Select
//                     placeholder="Category"
//                     size="sm"
//                     className="max-w-[160px]"
//                     selectedKeys={milestoneCategory ? [milestoneCategory] : []}
//                     onSelectionChange={(keys) =>
//                       setMilestoneCategory(Array.from(keys)[0] as string)
//                     }
//                   >
//                     {MILESTONE_CATEGORIES.map((c) => (
//                       <SelectItem key={c.key}>{c.label}</SelectItem>
//                     ))}
//                   </Select>
//                 )}
//               </div>

//               {/* Actions */}
//               <div className="flex items-center justify-between pt-2 border-t">
//                 <div className="flex-1" />
//                 <div className="flex gap-2">
//                   <Button variant="light" size="sm" onPress={resetComposer}>
//                     Cancel
//                   </Button>
//                   <Button
//                     size="sm"
//                     className="bg-lime-burst text-black rounded-md"
//                     isDisabled={!canPost || isLoading}
//                     isLoading={isLoading}
//                     onPress={handlePost}
//                   >
//                     {isMilestone ? "Share 🎉" : "Post"}
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// }

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
import {
  ImagePlus,
  Video,
  PartyPopper,
  X,
  Loader2,
  Upload,
} from "lucide-react";
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
  const [isMilestone, setIsMilestone] = useState(false);
  const [milestoneCategory, setMilestoneCategory] = useState<
    string | undefined
  >();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createPost, { isLoading }] = useCreatePostMutation();

  const canPost = caption.trim().length > 0 || media.length > 0;
  const hasVideo = media.some((m) => m.type === "video");
  const isFull = hasVideo || media.length >= MAX_IMAGES;

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const incomingKind = files[0].type.startsWith("video") ? "video" : "image";

    if (media.length > 0 && media[0].type !== incomingKind) {
      toast.error("A post can have photos or a video, not both.");
      return;
    }
    if (incomingKind === "video" && files.length > 1) {
      toast.error("Only one video per post.");
      return;
    }
    if (incomingKind === "image" && media.length + files.length > MAX_IMAGES) {
      toast.error(`You can add up to ${MAX_IMAGES} photos.`);
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
      const payload = {
        caption: caption.trim() || undefined,
        petId,
        media: media.map(({ url, type }) => ({ url, type })),
        isMilestone,
        milestoneCategory: isMilestone ? milestoneCategory : undefined,
      };
      console.log(payload);
      await createPost(payload).unwrap();
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
              {/* Media preview grid — fixed square tiles, FB/LinkedIn style */}
              {media.length > 0 && (
                <div
                  className={`grid gap-2 ${
                    media.length === 1 ? "grid-cols-1" : "grid-cols-3"
                  }`}
                >
                  {media.map((m, i) => (
                    <div
                      key={i}
                      className="relative group rounded-lg overflow-hidden border border-default-200 dark:border-white/10 aspect-square bg-default-100"
                    >
                      {m.uploading ? (
                        <div className="flex h-full items-center justify-center">
                          <Loader2
                            className="animate-spin text-steel-blue"
                            size={22}
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
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 hover:bg-rose-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                        >
                          <X size={12} className="text-white" />
                        </button>
                      )}

                      {!m.uploading && (
                        <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold bg-black/50 text-white px-1.5 py-0.5 rounded">
                          Uploaded
                        </span>
                      )}
                    </div>
                  ))}

                  {/* "Add more" tile — only shown while photos aren't full and no video yet */}
                  {!isFull && media[0]?.type === "image" && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-lg border-2 border-dashed border-steel-blue/30 dark:border-lime-burst/30 hover:border-steel-blue/60 dark:hover:border-lime-burst/60 flex flex-col items-center justify-center gap-1 text-steel-blue dark:text-lime-burst transition-all duration-200"
                    >
                      <Upload size={16} />
                      <span className="text-[10px] font-semibold">
                        Add more ({media.length}/{MAX_IMAGES})
                      </span>
                    </button>
                  )}
                </div>
              )}

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

              <div className="flex items-center justify-between pt-2 border-t border-default-200">
                <div className="flex gap-1">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    isDisabled={isFull}
                    onPress={() => fileInputRef.current?.click()}
                    title={
                      isFull
                        ? `Max ${MAX_IMAGES} photos or 1 video`
                        : "Add photo"
                    }
                  >
                    <ImagePlus size={18} className="text-steel-blue" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    isDisabled={isFull}
                    onPress={() => fileInputRef.current?.click()}
                    title={isFull ? "Media limit reached" : "Add video"}
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
