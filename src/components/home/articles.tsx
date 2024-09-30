"use client";
import React from "react";
import Link from "next/link";

import ArticleCard from "./articleCard";

import image1 from "@/src/assets/images/24331527_4800_2_09.jpg"; // Example image

const articles = [
  {
    id: 1,
    title: "Essential Tips for Maintaining Aquarium Water Quality",
    author: "Aquatic Experts",
    date: "October 5, 2024",
    category: "Fish Care",
    image: image1,
  },
  {
    id: 2,
    title: "Understanding Betta Fish Behavior and Needs",
    author: "PetPlace Staff",
    date: "October 12, 2024",
    category: "Fish Health",
    image: image1,
  },
  {
    id: 3,
    title: "Recognizing Signs of Stress in Aquarium Fish",
    author: "Bennett Glace",
    date: "October 14, 2024",
    category: "Fish Health",
    image: image1,
  },
  {
    id: 4,
    title: "The Importance of Regular Tank Maintenance",
    author: "Richard Rowlands",
    date: "October 18, 2024",
    category: "Fish Care",
    image: image1,
  },
  {
    id: 5,
    title: "Feeding Your Fish: What You Need to Know",
    author: "Aquatic Nutritionists",
    date: "October 20, 2024",
    category: "Fish Nutrition",
    image: image1,
  },
  {
    id: 6,
    title: "Creating a Balanced Aquarium Diet",
    author: "Dr. John Doe",
    date: "October 22, 2024",
    category: "Fish Nutrition",
    image: image1,
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
          <ArticleCard key={article.id} article={article} />
          // <Card key={article.id} className="py-4 text-black">
          //   <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          //     <p
          //       className={`text-tiny font-semibold px-4 py-1.5 rounded-full text-black/70 ${
          //         article.category === "Fish Health"
          //           ? "bg-customBlue"
          //           : "bg-customOrange"
          //       }`}
          //     >
          //       {article.category}
          //     </p>
          //     <Link
          //       href={`/articles/${article.id}`}
          //       className="font-semibold text-medium underline mt-3"
          //     >
          //       {article.title}
          //     </Link>
          //   </CardHeader>
          //   <CardBody className="overflow-visible h-56 py-2">
          //     <Image
          //       alt="Card background"
          //       className="object-cover h-full"
          //       src={article.image}
          //       width={270}
          //     />
          //   </CardBody>

          //   <CardFooter className="absolute bg-white/50 bottom-0 border-t-1 border-zinc-100/50 z-10">
          //     <div className="flex justify-between items-center text-black w-full">
          //       <div className="flex items-center gap-2">
          //         <PenIcon size={16} />
          //         <small>{article.author}</small>
          //       </div>
          //       <div className="flex items-center gap-2">
          //         <CalendarIcon size={16} />
          //         <small>{article.date}</small>
          //       </div>
          //     </div>
          //   </CardFooter>
          // </Card>
        ))}
      </div>
    </div>
  );
};

export default Articles;
