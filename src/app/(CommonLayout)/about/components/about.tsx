"use client";
import NextLink from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import image2 from "@/src/assets/images/clown.jpg";
import image1 from "@/src/assets/images/StockCake-Fish Escaping Bowl_1727673832.jpg";
import image3 from "@/src/assets/images/fish.jpg";

// Animation variants for staggered animations
const staggerContainer = {
  hidden: { opacity: 0, transition: { staggerChildren: 0.2 } },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const About = () => {
  return (
    <motion.section
      animate="visible"
      className="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] bg-white dark:bg-dark"
      initial="hidden"
      variants={staggerContainer}
    >
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between -mx-4">
          {/* Image Section */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="flex items-center -mx-3 sm:-mx-4">
              <motion.div
                className="w-full px-3 sm:px-4 lg:w-1/2"
                variants={fadeInUp}
              >
                <div className="py-3 sm:py-4">
                  <Image
                    alt="About Image 1"
                    className="w-full h-44 rounded-full"
                    height={400}
                    src={image1}
                    width={400}
                  />
                </div>
                <div className="py-0 ">
                  <Image
                    alt="About Image 2"
                    className="w-full h-56 rounded-full"
                    height={400}
                    src={image2}
                    width={400}
                  />
                </div>
              </motion.div>
              <motion.div className="w-full lg:w-1/2" variants={fadeInUp}>
                <div className="relative z-10 my-4">
                  <Image
                    alt="About Image 3"
                    className="w-full h-96 rounded-full"
                    height={400}
                    src={image3}
                    width={400}
                  />

                  <span className="absolute -right-10 -bottom-12 z-[-1]">
                    <svg
                      fill="none"
                      height={106}
                      viewBox="0 0 134 106"
                      width={134}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="1.66667"
                        cy={104}
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 1.66667 104)"
                      />
                      <circle
                        cx="16.3333"
                        cy={104}
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 16.3333 104)"
                      />
                      <circle
                        cx={31}
                        cy={104}
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 31 104)"
                      />
                      <circle
                        cx="45.6667"
                        cy={104}
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 45.6667 104)"
                      />
                      <circle
                        cx="60.3334"
                        cy={104}
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 60.3334 104)"
                      />
                      <circle
                        cx="88.6667"
                        cy={104}
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 88.6667 104)"
                      />
                      <circle
                        cx="117.667"
                        cy={104}
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 117.667 104)"
                      />
                      <circle
                        cx="74.6667"
                        cy={104}
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 74.6667 104)"
                      />
                      <circle
                        cx={103}
                        cy={104}
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 103 104)"
                      />
                      <circle
                        cx={132}
                        cy={104}
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 132 104)"
                      />
                      <circle
                        cx="1.66667"
                        cy="89.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 1.66667 89.3333)"
                      />
                      <circle
                        cx="16.3333"
                        cy="89.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 16.3333 89.3333)"
                      />
                      <circle
                        cx={31}
                        cy="89.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 31 89.3333)"
                      />
                      <circle
                        cx="45.6667"
                        cy="89.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 45.6667 89.3333)"
                      />
                      <circle
                        cx="60.3333"
                        cy="89.3338"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 60.3333 89.3338)"
                      />
                      <circle
                        cx="88.6667"
                        cy="89.3338"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 88.6667 89.3338)"
                      />
                      <circle
                        cx="117.667"
                        cy="89.3338"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 117.667 89.3338)"
                      />
                      <circle
                        cx="74.6667"
                        cy="89.3338"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 74.6667 89.3338)"
                      />
                      <circle
                        cx={103}
                        cy="89.3338"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 103 89.3338)"
                      />
                      <circle
                        cx={132}
                        cy="89.3338"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 132 89.3338)"
                      />
                      <circle
                        cx="1.66667"
                        cy="74.6673"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 1.66667 74.6673)"
                      />
                      <circle
                        cx="1.66667"
                        cy="31.0003"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 1.66667 31.0003)"
                      />
                      <circle
                        cx="16.3333"
                        cy="74.6668"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 16.3333 74.6668)"
                      />
                      <circle
                        cx="16.3333"
                        cy="31.0003"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 16.3333 31.0003)"
                      />
                      <circle
                        cx={31}
                        cy="74.6668"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 31 74.6668)"
                      />
                      <circle
                        cx={31}
                        cy="31.0003"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 31 31.0003)"
                      />
                      <circle
                        cx="45.6667"
                        cy="74.6668"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 45.6667 74.6668)"
                      />
                      <circle
                        cx="45.6667"
                        cy="31.0003"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 45.6667 31.0003)"
                      />
                      <circle
                        cx="60.3333"
                        cy="74.6668"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 60.3333 74.6668)"
                      />
                      <circle
                        cx="60.3333"
                        cy="30.9998"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 60.3333 30.9998)"
                      />
                      <circle
                        cx="88.6667"
                        cy="74.6668"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 88.6667 74.6668)"
                      />
                      <circle
                        cx="88.6667"
                        cy="30.9998"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 88.6667 30.9998)"
                      />
                      <circle
                        cx="117.667"
                        cy="74.6668"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 117.667 74.6668)"
                      />
                      <circle
                        cx="117.667"
                        cy="30.9998"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 117.667 30.9998)"
                      />
                      <circle
                        cx="74.6667"
                        cy="74.6668"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 74.6667 74.6668)"
                      />
                      <circle
                        cx="74.6667"
                        cy="30.9998"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 74.6667 30.9998)"
                      />
                      <circle
                        cx={103}
                        cy="74.6668"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 103 74.6668)"
                      />
                      <circle
                        cx={103}
                        cy="30.9998"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 103 30.9998)"
                      />
                      <circle
                        cx={132}
                        cy="74.6668"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 132 74.6668)"
                      />
                      <circle
                        cx={132}
                        cy="30.9998"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 132 30.9998)"
                      />
                      <circle
                        cx="1.66667"
                        cy="60.0003"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 1.66667 60.0003)"
                      />
                      <circle
                        cx="1.66667"
                        cy="16.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 1.66667 16.3333)"
                      />
                      <circle
                        cx="16.3333"
                        cy="60.0003"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 16.3333 60.0003)"
                      />
                      <circle
                        cx="16.3333"
                        cy="16.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 16.3333 16.3333)"
                      />
                      <circle
                        cx={31}
                        cy="60.0003"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 31 60.0003)"
                      />
                      <circle
                        cx={31}
                        cy="16.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 31 16.3333)"
                      />
                      <circle
                        cx="45.6667"
                        cy="60.0003"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 45.6667 60.0003)"
                      />
                      <circle
                        cx="45.6667"
                        cy="16.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 45.6667 16.3333)"
                      />
                      <circle
                        cx="60.3333"
                        cy="60.0003"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 60.3333 60.0003)"
                      />
                      <circle
                        cx="60.3333"
                        cy="16.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 60.3333 16.3333)"
                      />
                      <circle
                        cx="88.6667"
                        cy="60.0003"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 88.6667 60.0003)"
                      />
                      <circle
                        cx="88.6667"
                        cy="16.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 88.6667 16.3333)"
                      />
                      <circle
                        cx="117.667"
                        cy="60.0003"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 117.667 60.0003)"
                      />
                      <circle
                        cx="117.667"
                        cy="16.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 117.667 16.3333)"
                      />
                      <circle
                        cx="74.6667"
                        cy="60.0003"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 74.6667 60.0003)"
                      />
                      <circle
                        cx="74.6667"
                        cy="16.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 74.6667 16.3333)"
                      />
                      <circle
                        cx={103}
                        cy="60.0003"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 103 60.0003)"
                      />
                      <circle
                        cx={103}
                        cy="16.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 103 16.3333)"
                      />
                      <circle
                        cx={132}
                        cy="60.0003"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 132 60.0003)"
                      />
                      <circle
                        cx={132}
                        cy="16.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 132 16.3333)"
                      />
                      <circle
                        cx="1.66667"
                        cy="45.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 1.66667 45.3333)"
                      />
                      <circle
                        cx="1.66667"
                        cy="1.66683"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 1.66667 1.66683)"
                      />
                      <circle
                        cx="16.3333"
                        cy="45.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 16.3333 45.3333)"
                      />
                      <circle
                        cx="16.3333"
                        cy="1.66683"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 16.3333 1.66683)"
                      />
                      <circle
                        cx={31}
                        cy="45.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 31 45.3333)"
                      />
                      <circle
                        cx={31}
                        cy="1.66683"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 31 1.66683)"
                      />
                      <circle
                        cx="45.6667"
                        cy="45.3333"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 45.6667 45.3333)"
                      />
                      <circle
                        cx="45.6667"
                        cy="1.66683"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 45.6667 1.66683)"
                      />
                      <circle
                        cx="60.3333"
                        cy="45.3338"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 60.3333 45.3338)"
                      />
                      <circle
                        cx="60.3333"
                        cy="1.66683"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 60.3333 1.66683)"
                      />
                      <circle
                        cx="88.6667"
                        cy="45.3338"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 88.6667 45.3338)"
                      />
                      <circle
                        cx="88.6667"
                        cy="1.66683"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 88.6667 1.66683)"
                      />
                      <circle
                        cx="117.667"
                        cy="45.3338"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 117.667 45.3338)"
                      />
                      <circle
                        cx="117.667"
                        cy="1.66683"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 117.667 1.66683)"
                      />
                      <circle
                        cx="74.6667"
                        cy="45.3338"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 74.6667 45.3338)"
                      />
                      <circle
                        cx="74.6667"
                        cy="1.66683"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 74.6667 1.66683)"
                      />
                      <circle
                        cx={103}
                        cy="45.3338"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 103 45.3338)"
                      />
                      <circle
                        cx={103}
                        cy="1.66683"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 103 1.66683)"
                      />
                      <circle
                        cx={132}
                        cy="45.3338"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 132 45.3338)"
                      />
                      <circle
                        cx={132}
                        cy="1.66683"
                        fill="#FF6B61"
                        r="1.66667"
                        transform="rotate(-90 132 1.66683)"
                      />
                    </svg>
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
            <motion.div className="mt-10 lg:mt-0" variants={fadeInUp}>
              <span className="block mb-4 text-lg font-semibold text-primary">
                Why Choose Us
              </span>
              <h2 className="mb-5 text-3xl font-bold text-highlight sm:text-[40px]/[48px]">
                Make your Fish Thrive with Our Services
              </h2>
              <p className="mb-5 text-base text-body-color dark:text-dark-6">
                FishCove is committed to offering the best services for fish
                care, providing expert guidance, tips, and products to help your
                aquatic companions thrive in a healthy environment.
              </p>
              <p className="mb-8 text-base text-body-color dark:text-dark-6">
                Whether youre setting up a new tank, maintaining an established
                one, or looking for expert advice, FishCove has the resources
                and expertise to ensure your fish live happy, healthy lives.
              </p>

              <NextLink passHref href="/get-started">
                <motion.p
                  className="inline-flex items-center justify-center py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-primary hover:bg-opacity-90"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.p>
              </NextLink>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
