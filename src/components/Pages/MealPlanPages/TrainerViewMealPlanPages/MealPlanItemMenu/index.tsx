import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PencilSquareIcon,
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
}

const MealPlanItemMenu: FC<IMealPlanItemMenu> = ({
  plan,
  setSelectedMealPlan,
  setOpenConfirmDeleteActionModal,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="">
        <EllipsisVerticalIcon className="w-5" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <PencilSquareIcon className="w-5 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          {plan.client ? (
            <>
              <UserMinusIcon className="w-5 mr-2" />
              Unassign
            </>
          ) : (
            <>
              <UserPlusIcon className="w-5 mr-2" />
              Assign
            </>
          )}
        </DropdownMenuItem>
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
