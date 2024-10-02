"use client";
import { useState } from "react";
import Image from "next/image"; // Import Image from Next.js
import NextLink from "next/link";
import { Skeleton } from "@nextui-org/react"; // Import Skeleton from NextUI

import Filters from "./components/filters";

const articles = [
  {
    id: 1,
    title: "The Importance of Clean Water",
    date: "April 5, 2024",
    image:
      "https://images.unsplash.com/photo-1542979506-f6e0e9c8b5e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE4fHxmaXNoJTIwY2FyaXxlbnwwfHx8fDE2NzY5MTI3NTg&ixlib=rb-1.2.1&q=80&w=400",
    description:
      "Learn how clean water impacts your fish's health and overall well-being.",
    category: "Fish Care",
    author: "John Doe",
  },
  // Add more articles as needed
];

const categories = ["Fish Care", "Fish Health", "Aquarium Maintenance"];
const authors = ["John Doe", "Jane Smith", "Mike Johnson"];

export default function BlogPage() {
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [loading, setLoading] = useState(false);

  const handleFilter = (
    searchTerm: string,
    selectedCategory: string,
    selectedAuthor: string,
  ) => {
    setLoading(true);
    let filtered = articles;

    if (typeof searchTerm === "string" && searchTerm.trim() !== "") {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory,
      );
    }
    if (selectedAuthor) {
      filtered = filtered.filter(
        (article) => article.author === selectedAuthor,
      );
    }

    setFilteredArticles(filtered);
    setLoading(false); // Set loading to false after filtering
  };

  return (
    <section className="bg-white py-6 sm:py-8 lg:py-12 md:w-10/12 w-full mx-auto mb-36 mt-16">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        {/* Filters */}
        <Filters
          authors={authors}
          categories={categories}
          onFilter={handleFilter} // Call onFilter directly on input change
        />

        {/* Article Listing */}
        <div className="grid gap-8 sm:grid-cols-1 sm:gap-12 lg:grid-cols-2 xl:gap-16">
          {loading ? (
            // Show skeleton while loading
            [...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-56 w-full rounded-lg" />
            ))
          ) : filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <article
                key={article.id}
                className="flex flex-col items-center gap-4 md:flex-row lg:gap-6"
              >
                <NextLink passHref href={`/articles/${article.id}`}>
                  <div className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
                    <Image
                      alt={article.title}
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                      layout="fill" // Use layout="fill" for absolute positioning
                      loading="lazy"
                      src={article.image}
                    />
                  </div>
                </NextLink>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-400">{article.date}</span>
                  <h2 className="text-xl font-bold text-gray-800">
                    <NextLink passHref href={`/articles/${article.id}`}>
                      <span className="transition duration-100 hover:text-rose-500 active:text-rose-600">
                        {article.title}
                      </span>
                    </NextLink>
                  </h2>
                  <p className="text-gray-500">{article.description}</p>
                  <div>
                    <NextLink passHref href={`/articles/${article.id}`}>
                      <span className="font-semibold text-rose-500 transition duration-100 hover:text-rose-600 active:text-rose-700">
                        Read more
                      </span>
                    </NextLink>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-8">
              <p>No articles found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
