"use client";
import { useGetSessionQuery } from "@/lib/store/features/authApiSlice";
import { logout } from "@/server/actions/auth";

export const useAuth = () => {
  const { data: user, isLoading, isError } = useGetSessionQuery();

  const isAuthenticated = !!user;

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    isError,
    handleLogout,
    user,
  };
};
