import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FC } from "react";
import clsx from "clsx";

export interface IAddbutton {
  link: string;
  text: string;
  colour?: string;
}

const Addbutton: FC<IAddbutton> = ({ link, text, colour = "bg-gro-pink" }) => (
  <Link href={link}>
    <div
      className={clsx(
        "text-white p-1.5 rounded-lg flex whitespace-nowrap ml-2",
        colour,
      )}
    >
      <p className="my-auto hidden lg:block">{text}</p>
      <PlusCircleIcon className="w-6 m-0 lg:ml-1 my-auto" />
    </div>
  </Link>
);
export default Addbutton;
