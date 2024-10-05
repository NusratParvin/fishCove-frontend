"use client";
import { Button, useDisclosure } from "@nextui-org/react";

import CreateArticleModal from "./createArticle";
import Link from "next/link";

const ModalButton = () => {
  const { isOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Link
        className="bg-highlight text-white text-base font-bold rounded-full text-center py-2"
        href={"/user/create-post"}
      >
        Create Article
      </Link>
      {/* <Button
        className="bg-highlight text-white text-base font-bold rounded-full"
        onPress={onOpenChange} 
      >
        Create Article
      </Button> */}

      <CreateArticleModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default ModalButton;
