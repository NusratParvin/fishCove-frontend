import Image from "next/image";

import fishImage from "@/src/assets/images/betta-7101167_1280.jpg";
import blobImage from "@/src/assets/images/magicpattern-blob-1727675049893.png";

const FishInfo = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center my-28 p-6 bg-white rounded-lg  gap-8">
      <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0 ">
        <h2 className="text-4xl font-semibold text-customOrange mb-4">
          Activities and Care for Your Fish
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          Just like any other pet, fish need proper care and activities to
          thrive. Below are some recommended activities and care tips to ensure
          your aquatic friends remain happy and healthy.
        </p>

        <div className="relative mt-6 ">
          <div className="absolute left-0 -top-4">
            <Image
              alt="Blob Background"
              className="-z-10"
              height={60}
              src={blobImage}
              width={60}
            />
          </div>
          <p className="absolute left-4 text-xl font-semibold text-black z-10">
            01.
          </p>
          <h3 className="text-xl font-semibold mt-6 pl-10 relative z-10 mb-2 ms-4">
            Create a Stimulating Environment
          </h3>
        </div>

        <p className="text-gray-600 mb-4 text-sm ms-16">
          Include plants and decorations in your aquarium to create hiding spots
          and stimulate exploration.
        </p>

        <div className="relative mt-6 ">
          <div className="absolute left-0 -top-4">
            <Image
              alt="Blob Background"
              className="-z-10"
              height={60}
              src={blobImage}
              width={60}
            />
          </div>
          <p className="absolute left-4 text-xl font-semibold text-black z-10">
            02.
          </p>
          <h3 className="text-xl font-semibold mt-6 pl-10 relative z-10 mb-2 ms-4">
            Regular Feeding Schedule
          </h3>
        </div>
        <p className="text-gray-600 mb-4 text-sm ms-16">
          Feed your fish at the same time every day to establish a routine and
          encourage healthy eating habits.
        </p>

        <div className="relative mt-6 ">
          <div className="absolute left-0 -top-4">
            <Image
              alt="Blob Background"
              className="-z-10"
              height={60}
              src={blobImage}
              width={60}
            />
          </div>
          <p className="absolute left-4 text-xl font-semibold text-black z-10">
            03.
          </p>
          <h3 className="text-xl font-semibold mt-6 pl-10 relative z-10 mb-2 ms-4">
            Engage in Interactive Activities
          </h3>
        </div>
        <p className="text-gray-600 mb-4 text-sm ms-16">
          Use feeding rings or scatter food throughout the tank to make feeding
          a fun and engaging activity for your fish.
        </p>

        <div className="relative mt-6 ">
          <div className="absolute left-0 -top-4">
            <Image
              alt="Blob Background"
              className="-z-10"
              height={60}
              src={blobImage}
              width={60}
            />
          </div>
          <p className="absolute left-4 text-xl font-semibold text-black z-10">
            04.
          </p>
          <h3 className="text-xl font-semibold mt-6 pl-10 relative z-10 mb-2 ms-4">
            Monitor Water Quality
          </h3>
        </div>
        <p className="text-gray-600 mb-4 text-sm ms-16">
          Regularly test and maintain your aquarium water quality to ensure a
          healthy environment for your fish.
        </p>

        {/* <Button className="mt-6" color="primary" size="lg">
          Book Appointment
        </Button> */}
      </div>

      <div className="relative w-full md:w-1/2 ">
        <Image
          alt="Aquarium Fish"
          className="object-cover"
          height={400}
          layout="responsive"
          src={fishImage}
          width={600}
        />
      </div>
    </div>
  );
};

export default FishInfo;
