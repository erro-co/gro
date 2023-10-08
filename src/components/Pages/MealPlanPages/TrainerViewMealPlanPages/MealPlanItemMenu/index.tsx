import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EnvelopeIcon,
  TrashIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { FC } from "react";

export interface IMealPlanItemMenu {
  plan: MealPlan;
  setSelectedMealPlan: (plan: MealPlan) => void;
  setOpenConfirmDeleteActionModal: (show: boolean) => void;
  setOpenAssignClientModal: (show: boolean) => void;
}

const MealPlanItemMenu: FC<IMealPlanItemMenu> = ({
  plan,
  setSelectedMealPlan,
  setOpenConfirmDeleteActionModal,
  setOpenAssignClientModal,
}) => {
  const SendEmail = () => {
    console.log("sent");

    try {
      // axios.post("/app/api/send", {
      //   data: {
      //     planId: 0,
      //     firstName: "Lachlan",
      //     clientEmail: "all4trash@pm.me",
      //     trainerFirstName: "Wayne",
      //   },
      // });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="">
        <EllipsisVerticalIcon className="w-5" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button onClick={SendEmail} className="flex">
            <EnvelopeIcon className="w-5 mr-2" />
            Send
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {/* <Link href={`/app/plans/edit/${plan.id}`} className="flex">
            <PencilSquareIcon className="w-5 mr-2" />
            Edit
          </Link> */}
        </DropdownMenuItem>
        {plan.client ? (
          <DropdownMenuItem>
            <UserMinusIcon className="w-5 mr-2" />
            Unassign
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => setOpenAssignClientModal(true)}>
            <UserPlusIcon className="w-5 mr-2" />
            Assign
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() => {
            setSelectedMealPlan(plan);
            setOpenConfirmDeleteActionModal(true);
          }}
        >
          <TrashIcon className="w-5 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MealPlanItemMenu;
