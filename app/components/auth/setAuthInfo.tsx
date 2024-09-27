"use client";

import { useEffect } from "react";
import type { Session } from "next-auth";
import { useAppDispatch } from "@/app/hooks/redux";
import { setAuthInfo } from "@/app/store/userInfo-slice";
import { getUserByEmail } from "@/app/utils/helper/api-helper";

/**
 * This purpose of this component is just to add the current user data to the Redux store.
 */
export default function SetAuthInfo({ session }: { session: Session }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getUserFromDB() {
      const user = await getUserByEmail(session.user.email);

      if (user) {
        dispatch(
          setAuthInfo({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            type: user.type,
            provider: user.provider,
          })
        );
      } else {
        console.error("User not found in db (from setAuthInfo).");
      }
    }

    getUserFromDB();
  }, [session]);

  return null;
}
