import { Card, CardBody, Avatar, Button, Link } from "@nextui-org/react";

interface suggestedAuthors {
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
}

const suggestedAuthors: suggestedAuthors[] = [
  {
    name: "Twitter Business",
    username: "@TwitterBusiness",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
  },
  {
    name: "BBC Breaking News",
    username: "@BBCBreaking",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
  },
  {
    name: "Twitter Support",
    username: "@TwitterSupport",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
  },
];

// const

export default function SuggestedAuthor() {
  return (
    <Card className="w-full" radius="none">
      <CardBody className="p-4 text-black/70 ">
        <h2 className="text-base font-bold my-4  ">You might follow</h2>
        {suggestedAuthors.map((account, index) => (
          <div key={index} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Avatar
                // src={
                //   account.name.includes("Twitter") ? (
                //     <Twitter className="text-primary" />
                //   ) : (
                //     account.avatar
                //   )
                // }
                className="mr-2"
              />
              <div>
                <div className="flex items-center text-cyan-800">
                  <span className="font-semibold text-xs">{account.name}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {account.username}
                </span>
              </div>
            </div>
            <Button
              className="text-customBlue w-8 h-6 px-0 border text-xs"
              color="default"
              radius="full"
              size="sm"
              variant="bordered"
            >
              Follow
            </Button>
          </div>
        ))}
        <Link
          className="text-sm text-customBlue underline mx-auto mt-4"
          href="#"
        >
          Show more
        </Link>
      </CardBody>
    </Card>
  );
}
