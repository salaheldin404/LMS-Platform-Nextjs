"use client";

import { useEffect, useState } from "react";

import { useGetSessionQuery } from "@/lib/store/features/authApiSlice";
import { IUser } from "@/types/user";
import { useAppDispatch } from "@/lib/store/hooks";
import { login } from "@/lib/store/auth-slice";
export const useClientSession = (initialSession: IUser | null) => {
  const { data, isLoading } = useGetSessionQuery();
  const [currentSession, setCurrentSession] = useState<IUser | null>(
    initialSession
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const session = data ?? initialSession;
    setCurrentSession(session);
    if (session) {
      dispatch(login(session));
    }
  }, [data, initialSession, dispatch]);

  useEffect(() => {
    if (initialSession) {
      setCurrentSession(initialSession);
    }
  }, [initialSession]);

  return { data: currentSession, isLoading };
};
