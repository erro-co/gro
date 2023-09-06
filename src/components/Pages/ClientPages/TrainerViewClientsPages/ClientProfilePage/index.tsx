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
import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";

type UpdateClientProfileErrors =
  | "Value cannot be null"
  | "Email must be of valid email format"
  | "Phone must be of valid phone format"
  | null;

const ViewClientPage: FC = () => {
  const [client, setClient] = useState<User>();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [trainer, setTrainer] = useState<string | null>(null);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [trainers, setTrainers] = useState<User[] | null>(null);
  const [inputError, setInputError] = useState<UpdateClientProfileErrors>(null);

  //ID of the client taken from the URL path
  const clientId = usePathname().split("/")[3];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Send the state data to Supabase for updating
    const { data, error } = await supabase
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        trainer: trainer, // or however you want to handle the trainer selection
      })
      .eq("id", clientId);
    if (error) {
      console.error("Error updating client:", error);
    } else {
      console.log("Client Updated:", data);
      setOpenModal(true);
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    const { data: trainers, error: trainerError } = await supabase
      .from("profiles")
      .select("*")
      .eq("type", "trainer")
      .order("first_name", { ascending: true });

    if (trainerError) {
      console.error("Error getting trainers:", trainerError);
      return;
    }

    const { data: client, error: clientError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", clientId)
      .single();
    if (clientError) {
      console.log("Error getting client:", trainerError);
      return;
    }
    setClient(client as User);
    setFirstName(client?.first_name || "");
    setLastName(client?.last_name || "");
    setEmail(client?.email || "");
    setPhone(client?.phone || "");
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

  useEffect(() => {
    // Check if any fields have been updated compared to the original client data
    if (
      firstName !== client?.first_name ||
      lastName !== client?.last_name ||
      email !== client?.email ||
      phone !== client?.phone ||
      trainer !== client?.trainer
    ) {
      setIsUpdated(true);
    } else {
      setIsUpdated(false);
    }
  }, [firstName, lastName, email, phone, trainer]);

  useEffect(() => {
    console.log("Client Updated:", client);
  }, [client]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>
          Gro | {client?.first_name} {client?.last_name}
        </title>
      </Head>
      <form onSubmit={handleSubmit}>
        <SuccessfulAddNewClientModal
          isOpen={openModal}
          setIsOpen={setOpenModal}
        />
        <div className="space-y-12 sm:space-y-16">
          <div>
            <div className="flex w-full">
              <div className="mx-auto text-gray-300">
                <UserIcon className="w-32" />
                <h2 className="text-center text-2xl font-semibold leading-7 text-gray-900">
                  {capitalizeFirstLetter(client?.first_name || "")}{" "}
                  {capitalizeFirstLetter(client?.last_name || "")}
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
                    type="text"
                    name="first_name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value || "")} // Handle potential null/undefined
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
                    type="text"
                    name="last_name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value || "")}
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
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value || "")}
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
                    type="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value || "")}
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
                  <Select
                    onValueChange={(value) => {
                      setTrainer(value);
                    }}
                    defaultValue={client?.trainer || "no trainer"}
                  >
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue placeholder="Select a trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Trainers</SelectLabel>
                        <SelectItem value="no trainer">No trainer</SelectItem>
                        {trainers?.map((trainer) => (
                          <SelectItem key={trainer.id} value={trainer.id}>
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
            disabled={!isUpdated}
            className={clsx(
              isUpdated
                ? "bg-indigo-600 hover:bg-indigo-500"
                : "bg-gray-500 cursor-not-allowed",
              "disabled:bg-gray-500 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
            )}
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default ViewClientPage;
