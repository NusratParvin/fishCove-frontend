"use client";
import React from "react";
import Link from "next/link";

import ArticleCard from "./articleCard";

import image1 from "@/src/assets/images/24331527_4800_2_09.jpg"; // Example image

// Mock data structured similarly to your MongoDB schema
const articles = [
  {
    _id: "67015d61328dbbe36241d893",
    title: "Essential Tips for Maintaining Aquarium Water Quality",
    authorId: { name: "Aquatic Experts" }, // Adjusted to match MongoDB structure
    createdAt: "2024-10-05T15:38:09.246Z", // Simulating MongoDB date format
    category: "Fish Care",
    images: image1,
  },
  {
    _id: "67015d61328dbbe36241d894",
    title: "Understanding Betta Fish Behavior and Needs",
    authorId: { name: "PetPlace Staff" },
    createdAt: "2024-10-12T15:38:09.246Z",
    category: "Fish Health",
    images: image1,
  },
  {
    _id: "67015d61328dbbe36241d895",
    title: "Recognizing Signs of Stress in Aquarium Fish",
    authorId: { name: "Bennett Glace" },
    createdAt: "2024-10-14T15:38:09.246Z",
    category: "Fish Health",
    images: image1,
  },
  {
    _id: "67015d61328dbbe36241d896",
    title: "The Importance of Regular Tank Maintenance",
    authorId: { name: "Richard Rowlands" },
    createdAt: "2024-10-18T15:38:09.246Z",
    category: "Fish Care",
    images: image1,
  },
  {
    _id: "67015d61328dbbe36241d897",
    title: "Feeding Your Fish: What You Need to Know",
    authorId: { name: "Aquatic Nutritionists" },
    createdAt: "2024-10-20T15:38:09.246Z",
    category: "Fish Nutrition",
    images: image1,
  },
  {
    _id: "67015d61328dbbe36241d898",
    title: "Creating a Balanced Aquarium Diet",
    authorId: { name: "Dr. John Doe" },
    createdAt: "2024-10-22T15:38:09.246Z",
    category: "Fish Nutrition",
    images: image1,
  },
];

const Articles = () => {
  return (
    <div className="container mx-auto mb-40 mt-16 py-8">
      <div className="border-b mb-12 flex justify-between text-sm ">
        <div className="text-customOrange flex items-center pb-2 pr-2 border-b border-customOrange  ">
          <Link className="font-semibold inline-block text-4xl" href="#">
            Articles on Fish Care and Health
          </Link>
        </div>
        <Link href="#">See All</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Articles;
