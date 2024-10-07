"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, PenIcon, BadgeDollarSign } from "lucide-react";

import { TArticle } from "@/src/types";

const ArticleCard = ({ article }: { article: TArticle }) => {
  const fallbackImage = "/src/assets/images/clown.jpg";

  return (
    <div className="rounded overflow-hidden shadow-lg flex flex-col bg-white bg-opacity-20">
      <Link href={`/articles/${article._id}`}>
        <div className="relative">
          <Image
            alt="Article background"
            className="w-full object-cover"
            height={300}
            layout="responsive"
            src={article?.images || fallbackImage}
            width={500}
          />

          {/* Category Badge */}
          <div
            className="absolute top-2 right-2 bg-opacity-95 px-3 py-1 text-xs text-white rounded-full 
            {article.category === 'Fish Health' ? 'bg-customBlue' : 'bg-customOrange'}"
          >
            {article.category}
          </div>

          {/* Premium Badge */}
          {article.isPremium && (
            <div className="absolute bottom-2 right-2 bg-yellow-500 text-xs text-white px-2 py-1 rounded-full">
              <BadgeDollarSign size={12} /> Premium ${article.price}
            </div>
          )}
        </div>

        <div className="p-4">
          <h4 className="font-bold text-lg underline">{article.title}</h4>
          <p className="text-gray-500 text-sm mt-1">
            {/* Shortened content as a description */}
            {article.content.length > 100
              ? `${article.content.substring(0, 100)}...`
              : article.content}
          </p>
        </div>
      </Link>

      <div className="flex justify-between items-center p-4 bg-white/30">
        <div className="flex items-center">
          <PenIcon className="text-gray-700" size={16} />
          {/* Assuming `article.authorId.name` holds the author name */}
          <span className="ml-1 text-xs text-gray-700">
            {article.authorId.name || "Unknown"}
          </span>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="text-gray-700" size={16} />
          <span className="ml-1 text-xs text-gray-700">
            {/* Format createdAt to a readable date */}
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
