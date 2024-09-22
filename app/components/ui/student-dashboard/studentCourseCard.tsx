import Image from "next/image";
import { FaClipboardList } from "react-icons/fa";
import chapter from "@/assets/images/chapter.jpg";
import { SubjectType } from "@/_data/type";

const StudentCourseCard = ({ name, description, mark }: SubjectType) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg p-6">
      {/* Image section */}
      <div className="h-40 w-full bg-cover bg-center rounded-t-lg">
        <Image src={chapter} alt="Chapter Image"></Image>
      </div>

      {/* Content section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4 mt-10">{name}</h2>
        <p>{description}</p>

        {/* Footer section */}
        <div className="mt-6 flex justify-between items-center">
          <button className="flex items-center space-x-2 text-green-600 hover:text-green-800 border p-2">
            <FaClipboardList />
            <span>Marks - {mark}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseCard;
