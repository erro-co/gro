"use client";
import Loading from "@/components/Loading";
import SuccessfulAddNewClientModal from "@/components/Modals/SuccessfulAddNewClientModal";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeFirstLetter } from "@/lib/helpers";
import { UserIcon } from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";

const ViewClientPage: FC = () => {
  const [client, setClient] = useState<User>();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<User | null>(null);
  const [trainers, setTrainers] = useState<User[] | null>(null);

  const clientId = usePathname().split("/")[3];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    setLoading(false);
    setOpenModal(true);
  };

  const fetchUsers = async () => {
    const { data: trainers, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("type", "trainer")
      .order("first_name", { ascending: true });

    if (error) {
      console.log("Error getting trainers:", error);
      return;
    }
    console.log("trainers", trainers);
    setTrainers(trainers as User[]);
    setLoading(false);
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("role") === "client"
    ) {
      redirect("/app/plans");
    }
    fetchUsers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <SuccessfulAddNewClientModal
        isOpen={openModal}
        setIsOpen={setOpenModal}
      />
      <div className="space-y-12 sm:space-y-16">
        <div>
          <div className="flex w-full">
            <div className="mx-auto">
              <UserIcon className="w-32" />
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                {/* {capitalizeFirstLetter(firstname)}{" "}
                {capitalizeFirstLetter(lastname)} */}
              </h2>
            </div>
          </div>

          <div className="mt-10 space-y-8 border-b border-gray-900/15 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/15 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="food-name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                First name<span className="text-red-500 font-bold">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0 max-w-sm">
                <Input required type="text" name="firstname" />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="food-brand"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Last Name<span className="text-red-500 font-bold">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0 max-w-sm">
                <Input type="text" name="lastname" />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="food-brand"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Email<span className="text-red-500 font-bold">*</span>
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0 max-w-sm">
                <Input type="email" name="email" />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="food-brand"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Phone
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0 max-w-sm">
                <Input type="phone" name="phone" />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="food-brand"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Trainer
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <Select>
                  <SelectTrigger className="w-full max-w-sm">
                    <SelectValue placeholder="Select a trainer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Trainers</SelectLabel>
                      <SelectItem value="no trainer">No trainer</SelectItem>
                      {trainers?.map((trainer) => (
                        <SelectItem key={trainer.id} value={trainer.email}>
                          {capitalizeFirstLetter(trainer.first_name)}{" "}
                          {trainer.last_name &&
                            capitalizeFirstLetter(trainer.last_name)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6 pb-12">
        <Link
          href={"/app/clients"}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="disabled:bg-gray-500 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default ViewClientPage;
