"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingIcon from "@/components/icons/LoadingIcon";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { supabase } from "@/lib/supabase";
import { User } from "@/lib/types";
import { capitalizeFirstLetter } from "@/lib/utils";

const DisplayClientPage = () => {
  const path = usePathname();
  const clientId = path.split("/")[3];
  const [client, setClient] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchClient = async () => {
    const { data } = await supabase.from("user").select("*").eq("id", clientId);

    if (data && data.length > 0) {
      console.log(data);
      setClient(data[0] as User);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClient();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full mt-24">
        <div className="w-32 mx-auto">
          <LoadingIcon />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div className="mx-auto">
        <div className="w-40">
          <UserCircleIcon />
        </div>
      </div>
      <div className="mx-auto">
        <h1 className="font-bold text-4xl text-center">
          {capitalizeFirstLetter(client?.first_name || "")}{" "}
          {capitalizeFirstLetter(client?.last_name || "")}
        </h1>

        {/* <div className="pt-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            Email
          </label>
          <input
            value={client?.email || ""}
            type="email"
            name="email"
            placeholder="example@example.com"
            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          />
        </div> */}
      </div>
    </div>
  );
};

export default DisplayClientPage;
