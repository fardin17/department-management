import {
  FaHome,
  FaBook,
  FaCalendarAlt,
  FaVideo,
  FaClipboard,
  FaChalkboardTeacher,
  FaPenFancy,
  FaGraduationCap,
  FaCertificate,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { name: "Home", icon: FaHome },
    { name: "Subject", icon: FaBook },
    { name: "Schedule", icon: FaCalendarAlt },
    { name: "Live Class", icon: FaVideo },
    { name: "Assignment", icon: FaClipboard },
    { name: "Course Teachers", icon: FaChalkboardTeacher },
    { name: "Exam", icon: FaPenFancy },
    { name: "Result", icon: FaGraduationCap },
    { name: "Certificate", icon: FaCertificate },
    { name: "Settings", icon: FaCog },
  ];
  return (
    <div>
      <nav>
        {menuItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100 rounded"
          >
            <item.icon className="mr-3" />
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
