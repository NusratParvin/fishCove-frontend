"use client";

import NextLink from "next/link";
import Image from "next/image";
import image from "@/src/assets/images/team.png";

const Team = () => {
  return (
    <section className="py-6 my-24 ">
      <div className="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
        <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl text-highlight">
          Our Team
        </h1>
        <p className="max-w-2xl text-center dark:text-gray-600">
          At a assumenda quas cum earum ut itaque commodi saepe rem aspernatur
          quam natus quis nihil quod, hic explicabo doloribus magnam neque,
          exercitationem eius sunt!
        </p>
        <div className="flex flex-row flex-wrap-reverse justify-center">
          {/* Team Member 1 */}
          <div className="flex flex-col justify-center m-8 text-center">
            <NextLink
              href="https://unsplash.com/photos/a-woman-wearing-glasses-is-smiling-while-looking-at-a-laptop-4owZdafVgOk"
              passHref
            >
              <Image
                alt="Leroy Jenkins"
                className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
                src={image}
                width={96}
                height={96}
              />
            </NextLink>
            <p className="text-xl font-semibold leading-tight">Leroy Jenkins</p>
            <p className="dark:text-gray-600">Visual Designer</p>
          </div>

          {/* Other team members with placeholder images */}
          <div className="flex flex-col justify-center m-8 text-center">
            <Image
              alt="Team Member 2"
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src={image}
              width={96}
              height={96}
            />
            <p className="text-xl font-semibold leading-tight">Leroy Jenkins</p>
            <p className="dark:text-gray-600">Visual Designer</p>
          </div>

          <div className="flex flex-col justify-center m-8 text-center">
            <Image
              alt="Team Member 3"
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src={image}
              width={96}
              height={96}
            />
            <p className="text-xl font-semibold leading-tight">Leroy Jenkins</p>
            <p className="dark:text-gray-600">Visual Designer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
