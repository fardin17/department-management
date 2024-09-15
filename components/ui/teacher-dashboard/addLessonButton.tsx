"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const AddLessonButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-[#518CF4] text-white py-1 px-5 rounded-lg"
      >
        <span className="text-xl">+</span> Add Lessons
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Lesson</h2>
              <button onClick={closeModal}>
                <FaTimes className="text-gray-600" />
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="image"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="chapter"
                >
                  Chapter
                </label>
                <input
                  type="text"
                  id="chapter"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="topic"
                >
                  Topic
                </label>
                <input
                  type="text"
                  id="topic"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="duration"
                >
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="lesson"
                >
                  Lesson
                </label>
                <textarea
                  id="lesson"
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#518CF4] text-white py-2 px-4 rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLessonButton;
