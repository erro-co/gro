import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeFirstLetter } from "@/lib/helpers";
import { FC } from "react";
import { User } from "@/lib/types";

export interface ISelectTrainer {
  trainers: User[] | null;
  setSelectedTrainer: (trainer: User | "All") => void;
  selectedTrainer: User | "All";
}

export const SelectTrainer: FC<ISelectTrainer> = ({
  trainers,
  setSelectedTrainer,
  selectedTrainer,
}) => {
  const handleSelectTrainer = (email: string) => {
    if (email === "All") {
      setSelectedTrainer("All");
    }
    const trainer = trainers?.find((trainer) => trainer.email === email);
    if (trainer) {
      setSelectedTrainer(trainer);
    }
  };
  return (
    <Select
      defaultValue={selectedTrainer === "All" ? "All" : selectedTrainer?.email}
      onValueChange={(value) => handleSelectTrainer(value)}
    >
      <SelectTrigger className="w-full lg:w-fit mt-2 lg:mt-0 lg:mr-2">
        <SelectValue placeholder="Trainer" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem key={"All"} value="All">
            All
          </SelectItem>
          {trainers?.map((trainer) => (
            <SelectItem key={trainer.email} value={trainer.email}>
              {capitalizeFirstLetter(trainer.first_name)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
