import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full min-h-screen  flex flex-col md:flex-row items-center justify-center p-6 md:p-12">
      {/* Image Container */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0 md:mr-20">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[30rem] md:h-[30rem] rounded-full bg-blue-600 overflow-hidden">
          <Image
            src={require("../assets/banner-learning.jpg")}
            alt="Online learning illustration"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Text and Search Container */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Improve Your Online Learning Experience Instantly
        </h1>
        <p className="text-lg sm:text-xl mb-6  max-w-lg">
          We have 40k+ Online courses & 500K+ Online registered students. Find
          your desired Courses from them.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-md flex">
          <input
            type="search"
            placeholder="Search Courses..."
            className="flex-grow px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-500 transition"
          >
            Search
          </button>
        </div>

        {/* Trusted People Section */}
        <div className="mt-8 flex items-center">
          <div className="flex -space-x-2">
            {/* {[1, 2, 3].map((i) => (
              <Image
                key={i}
                // src={`/placeholder.svg?height=40&width=40&text=${i}`}
                alt={`User ${i}`}
                width={40}
                height={40}
                className="rounded-full border-2 border-gray-900"
              />
            ))} */}
          </div>
          <p className="ml-4 text-sm sm:text-base">
            <span className="font-semibold">500K+</span> People already trusted
            us.{" "}
            <a href="#" className="text-blue-400 hover:underline">
              View Courses
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
