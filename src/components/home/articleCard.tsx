"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, PenIcon } from "lucide-react";

const ArticleCard = ({ article }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg flex flex-col bg-white bg-opacity-20">
      <Link href={`/articles/${article.id}`}>
        <div className="relative">
          <Image
            alt="Article background"
            className="w-full object-cover"
            height={300}
            layout="responsive"
            src={article.image}
            width={500}
          />

          <div className="absolute bottom-0 right-0 left-0 bg-gray-900 opacity-25" />
          <div
            className={`absolute top-2 right-2 bg-opacity-95 px-3 py-1 text-xs text-white rounded-full ${article.category === "Fish Health" ? "bg-customBlue" : "bg-customOrange"}`}
          >
            {article.category}
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-bold text-lg underline">{article.title}</h4>
          <p className="text-gray-500 text-sm mt-1">{article.description}</p>
        </div>
      </Link>
      <div className="flex justify-between items-center p-4 bg-white/30">
        <div className="flex items-center">
          <PenIcon className="text-gray-700" size={16} />
          <span className="ml-1 text-xs text-gray-700">{article.author}</span>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="text-gray-700" size={16} />
          <span className="ml-1 text-xs text-gray-700">{article.date}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
