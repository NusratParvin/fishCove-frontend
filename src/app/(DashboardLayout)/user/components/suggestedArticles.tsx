import React from "react";
import { Card, CardBody, Image, Link } from "@nextui-org/react";

interface NewsItem {
  category: string;
  timestamp: string;
  title: string;
  source?: string;
  imageUrl: string;
}

const newsItems: NewsItem[] = [
  {
    category: "Olympics",
    timestamp: "Yesterday",
    title: "Tokyo unveils aquatics facility built for the Olympics",
    imageUrl: "/placeholder.svg?height=60&width=60",
  },
  {
    category: "Bloomberg Opinion",
    timestamp: "Last night",
    title: "Will a glitter ban save the oceans?",
    source: "Bloomberg Opinion",
    imageUrl: "/placeholder.svg?height=60&width=60",
  },
  {
    category: "Entertainment",
    timestamp: "October 23, 2020",
    title: "Drew Barrymore brought back her iconic 'Scream' character",
    source: "etalk",
    imageUrl: "/placeholder.svg?height=60&width=60",
  },
  {
    category: "Movies",
    timestamp: "October 23, 2020",
    title:
      "Covid hammered Hollywood. But one film critic finds a glimmer of hope.",
    source: "LAT Enter...",
    imageUrl: "/placeholder.svg?height=60&width=60",
  },
  {
    category: "US elections",
    timestamp: "LIVE",
    title: "California: Election news and updates",
    imageUrl: "/placeholder.svg?height=60&width=60",
  },
];

export default function SuggestedArticles() {
  return (
    <Card className="w-full" radius="none">
      <CardBody className="p-4 ms-1 mt-3 text-black/70 text-base">
        <h2 className=" font-bold mb-4">New articles to read</h2>
        {newsItems.slice(0, 4).map((item, index) => (
          <div key={index} className="flex items-start mb-4">
            <div className="flex-grow">
              <div className="flex items-center text-xs text-gray-500">
                <span>{item.category}</span>
                <span className="mx-2">·</span>
                <span>{item.timestamp}</span>
              </div>
              <p className="font-semibold text-xs mt-1 underline hover:text-customBlue cursor-pointer">
                {item.title}
              </p>
              {item.source && (
                <p className="text-xs text-gray-500 mt-1">{item.source}</p>
              )}
            </div>
            <Image
              alt={item.title}
              className="w-16 h-16 rounded-xl ml-3"
              src={item.imageUrl}
            />
          </div>
        ))}
        <Link className="text-sm text-primary" href="#">
          Show more
        </Link>
      </CardBody>
    </Card>
  );
}
