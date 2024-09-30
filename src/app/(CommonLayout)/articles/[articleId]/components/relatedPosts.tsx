"use client"; // Ensure this component can use hooks

import Link from "next/link";
import Image from "next/image";

const relatedPosts = [
  {
    id: 1,
    title: "The Importance of Pet Insurance",
    author: "Jane Doe",
    date: "September 1, 2024",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "The Ultimate Puppy Adoption Guide",
    author: "John Smith",
    date: "September 15, 2024",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "A Complete Guide to Registering Your Pet's...",
    author: "Alice Johnson",
    date: "September 20, 2024",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "ByteTag: The Safest Pet Tag Ever Made",
    author: "Robert Brown",
    date: "September 25, 2024",
    image: "https://via.placeholder.com/150",
  },
];

const RelatedPosts = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-base font-semibold mb-4">Popular Articles</h2>
      <ul className="space-y-4">
        {relatedPosts.map((post) => (
          <li key={post.id} className="flex items-start space-x-4">
            <Link href={`/articles/${post.id}`}>
              <Image
                alt={post.title}
                className="h-12 w-24"
                height={10}
                src={post.image}
                width={10}
              />
            </Link>
            <div>
              <Link href={`/articles/${post.id}`}>
                <h3 className="text-sm font-medium hover:text-highlight">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-500 text-xs">
                {post.author} - {post.date}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedPosts;
