"use client";
import { Button, useDisclosure } from "@nextui-org/react";

import CreateArticleModal from "./createArticle";

const ModalButton = () => {
  const { isOpen, onOpenChange } = useDisclosure(); // Modal state

  return (
    <>
      {/* Button to open modal */}
      <Button
        className="bg-highlight text-white text-base font-bold rounded-full"
        onPress={onOpenChange} // Use onPress instead of onOpen
      >
        Create Article
      </Button>

      {/* Modal to create an article */}
      <CreateArticleModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default ModalButton;
