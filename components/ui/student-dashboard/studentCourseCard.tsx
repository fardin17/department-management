import Image from "next/image";
import { FaClipboardList } from "react-icons/fa";
import chapter from "@/assets/images/chapter.jpg";

const StudentCourseCard = () => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg p-6">
      {/* Image section */}
      <div className="h-40 w-full bg-cover bg-center rounded-t-lg">
        <Image src={chapter} alt="Chapter Image"></Image>
      </div>

      {/* Content section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4 mt-10">Computer Science</h2>
        <p>Hey! Did You Understand?</p>

        {/* Footer section */}
        <div className="mt-6 flex justify-between items-center">
          <button className="flex items-center space-x-2 text-green-600 hover:text-green-800 border p-2">
            <FaClipboardList />
            <span>Marks - 100</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseCard;
