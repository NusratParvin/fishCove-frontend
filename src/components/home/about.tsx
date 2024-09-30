// import Image from "next/image";
// import heroFish1 from "@/src/assets/images/Fish-logo-template-on-transparent-background-PNG.png"; // Update with relevant fish images
// import fish2 from "@/src/assets/images/fish2.png"; // Update with relevant fish images
// import fish1 from "@/src/assets/images/fish1.png"; // Update with relevant fish images
// import PrimaryButton from "../shared/button";

// export default function Hero() {
//   return (
//     <div className="container mx-auto px-4 py-12 md:py-24">
//       <div className="flex flex-col md:flex-row items-center">
//         <div className="md:w-1/2 relative mb-8 md:mb-0 flex justify-center">
//           <div className="relative w-[300px] h-[300px] md:w-full md:h-[550px] ">
//             <div className="absolute top-0 left-0 w-3/4 h-3/4  rounded-full z-10" />
//             <svg
//               className="absolute -top-40 -left-20 w-full h-full z-50 "
//               viewBox="0 0 400 400"
//             >
//               <path
//                 d="M50,200 Q100,50 200,100 T350,200"
//                 fill="none"
//                 stroke="navy"
//                 strokeDasharray="3,10"
//                 strokeWidth="2"
//               />
//             </svg>
//             <Image
//               alt="Tropical Fish"
//               className="absolute top-0 left-0 z-30"
//               height={300}
//               src={fish2}
//               width={300}
//             />
//             <div className="absolute bottom-0 right-0 w-3/4 h-3/4 rounded-full z-20" />
//             <Image
//               alt="Betta Fish"
//               className="absolute bottom-0 right-10 z-40"
//               height={400}
//               src={fish1}
//               width={300}
//             />
//             <svg
//               className="absolute -top-28 -left-10 w-full h-full z-50 "
//               viewBox="0 0 400 400"
//             >
//               <path
//                 d="M50,300 Q150,400 250,300 T400,250"
//                 fill="none"
//                 stroke="skyblue"
//                 strokeDasharray="3,10"
//                 strokeWidth="2"
//               />
//             </svg>
//           </div>
//         </div>

//         <div className="md:w-1/2 md:pl-12">
//           <h2 className="text-xl text-gray-600 mb-2">About Us</h2>
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 text-customOrange">
//             Making Your Aquatic Life Exceptional
//           </h1>
//           <p className="text-gray-600 mb-6">
//             At FishCove, we are passionate about aquatic pets and their care. We
//             provide expert guidance, high-quality products, and a community for
//             all fish lovers. Our mission is to help you create a beautiful
//             underwater world that enhances your life and your fish's well-being.
//           </p>
//           <PrimaryButton buttonText="Learn More" />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import PrimaryButton from "../shared/button";

import fish2 from "@/src/assets/images/fish2.png";
import fish1 from "@/src/assets/images/fish1.png";

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger animation once

  return (
    <div className="container mx-auto px-4 py-12 md:px-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center">
        <motion.div
          ref={ref}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -100 }}
          className="md:w-1/2 relative mb-8 md:mb-0 flex justify-center"
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 1.5 }}
        >
          <div className="relative w-[300px] h-[300px] md:w-full md:h-[550px]">
            <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-full z-10" />
            <svg
              className="absolute -top-40 -left-20 w-full h-full z-50"
              viewBox="0 0 400 400"
            >
              <path
                d="M50,200 Q100,50 200,100 T350,200"
                fill="none"
                stroke="navy"
                strokeDasharray="3,10"
                strokeWidth="2"
              />
            </svg>
            <Image
              alt="Tropical Fish"
              className="absolute top-0 left-0 z-30"
              height={300}
              src={fish2}
              width={300}
            />
            <div className="absolute bottom-0 right-0 w-3/4 h-3/4 rounded-full z-20" />
            <motion.div
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 100 }}
              className="absolute bottom-0 right-10 z-40"
              initial={{ opacity: 0, y: 100 }}
              transition={{ duration: 1.5 }}
            >
              <Image alt="Betta Fish" height={400} src={fish1} width={300} />
            </motion.div>
            <svg
              className="absolute -top-28 -left-10 w-full h-full z-50"
              viewBox="0 0 400 400"
            >
              <path
                d="M50,300 Q150,400 250,300 T400,250"
                fill="none"
                stroke="skyblue"
                strokeDasharray="3,10"
                strokeWidth="2"
              />
            </svg>
          </div>
        </motion.div>

        <div className="md:w-1/2 md:pl-12">
          <motion.h2
            animate={{ opacity: isInView ? 1 : 0 }}
            className="text-xl text-gray-600 mb-2"
            initial={{ opacity: 0 }} // Start hidden
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            About Us
          </motion.h2>
          <motion.h1
            animate={{ opacity: isInView ? 1 : 0 }}
            className="text-3xl md:text-4xl font-semibold mb-4 text-customOrange"
            initial={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 1.2 }}
          >
            Making Your Aquatic Life Exceptional
          </motion.h1>
          <motion.p
            animate={{ opacity: isInView ? 1 : 0 }}
            className="text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            At FishCove, we are passionate about aquatic pets and their care. We
            provide expert guidance, high-quality products, and a community for
            all fish lovers. Our mission is to help you create a beautiful
            underwater world that enhances your life and your fish well-being.
          </motion.p>
          <PrimaryButton buttonText="Learn More" href="/about" />
        </div>
      </div>
    </div>
  );
}
