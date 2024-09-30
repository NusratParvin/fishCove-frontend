import Image from "next/image";

const AuthorBio = () => {
  return (
    <div className=" mx-auto mb-16 max-w-screen-sm">
      <div className="my-4 p-4 border-t border-b  ">
        <div className="flex py-2">
          <Image
            alt="Author"
            className="h-10 w-10 rounded-full mr-2 object-cover"
            height={40}
            src="https://randomuser.me/api/portraits/men/97.jpg"
            width={40}
          />
          <div>
            <p className="font-semibold text-gray-700 text-sm">
              {" "}
              Marine Biologist{" "}
            </p>
            <p className="font-semibold text-gray-600 text-xs"> Author </p>
          </div>
        </div>
        <p className="text-gray-700 py-3 text-sm">
          Marine Biologist with years of experience in fish care and aquarium
          maintenance. Sharing tips and insights for happy, healthy fish.
        </p>
        <button className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded">
          Follow
          <i className="bx bx-user-plus ml-2" />
        </button>
      </div>
    </div>
  );
};

export default AuthorBio;
