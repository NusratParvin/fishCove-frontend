import Image from "next/image";

import logo from "@/src/assets/images/Fish-logo-template-on-transparent-background-PNG.png";

const Banner = () => {
  return (
    <div className="relative w-full h-screen -top-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0  object-cover w-full h-full"
      >
        <source src="/videos/4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div className="flex flex-col  py-12 w-4/5 h-2/3 mx-auto">
          <div className="flex items-center justify-center ">
            <Image
              alt="fishCove logo"
              className=" mb-2"
              height={120}
              src={logo}
              width={120}
            />{" "}
            <p className="font-normal font-raleway text-9xl text-[#F4E3D7] tracking-tighter ">
              <span className="italic font-semibold ">fish</span>
              Cove
            </p>
          </div>

          <div className="text-[#F4E3D7] text-2xl mt-12">
            Welcome to fishCove, your ultimate destination for expert advice and
            captivating stories about aquatic life. Dive into our resources to
            enhance your knowledge and care for your fish companions!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
