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
        <div className="relative h-64 w-full">
          <Image
            fill
            alt="Article background"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            src={article?.images || fallbackImage}
          />
          {/* Category Badge */}
          <div
            className={`absolute top-2 right-2 bg-opacity-95 px-4 py-1.5 text-sm text-white rounded-full 
            ${article.category === "Tip" ? "bg-customBlue" : "bg-customOrange"}`}
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
          <p
            dangerouslySetInnerHTML={{
              __html:
                article.content?.length > 100
                  ? `${article.content.substring(0, 200)}...`
                  : article.content,
            }}
            className="text-gray-500 text-sm mt-1"
          />
        </div>
      </Link>

      <div className="flex justify-between items-center p-4 bg-white/30">
        <div className="flex items-center">
          <PenIcon className="text-gray-700" size={16} />
          <span className="ml-1 text-xs text-gray-700">
            {article.authorId.name || "Unknown"}
          </span>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="text-gray-700" size={16} />
          <span className="ml-1 text-xs text-gray-700">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
