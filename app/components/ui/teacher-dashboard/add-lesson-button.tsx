"use client";

import { useEffect, useState } from "react";
import { usePostChapterMutation } from "@/app/store/api-slice";
import { ChapterType } from "@/_data/type";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddLessonSchema, AddLessonSchemaType } from "@/schema/dashboardSchema";
import { Button } from "../button";
import { Dot, Loader2, Plus, PowerCircle, Trash } from "lucide-react";
import Modal from "../modal";
import { cn } from "@/app/utils/helper/global-helper";

const AddLessonButton = () => {
  const [open, setOpen] = useState(false);
  const [postChapter] = usePostChapterMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddLessonSchemaType>({
    resolver: zodResolver(AddLessonSchema),
    defaultValues: {
      duration: undefined, // to show the placeholder text initially
      lessons: [""],
      title: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "lessons" as never,
    control,
  });

  const onSubmit = async (data: AddLessonSchemaType) => {
    try {
      const chapterPayload: ChapterType = {
        id: crypto.randomUUID(),
        title: data.title,
        lessons: data.lessons,
        duration: data.duration.toString(),
        lessonCount: data.lessons.length,
      };

      await postChapter(chapterPayload).unwrap();
      setOpen(false);
      reset();
    } catch (error) {
      console.error("Error submitting chapter:", error);
    }
  };

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  return (
    <Modal
      showButton={true}
      buttonText="+ Add Lessons"
      isOpen={open}
      onOpenChange={setOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-bold text-2xl pb-4 text-gray-700 text-center">
          Add a new lesson
        </h2>
        <div className="mb-4">
          <label
            className="block font-semibold text-gray-700 mb-2"
            htmlFor="title"
          >
            Chapter Title
          </label>
          <input
            {...register("title")}
            placeholder="New chapter"
            className="w-full p-2 border border-indigo-500/40 focus:outline-indigo-600 rounded"
          />
          {errors.title && (
            <ErrorMessage message={errors.title.message ?? ""} />
          )}
        </div>
        <div className="mb-4">
          <label
            className="block font-semibold text-gray-700 mb-2"
            htmlFor="duration"
          >
            Duration (in minutes)
          </label>
          <input
            type="number"
            placeholder="5 minutes"
            {...register("duration", { valueAsNumber: true })}
            className="w-full p-2 border border-indigo-500/40 focus:outline-indigo-600 rounded"
          />
          {errors.duration && (
            <ErrorMessage message={errors.duration.message ?? ""} />
          )}
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2">
            Lessons
          </label>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-2">
              <div className="flex items-center">
                <span className="text-lg flex justify-between items-center">
                  {index + 1} <Dot />
                </span>
                <input
                  {...register(`lessons.${index}`)}
                  className="flex-grow px-4 h-12 border border-indigo-500/40 focus:outline-indigo-600 rounded-l"
                  placeholder={`Lesson ${index + 1}`}
                />
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 hover:bg-red-600 text-white h-12 rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none"
                >
                  <Trash size={20} />
                </Button>
              </div>
              {errors.lessons && errors.lessons[index] && (
                <ErrorMessage
                  className="ml-9"
                  message={errors.lessons[index]?.message ?? ""}
                />
              )}
            </div>
          ))}
          {errors.lessons && !Array.isArray(errors.lessons) && (
            <ErrorMessage message={errors.lessons.message ?? ""} />
          )}
          <Button
            type="button"
            variant={"outline"}
            onClick={() => append("")}
            className="mt-2 bg-transparent text-gray-600 text-sm font-semibold ml-9 hover:bg-gray-100 h-12 py-2 px-4 rounded-md flex items-center"
          >
            <Plus className="mr-2" size={20} /> Add Lesson
          </Button>
        </div>
        <div className="w-full flex justify-end items-center gap-4">
          <Button
            variant={"outline"}
            type="reset"
            disabled={isSubmitting}
            onClick={() => reset()}
            className="text-gray-800 bg-transparent py-2 px-4 h-12 rounded-md hover:bg-gray-100"
          >
            <PowerCircle className="text-gray-600 pr-1" /> Reset
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-sky-600 text-white font-bold px-8 h-12 rounded-md hover:bg-sky-700"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin mr-2" size={20} />
            ) : null}
            Done
          </Button>
        </div>
      </form>
    </Modal>
  );
};

type MessageProps = {
  message: string;
  className?: string;
};

function ErrorMessage({ message, className }: MessageProps) {
  return (
    <p className={cn("text-red-500 text-sm pt-1 italic", className)}>
      {message}
    </p>
  );
}

export default AddLessonButton;
