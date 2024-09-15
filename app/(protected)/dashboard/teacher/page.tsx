import React from "react";
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

const Dashboard = () => {
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
    <section className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="flex h-[90vh] max-w-[1400px] w-full mx-auto rounded-lg bg-white shadow-lg">
        {/* Left Sidebar */}
        <aside className="w-64 bg-gray-50 p-6 space-y-4 rounded-l-lg drop-shadow-lg">
          <nav>
            {menuItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100 rounded"
              >
                <item.icon className="mr-3" /> {/* Icon next to the text */}
                {item.name}
              </a>
            ))}
          </nav>
        </aside>

        <div className="flex-1 p-8 bg-green-400 overflow-y-auto">
          {/* Main content here */}
          Middle content that takes up remaining space.
        </div>

        {/* Right Sidebar */}
        <div className="w-64 bg-red-500 p-6 space-y-4 rounded-r-lg">
          {/* Right sidebar content */}
          <div>Right sidebar content</div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
