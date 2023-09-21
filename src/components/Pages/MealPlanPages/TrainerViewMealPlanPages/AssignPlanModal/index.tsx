import SearchBarWithAddButton from "@/components/SearchBarWithAddButton";
import { Dialog, Transition } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import SelectClientList from "../CreatePlanPage/AssignUserToPlan/SelectClientTable";

export interface IAddFoodModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  planId: string;
}

const AssignPlanModal: FC<IAddFoodModal> = ({ open, setOpen, planId }) => {
  const [clients, setClients] = useState<User[]>([]);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const supabase = createClientComponentClient<Database>();

  const getAllClients = async () => {
    const { data: clients, error } = await supabase
      .from("profiles")
      .select("*")
      .ilike("first_name", `%${searchTerm}%`)
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
      return null;
    } else {
      setClients(clients as User[]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllClients();
  }, [searchTerm]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed z-100 inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-2 lg:inset-24 z-50 overflow-y-auto rounded-lg">
          <div className="flex">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-full max-w-2xl mx-auto">
                <Dialog.Title
                  as="h2"
                  className="text-xl mb-4 font-semibold leading-6 text-gray-900 text-center"
                >
                  Assign to a Client:
                </Dialog.Title>

                <div className="w-full">
                  <SearchBarWithAddButton
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholder="Search for a client..."
                  />
                </div>
                <SelectClientList
                  clients={clients}
                  setSelectedClient={setSelectedClient}
                  setShowModal={setShowModal}
                  supabase={supabase}
                  planId={planId}
                />
                <Link
                  href={"/app/plans"}
                  className="flex mx-auto w-full lg:w-2/3 p-2 bg-gray-400 font-bold text-white rounded-lg mt-4"
                >
                  <p className="mx-auto">Skip</p>
                </Link>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AssignPlanModal;
