"use client";
import React from "react";
import { Card, CardHeader, CardFooter, Image } from "@nextui-org/react";
import { CalendarIcon, PenIcon } from "lucide-react";
import Link from "next/link";

import image1 from "@/src/assets/images/24331527_4800_2_09.jpg"; // Example image

const articles = [
  {
    id: 1,
    title: "Essential Tips for Maintaining Aquarium Water Quality",
    author: "Aquatic Experts",
    date: "October 5, 2024",
    category: "Fish Care",
    image: image1,
    featured: true,
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
];

const PremiumArticles = () => {
  return (
    <div className="container mx-auto my-24 py-8  ">
      <h2 className="text-5xl font-semibold mb-16 text-customOrange text-center">
        Premium Articles For your Fish
      </h2>
      <div className="max-w-full gap-4 grid grid-cols-12 grid-rows-2 ">
        {/* First Row: Two Cards */}
        {articles.slice(0, 2).map((article) => (
          <Card
            key={article.id}
            className="col-span-12 sm:col-span-6 h-[300px] relative"
          >
            <Link href={`/articles/${article.id}`}>
              <CardHeader className="absolute z-10 top-0 h-24 flex-col !items-start bg-black/60">
                <p
                  className={`text-xs py-0.5 px-3 mb-2 rounded-full font-semibold text-white uppercase  ${article.category === "Fish Health" ? "bg-customBlue" : "bg-customOrange"} `}
                >
                  {article.category}
                </p>
                <h4 className="text-white font-medium text-large hover:underline">
                  {article.title}
                </h4>
              </CardHeader>
            </Link>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://nextui.org/images/card-example-6.jpeg"
            />
            <CardFooter className="absolute bg-black/60 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <PenIcon className="text-white/80" size={20} />
                <p className="text-tiny text-white/80">{article.author}</p>
              </div>
              <div className="flex gap-2 items-center">
                <CalendarIcon className="text-white/80" size={20} />
                <p className="text-tiny text-white/80">{article.date}</p>
              </div>
            </CardFooter>
          </Card>
        ))}

        {/* Second Row: Three Cards */}
        {articles.slice(2).map((article) => (
          <Card
            key={article.id}
            className="col-span-12 sm:col-span-4 h-[300px] relative"
          >
            <Link href={`/articles/${article.id}`}>
              <CardHeader className="absolute z-10 top-0 h-24 flex-col !items-start bg-black/60">
                <p
                  className={`text-xs py-0.5 px-3 mb-2 rounded-full font-semibold text-white uppercase  ${article.category === "Fish Health" ? "bg-customBlue" : "bg-customOrange"} `}
                >
                  {article.category}
                </p>
                <h4 className="text-white font-medium text-md hover:underline">
                  {article.title}
                </h4>
              </CardHeader>
            </Link>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://nextui.org/images/card-example-6.jpeg"
            />
            <CardFooter className="absolute bg-black/60 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <PenIcon className="text-white/80" size={20} />
                <p className="text-tiny text-white/80">{article.author}</p>
              </div>
              <div className="flex gap-2 items-center">
                <CalendarIcon className="text-white/80" size={20} />
                <p className="text-tiny text-white/80">{article.date}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PremiumArticles;
