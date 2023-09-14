import clsx from "clsx";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const NutritionFactsInput: FC = () => {
  const { register, watch } = useFormContext();

  const servingWeight = watch("serving.0.weight");
  const servingName = watch("serving.0.name");

  return (
    <div className="p-4 border w-full sm:max-w-xs rounded-lg shadow-sm">
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
        <div className="text-4xl">
          <input
            {...register("calories", { valueAsNumber: true })}
            id="calories"
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
              {...register("total_fat", { valueAsNumber: true })}
              type="number"
              id="total-fat"
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
              {...register("saturated_fat", { valueAsNumber: true })}
              type="number"
              id="saturated-fat"
              className="w-8 text-right pr-1 focus:placeholder:opacity-0"
              value={0}
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
              {...register("trans_fat", { valueAsNumber: true })}
              type="number"
              id="trans-fat"
              className="w-8 text-right pr-1 focus:placeholder:opacity-0"
              value={0}
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
              {...register("cholesterol", { valueAsNumber: true })}
              type="number"
              id="cholesterol"
              className="w-8 text-right pr-1 focus:placeholder:opacity-0"
              value={0}
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
              {...register("sodium", { valueAsNumber: true })}
              type="number"
              id="sodium"
              className="w-8 text-right pr-1 focus:placeholder:opacity-0"
              value={0}
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
              {...register("total_carbohydrate", { valueAsNumber: true })}
              type="number"
              id="total_carbohydrate"
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
            Fibre<span className="text-red-500 font-bold">*</span>{" "}
            <input
              {...register("fibre", { valueAsNumber: true })}
              type="number"
              id="fibre"
              className="w-8 text-right pr-1"
              placeholder={"0"}
              value={0}
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
              {...register("sugar", { valueAsNumber: true })}
              type="number"
              id="sugar"
              className="w-8 text-right pr-1"
              value={0}
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
              {...register("protein", { valueAsNumber: true })}
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
      {/* <div className="border-t-8 border-black pt-1 text-sm">
        <div className="flex justify-between">
          <div>
            Vitamin D{" "}
            <input
              {...register("vitamin_d", { valueAsNumber: true })}
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
      </div> */}

      {/* <div className="flex w-full">
        <div className="flex mx-auto space-x-2">
          <p className="my-auto text-sm">Per Serve</p>
          <ServingTypeToggle />
          <p className="my-auto text-sm">per 100g</p>
        </div>
      </div> */}
    </div>
  );
};

export default NutritionFactsInput;
