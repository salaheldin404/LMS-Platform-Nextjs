import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/types/user";

const InstructorInfo = ({ instructor }: { instructor: IUser }) => {
  return (
    <div className="flex items-center gap-3 my-3">
      <Link href={`/profile/${instructor._id}`}>
        <Avatar className="h-10 w-10 border border-slate-600">
          <AvatarImage
            src={instructor.profilePicture?.url || "/default-profile.png"}
          />
          <AvatarFallback className="bg-slate-700">
            {instructor.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>
      <div>
        <span className="text-slate-400 text-sm">Created by</span>
        <Link className="" href={`/profile/${instructor._id}`}>
          <p className="font-medium">{instructor.username}</p>
        </Link>
      </div>
    </div>
  );
};

export default InstructorInfo;
