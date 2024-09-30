"use client"; // Ensure this component can use hooks
import Link from "next/link";
import Image from "next/image";
import bg from "@/src/assets/images/StockCake-Cosmic Koi Dance_1727673723.jpg";

const page = () => {
  return (
    <div>
      <Image
        src={bg}
        alt="Contact Us Icon"
        width={1200}
        height={700}
        className="mr-2 w-full h-[400px] border"
      />
      <div className="md:w-9/12 mx-auto w-full mb-24">
        <div className="grid md:grid-cols-2 gap-16 items-center relative overflow-hidden p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl max-w-6xl mx-auto bg-white mt-4">
          <div>
            <h2 className="text-customOrange text-3xl font-extrabold">
              Get In Touch
            </h2>
            <p className="text-sm text-gray-500 mt-4 leading-relaxed">
              Have a specific inquiry or looking to explore new opportunities?
              Our experienced team is ready to engage with you.
            </p>

            <form>
              <div className="space-y-4 mt-8">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="px-2 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
                />
                <input
                  type="text"
                  placeholder="Street"
                  className="px-2 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
                />
                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="City"
                    className="px-2 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Postcode"
                    className="px-2 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
                  />
                </div>
                <input
                  type="number"
                  placeholder="Phone No."
                  className="px-2 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="px-2 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
                />
                <textarea
                  placeholder="Write Message"
                  className="px-2 pt-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
                />
              </div>

              <button
                type="button"
                className="mt-8 flex items-center justify-center text-sm w-full rounded-md px-6 py-3 bg-primary hover:bg-cyan-600 text-white"
              >
                Send Message
              </button>
            </form>

            <ul className="mt-4 flex flex-wrap justify-center gap-6">
              <li className="flex items-center text-primary">
                <i className="bx bx-mail-send" style={{ fontSize: "16px" }}></i>
                <a href="mailto:info@example.com" className="text-sm ml-4">
                  <strong>info@example.com</strong>
                </a>
              </li>
              <li className="flex items-center text-primary">
                <i className="bx bx-phone" style={{ fontSize: "16px" }}></i>
                <a href="tel:+158996888" className="text-sm ml-4">
                  <strong>+158 996 888</strong>
                </a>
              </li>
            </ul>
          </div>

          <div className="relative h-full">
            <iframe
              src="https://maps.google.com/maps?q=manhattan&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="left-0 top-0 h-full w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
              frameBorder="0"
              allowFullScreen
              title="Google Map showing Manhattan"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
