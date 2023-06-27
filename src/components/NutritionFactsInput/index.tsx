import { FC } from "react";
import ServingTypeToggle from "./ServingTypeToggle";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

const NutritionFactsInput: FC = () => {
  const { register, watch } = useFormContext();

  const servingWeight = watch("servings.0.weight");
  const servingName = watch("servings.0.name");

  return (
    <div className="p-1 border-2 border-black font-sans w-72">
      <div className="text-4xl font-extrabold leading-none">
        Nutrition Facts
      </div>
      <div className="flex justify-between font-bold border-b-8 border-black">
        <div>Serving size</div>
        <div className={clsx(servingName === "" ? "text-gray-400" : "")}>
          1 {servingName === "" ? "serving" : servingName} ({servingWeight || 0}
          g)
        </div>
      </div>
      <div className="flex justify-between items-end font-extrabold">
        <div>
          <div className="font-bold">Amount per serving</div>
          <div className="text-4xl">
            Calories<span className="text-red-500 font-bold">*</span>
          </div>
        </div>
        <div className="text-5xl">
          <input
            {...register("nutrients.calories", { valueAsNumber: true })}
            id="nutrition-calories"
            type="number"
            className="w-28 text-right focus:pr-0 focus:placeholder:opacity-0"
            placeholder={"-"}
            step={0.1}
          />
        </div>
      </div>
      <div className="border-t-4 border-black text-sm pb-1">
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            <span className="font-bold">
              Total Fat<span className="text-red-500 font-bold">*</span>
            </span>{" "}
            <input
              {...register("nutrients.total_fat", { valueAsNumber: true })}
              type="number"
              id="nutrition-total-fat"
              className="w-8 text-right pr-1"
              placeholder={"-"}
              step={0.1}
            />{" "}
            g
          </div>
        </div>
        <hr className="border-gray-500" />
        <div className="pl-4 flex justify-between">
          <div>
            Saturated Fat<span className="text-red-500 font-bold">*</span>{" "}
            <input
              {...register("nutrients.saturated_fat", { valueAsNumber: true })}
              type="number"
              id="nutrition-saturated-fat"
              className="w-8 text-right pr-1 focus:placeholder:opacity-0"
              placeholder={"-"}
              step={0.1}
            />
            g
          </div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div className="pl-4">
            <span className="italic">
              Trans Fat<span className="text-red-500 font-bold">*</span>
            </span>{" "}
            <input
              {...register("nutrients.trans_fat", { valueAsNumber: true })}
              type="number"
              id="nutrition-trans-fat"
              className="w-8 text-right pr-1 focus:placeholder:opacity-0"
              placeholder={"-"}
              step={0.1}
            />
            g
          </div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            <span className="font-bold">
              Cholesterol<span className="text-red-500 font-bold">*</span>
            </span>{" "}
            <input
              {...register("nutrients.cholesterol", { valueAsNumber: true })}
              type="number"
              id="nutrition-cholesterol"
              className="w-8 text-right pr-1 focus:placeholder:opacity-0"
              placeholder={"-"}
              step={0.1}
            />
            mg
          </div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            <span className="font-bold">
              Sodium<span className="text-red-500 font-bold">*</span>
            </span>{" "}
            <input
              {...register("nutrients.sodium", { valueAsNumber: true })}
              type="number"
              id="nutrition-sodium"
              className="w-8 text-right pr-1 focus:placeholder:opacity-0"
              placeholder={"-"}
              step={0.1}
            />
            mg
          </div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            <span className="font-bold">
              Total Carbohydrate
              <span className="text-red-500 font-bold">*</span>
            </span>{" "}
            <input
              {...register("nutrients.total_carbs", { valueAsNumber: true })}
              type="number"
              id="nutrition-total-carbs"
              className="w-8 text-right pr-1"
              placeholder={"-"}
              step={0.1}
            />{" "}
            g
          </div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div className="pl-4">
            Fiber<span className="text-red-500 font-bold">*</span>{" "}
            <input
              {...register("nutrients.fiber", { valueAsNumber: true })}
              type="number"
              id="nutrition-dietary-fiber"
              className="w-8 text-right pr-1"
              placeholder={"-"}
              step={0.1}
            />
            g
          </div>
        </div>
        <hr className="border-gray-500" />
        <div className=" flex justify-between">
          <div className="pl-4">
            Sugar<span className="text-red-500 font-bold">*</span>{" "}
            <input
              {...register("nutrients.sugar", { valueAsNumber: true })}
              type="number"
              id="nutrition-total-sugar"
              className="w-8 text-right pr-1"
              placeholder={"-"}
              step={0.1}
            />
            g
          </div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div className="">
            <span className="font-bold">
              Protein<span className="text-red-500 font-bold">*</span>
            </span>{" "}
            <input
              {...register("nutrients.protein", { valueAsNumber: true })}
              type="number"
              id="nutrition-protein"
              className="w-8 text-right pr-1"
              placeholder={"-"}
              step={0.1}
            />
            g
          </div>
        </div>
      </div>
      <div className="border-t-8 border-black pt-1 text-sm">
        <div className="flex justify-between">
          <div>
            Vitamin D{" "}
            <input
              {...register("nutrients.vitamin_d", { valueAsNumber: true })}
              type="number"
              className="w-8 text-right pr-1"
              placeholder={"-"}
              step={0.1}
            />
            mcg
          </div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            Calcium{" "}
            <input
              {...register("nutrients.calcium", { valueAsNumber: true })}
              type="number"
              className="w-8 text-right pr-1"
              placeholder={"-"}
              step={0.1}
            />
            mg
          </div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            Iron{" "}
            <input
              {...register("nutrients.iron", { valueAsNumber: true })}
              type="number"
              className="w-8 text-right pr-1"
              placeholder={"-"}
              step={0.1}
            />
            mg
          </div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            Potassium{" "}
            <input
              {...register("nutrients.potassium", { valueAsNumber: true })}
              type="number"
              className="w-8 text-right pr-1"
              placeholder={"-"}
              step={0.1}
            />
            mg
          </div>
        </div>
        <div className="border-t-4 border-black flex leading-none text-xs pt-2 pb-1"></div>
      </div>

      <div className="flex w-full">
        <div className="flex mx-auto space-x-2">
          <p className="my-auto text-sm">Per Serve</p>
          <ServingTypeToggle />
          <p className="my-auto text-sm">per 100g</p>
        </div>
      </div>
    </div>
  );
};

export default NutritionFactsInput;
