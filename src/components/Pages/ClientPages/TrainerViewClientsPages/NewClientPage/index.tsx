"use client";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { FC, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/supabase";
import { User } from "@/lib/types";
import Loading from "@/components/Loading";
import SuccessfulAddNewClientModal from "@/components/Modals/SuccessfulAddNewClientModal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { capitalizeFirstLetter } from "@/lib/helpers";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const NewClientPage: FC = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<User | null>(null);
  const [trainers, setTrainers] = useState<User[] | null>(null);

  const handleSelectTrainer = (email: string) => {
    if (email === "no trainer") {
      setSelectedTrainer(null);
    }
    const trainer = trainers?.find((trainer) => trainer.email === email);
    if (trainer) {
      setSelectedTrainer(trainer);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const { data: newClient, error } = await supabase.from("user").insert([
      {
        first_name: firstname.toLocaleLowerCase(),
        last_name: lastname.toLocaleLowerCase(),
        email: email.toLocaleLowerCase(),
        phone: phone,
        user_type: 2,
        organisation: 1,
        trainer: selectedTrainer?.id,
        status: "not verified",
      },
    ]);

    if (error) {
      console.log(error);
    }
    setLoading(false);
    setOpenModal(true);
  };

  const getTrainers = async () => {
    const { data: trainers, error } = await supabase
      .from("user")
      .select("*")
      .eq("user_type", 1)
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
      redirect("/dashboard/plans");
    }
    getTrainers();
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
              <UserPlusIcon className="w-32" />
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Add new Client
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
                <Input
                  required
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  type="text"
                  name="firstname"
                />
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
                <Input
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  type="text"
                  name="lastname"
                />
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
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                />
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
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="phone"
                  name="phone"
                />
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
                <Select onValueChange={(value) => handleSelectTrainer(value)}>
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
                          {capitalizeFirstLetter(trainer.last_name)}
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
          href={"/dashboard/clients"}
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

export default NewClientPage;
