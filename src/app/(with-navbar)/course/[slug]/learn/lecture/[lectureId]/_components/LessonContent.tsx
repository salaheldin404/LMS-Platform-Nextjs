"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { ILesson } from "@/types/course";
import { useState } from "react";
import ReactPlayer from "react-player";

const LessonContent = ({ lesson }: { lesson: ILesson }) => {
  const [error, setError] = useState(false);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    // timeZone: "UTC",
    // timeZoneName: "short",
  };
  return (
    <div>
      <div className="border-b mb-3 p-2">
        <div className="aspect-video ">
          {error ? (
            <div className="text-red-500 font-bold">
              error fetching lesson video
            </div>
          ) : (
            <ReactPlayer
              url={lesson?.video.playbackUrl}
              width="100%"
              height="100%"
              controls={true}
              onError={() => setError(true)}
            />
          )}
        </div>
        <h1 className="font-bold my-3 text-xl">{lesson?.title}</h1>
        <p>
          <span className="text-gray-500"> last updated: </span>
          {new Date(lesson?.updatedAt || "").toLocaleDateString(
            "en-US",
            options
          )}
        </p>
      </div>
      <div>
        <h2 className="font-bold mb-3 text-lg">Lecture description</h2>
        <p className="text-gray-500 text-sm/7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          ea saepe adipisci eveniet maxime cumque possimus nam? Error neque iste
          eos quis iure mollitia numquam nulla. Minima esse, a omnis quas
          praesentium ipsam veritatis repellendus ducimus! Error reiciendis
          obcaecati tenetur cumque officia nam assumenda, nisi beatae atque iste
          in molestiae quod eveniet aperiam iure amet aliquid! Voluptatibus
          corporis fugiat impedit. Aut cumque impedit totam quia ipsam itaque
          quibusdam obcaecati odio aliquid doloribus eligendi, odit amet?
          Architecto ipsum corporis, assumenda debitis libero porro, temporibus
          ducimus consequatur unde ad iste ratione! Tempore molestiae maiores
          architecto at asperiores labore facilis repudiandae dolores fugiat.
        </p>
      </div>
    </div>
  );
};

export default LessonContent;
