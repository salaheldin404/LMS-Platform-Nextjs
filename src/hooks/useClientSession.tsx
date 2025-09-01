"use client";

import { useEffect, useMemo } from "react";

import { useGetSessionQuery } from "@/lib/store/features/authApiSlice";
import { IUser } from "@/types/user";
import { useAppDispatch } from "@/lib/store/hooks";
import { login } from "@/lib/store/auth-slice";
export const useClientSession = (initialSession: IUser | null) => {
  const { data, isLoading } = useGetSessionQuery();

  const dispatch = useAppDispatch();

  const currentSession = useMemo(() => {
    // Server data takes precedence over initial session
    if (data !== undefined) return data;
    return initialSession;
  }, [data, initialSession]);

  useEffect(() => {
    if (currentSession) {
      dispatch(login(currentSession));
    }
  }, [currentSession, dispatch]);

  return { data: currentSession, isLoading };
};
