import Image from "next/image";
import { FaClock, FaBook, FaTrashAlt, FaPlay } from "react-icons/fa";
import image from "@/assets/images/chapter.jpg";

interface TeacherCourseProps {
  id: number;
  title: string;
  // image: string;
  lessons: string[];
  duration: string;
  lessonCount: number;
}

const TeacherCourseCard = ({ id, title, lessons, duration, lessonCount }: TeacherCourseProps) => {
  return (
    <div key={id} className="max-w-sm bg-white rounded-lg shadow-lg p-6">
      {/* Image section */}
      <div className="h-40 w-full bg-cover bg-center rounded-t-lg mb-2">
        <Image src={image} alt={`${title} Image`} />
      </div>

      {/* Content section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          {lessons.map((lesson, index) => (
            <li key={index}>{lesson}</li>
          ))}
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
              <p className="font-semibold">{duration}</p>
              <p className="text-sm">Class duration</p>
            </div>
          </div>
          <div className="flex items-center gap-5 text-gray-600 mt-2">
            <FaBook className="text-2xl" />
            <div>
              <p className="font-semibold">{lessonCount} Lessons</p>
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
