import { FaCalendarDay, FaClock, FaDownload } from "react-icons/fa";

const notes = [
  {
    title: "How to become a good communicator?",
    subject: "Business Management",
    date: "21-12-2021",
    time: "8:30PM",
  },
  {
    title: "Strategy Rules",
    subject: "Business Management",
    date: "21-12-2021",
    time: "8:30PM",
  },
  {
    title: "Origin of design",
    subject: "Business Management",
    date: "21-12-2021",
    time: "8:30PM",
  },
];

const DownloadNotes = () => {
  return (
    <div className="p-4 bg-white text-black">
      <div className="flex items-center mb-4">
        <div className="w-4 h-8 rounded-md bg-[#F8C7B0] mr-4"></div>
        <h1 className="text-sm font-bold">Download Subject Notes</h1>
      </div>
      {notes.map((note, index) => (
        <div
          key={index}
          className="p-4 mb-2 rounded-lg shadow-sm border-l-4 border-[#F8C7B0] flex items-start"
        >
          <div className="flex-1">
            <h3 className="font-bold text-base">{note.title}</h3>
            <p className="text-sm text-gray-600">{note.subject}</p>
            <p className="text-xs text-gray-500 flex items-center">
              <FaCalendarDay className="text-gray-500 mr-1" />
              {note.date}
            </p>
            <p className="text-xs text-gray-500 flex items-center">
              <FaClock className="text-gray-500 mr-1" />
              {note.time}
            </p>
            <p className="border text-xs p-1 flex items-center justify-center gap-2 mt-2 cursor-pointer">
              <FaDownload /> Download Notes
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DownloadNotes;
