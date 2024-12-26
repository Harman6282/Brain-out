import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}
export function Card({ title, link, type }: CardProps) {
  return (
    <div>
      <div className="bg-white rounded-md shadow-sm outline-slate-200 p-4 border max-w-72   ">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="text-gray-500 pr-2">
              <ShareIcon />
            </div>
            {title}
          </div>
          <div className="flex">
            <div className="pr-2 text-gray-500">
              <a href={link} target="_blank"></a>
              <ShareIcon />
            </div>
            <div className="text-gray-500">
              <ShareIcon />
            </div>
          </div>
        </div>

        <div className="pt-4">
          {type == "youtube" && (
            <iframe
              className="w-full"
              src={link.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type == "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}