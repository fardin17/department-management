import { usePostNoteMutation } from "@/app/store/api-slice";
import { FaCalendarDay, FaClock, FaTrashAlt, FaUpload } from "react-icons/fa";

interface NoteListProps {
  notes: {
    title: string;
    subject: string;
    date: string;
    time: string;
  }[];
}
const NotesList = ({ notes }: NoteListProps) => {
  const [postNote] = usePostNoteMutation();
  const handleNoteUpload = () => {
    const notesPayload = {
      title: "New notes",
      subject: "React",
      date: "21-12-2021",
      time: "8:30PM",
    };
    postNote(notesPayload);
  };
  return (
    <div className="p-4 bg-white text-black">
      <div className="flex items-center mb-4">
        <div className="w-4 h-8 rounded-md bg-[#F8C7B0] mr-4"></div>
        <button className="text-sm font-bold" onClick={handleNoteUpload}>
          Uploaded Subject Notes
        </button>
      </div>
      {notes?.map((note, index) => (
        <div key={index} className="p-4 mb-2 rounded-lg shadow-sm border-l-4 border-[#F8C7B0] flex items-start">
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
              <FaTrashAlt /> Delete Now
            </p>
          </div>
        </div>
      ))}
      <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center text-sm">
        <FaUpload className="mr-2" />
        Upload New Subject Note
      </button>
    </div>
  );
};

export default NotesList;
