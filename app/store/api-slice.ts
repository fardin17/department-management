"use client";
import { ChapterType } from "@/_data/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers) => {
      const token = Cookies.get("access-token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Teachers", "Students"],
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getTeacherInfo: builder.query({
      query: () => `/teacher`,
      providesTags: ["Teachers"],
    }),
    getStudentInfo: builder.query({
      query: () => `/student`,
      providesTags: ["Students"],
    }),
    postChapter: builder.mutation<ChapterType, ChapterType>({
      query: (chapter) => ({
        url: `/teacher/chapter`,
        method: "POST",
        body: chapter,
      }),
      invalidatesTags: ["Teachers"],
    }),
    postNote: builder.mutation({
      query: (note) => ({
        url: `/teacher/notes`,
        method: "POST",
        body: note,
      }),
      invalidatesTags: ["Teachers"],
    }),
  }),
});
export const { useGetTeacherInfoQuery, useGetStudentInfoQuery, usePostChapterMutation, usePostNoteMutation } = apiSlice;

export default apiSlice.reducer;
