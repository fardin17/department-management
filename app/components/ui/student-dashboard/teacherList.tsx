import Image from "next/image";
import teacher from "@/assets/images/teacher.jpg";
const teachers = [
  {
    name: "Cameron Williamson",
    subject: "Polymer Science",
    imageUrl: teacher,
  },
  {
    name: "Darlene Robertson",
    subject: "Urban Development",
    imageUrl: teacher,
  },
  {
    name: "Eleanor Pena",
    subject: "Geographic",
    imageUrl: teacher,
  },
  {
    name: "Solar Science",
    subject: "Polymer Science",
    imageUrl: teacher,
  },
];

const TeacherList = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <div className="w-3 h-6 rounded-md bg-[#F8C7B0] mr-4"></div>
        <h1 className="text-sm font-bold text-black">Subject Teacher</h1>
      </div>
      <ul>
        {teachers.map((teacher, index) => (
          <li
            key={index}
            className="flex items-center p-4 mb-4 bg-gray-100 rounded-lg shadow-sm"
          >
            <Image
              src={teacher.imageUrl}
              alt={teacher.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <p className=" text-gray-900 font-bold text-sm">{teacher.name}</p>
              <p className=" text-gray-600 text-xs">{teacher.subject}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;
