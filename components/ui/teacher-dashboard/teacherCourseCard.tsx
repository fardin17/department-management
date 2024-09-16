import Image from "next/image";
import { FaClock, FaBook, FaTrashAlt, FaPlay } from "react-icons/fa";
import chapter from "@/assets/images/chapter.jpg";

const TeacherCourseCard = () => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg p-6">
      {/* Image section */}
      <div className="h-40 w-full bg-cover bg-center rounded-t-lg">
        <Image src={chapter} alt="Chapter Image"></Image>
      </div>

      {/* Content section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Chapter 1</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Design thinking process</li>
          <li>Origin of design</li>
          <li>What is design science</li>
          <li>History of design thinking</li>
          <li>Design sequence significance</li>
        </ul>

        {/* Upload lessons button */}
        <button className="mt-4 flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
          <span className="text-lg">+</span> <span>Upload Lessons</span>
        </button>

        {/* Info section */}
        <div className="mt-6">
          <div className="flex items-center gap-5 text-gray-600">
            <FaClock className="text-2xl" />
            <div>
              <p className="font-semibold">50 Min</p>
              <p className="text-sm">Class duration</p>
            </div>
          </div>
          <div className="flex items-center gap-5 text-gray-600 mt-2">
            <FaBook className="text-2xl" />
            <div>
              <p className="font-semibold">5 Lessons</p>
              <p className="text-sm">Class Outline</p>
            </div>
          </div>
        </div>

        {/* Footer section */}
        <div className="mt-6 flex justify-between items-center">
          <button className="flex items-center space-x-2 text-red-600 hover:text-red-800">
            <FaTrashAlt />
            <span>Delete Class</span>
          </button>
          <button className="flex items-center space-x-2 text-green-600 hover:text-green-800">
            <FaPlay />
            <span>Start Live</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherCourseCard;
