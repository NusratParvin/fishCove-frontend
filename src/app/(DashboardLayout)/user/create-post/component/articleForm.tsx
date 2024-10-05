"use client";

import {
  Input,
  Select,
  SelectItem,
  Checkbox,
  Button,
  Card,
  CardBody,
  Spacer,
} from "@nextui-org/react";
import { useForm, FieldValues, Controller } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useCreateArticleMutation } from "@/src/redux/features/articles/articlesApi";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ArticleForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [isPremium, setIsPremium] = useState(false);
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const [createArticle, { isLoading }] = useCreateArticleMutation();

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET as string);

    try {
      setUploading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setValue("images", data.secure_url);
      setUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating article...");

    if (data.price) {
      data.price = Number(data.price);
    }
    const articleData = { ...data, content, images: data.images || null };
    console.log(articleData);
    try {
      const response = await createArticle(articleData).unwrap();
      //   console.log(response);

      if (response?.success) {
        toast.success("Article created successfully!", {
          id: toastId,
          className: "text-green-500",
        });

        router.push("/user/newsfeed");
      }
    } catch (error) {
      toast.error("Failed to create article", {
        id: toastId,
        className: "text-red-500",
      });
    }
  };

  return (
    <Card className="max-w-3xl mx-auto px-4 py-8">
      <CardBody>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 text-black/70"
        >
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <Input
                {...field}
                label="Title"
                placeholder="Enter article title"
                fullWidth
                isInvalid={!!errors.title}
              />
            )}
          />

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <ReactQuill
              value={content}
              onChange={setContent}
              className="h-64 mb-12"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
            />
          </div>

          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select
                {...field}
                label="Category"
                placeholder="Select a category"
                fullWidth
                isInvalid={!!errors.category}
              >
                <SelectItem key="Tip" value="Tip">
                  Tip
                </SelectItem>
                <SelectItem key="Story" value="Story">
                  Story
                </SelectItem>
              </Select>
            )}
          />

          <Input
            type="file"
            accept="image/*"
            label="Upload Image"
            onChange={handleImageUpload}
            fullWidth
            className="text-xs"
          />

          <div className="flex flex-row justify-evenly items-center">
            <Checkbox
              className="w-1/2 mr-auto"
              {...register("isPremium")}
              onChange={(e) => setIsPremium(e.target.checked)}
            >
              <span className="text-black/80 text-sm">
                Is this a premium article?
              </span>
            </Checkbox>

            {isPremium && (
              <Controller
                name="price"
                control={control}
                rules={{ required: "Price is required for premium content" }}
                render={({ field }) => (
                  <Input
                    className="w-1/2"
                    {...field}
                    type="number"
                    label="Price"
                    placeholder="Enter price for the premium article"
                    fullWidth
                    isInvalid={!!errors.price}
                  />
                )}
              />
            )}
          </div>

          <Spacer y={2} />

          <Button type="submit" color="primary" isLoading={isLoading} fullWidth>
            Create Article
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ArticleForm;
