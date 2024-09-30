"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import RelatedPosts from "./components/relatedPosts";
import AuthorBio from "./components/authorBio";

import image from "@/src/assets/images/StockCake-Cosmic Koi Dance_1727673723.jpg";

const Page = () => {
  return (
    <div className="mt-0 mb-36">
      <div className="w-full mx-auto relative">
        <Image
          alt="Aquarium"
          className="w-full object-cover "
          height={1200}
          src={image}
          style={{ height: "30em" }}
          width={2100}
        />

        <div className="pt-8 lg:px-0 w-full md:w-10/12 mx-auto ">
          <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
            Essential Tips for Maintaining Your Aquarium Fish
          </h2>
          <Link
            className="py-2 text-green-700 inline-flex items-center justify-center mb-2"
            href="#"
          >
            Fish Care
          </Link>
        </div>
      </div>

      <div className="flex flex-row  lg:flex-row lg:space-x-12 w-full md:w-10/12 mx-auto ">
        <div className="px-4 lg:px-0  text-gray-700 text-base leading-relaxed w-full lg:w-[70%]">
          <p className="pb-6">
            Proper care for your aquarium fish is essential for their health and
            well-being. From feeding schedules to tank maintenance,
            understanding their needs is key to creating a thriving aquatic
            environment.
          </p>

          <p className="pb-6">
            Fish require specific water conditions, adequate space, and proper
            nutrition. Understanding the requirements of your fish species is
            crucial for their longevity and happiness.
          </p>

          <h3 className="text-2xl font-bold my-5">#1. What Do Fish Need?</h3>

          <p className="pb-6">
            Regular maintenance of your aquarium, including water changes and
            monitoring water parameters, is essential to prevent disease and
            stress in fish.
          </p>

          <div className="border-l-4 border-gray-500 pl-4 mb-6 italic rounded">
            The health of your fish is directly related to the quality of their
            environment.
          </div>

          <p className="pb-6">
            Fish require a stimulating environment that mimics their natural
            habitat. This includes hiding spots, plants, and decorations.
          </p>

          <h3 className="text-2xl font-bold my-5">
            #2. Regular Feeding Schedule
          </h3>

          <p className="pb-6">
            Feed your fish at the same time every day to establish a routine and
            encourage healthy eating habits.
          </p>

          <p className="pb-6">
            Using feeding rings or scatter food throughout the tank to make
            feeding a fun and engaging activity for your fish.
          </p>

          <h3 className="text-2xl font-bold my-5">#3. Monitor Water Quality</h3>

          <p className="pb-6">
            Regularly test and maintain your aquarium water quality to ensure a
            healthy environment for your fish.
          </p>
        </div>
        <div className="flex flex-col  w-full lg:w-[30%]">
          <AuthorBio />
          <div>
            <RelatedPosts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
