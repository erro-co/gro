import { FC, useEffect, useState } from "react";
import ServingTypeToggle from "./ServingTypeToggle";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

const NutritionFactsInput: FC = () => {
  const { register, watch } = useFormContext();

  const [totalFat, setTotalFat] = useState<number>(0);
  const [totalCarbs, setTotalCarbs] = useState<number>(0);
  const servingGrams = watch("servings.0.grams");
  const servingMeasure = watch("servings.0.measure");
  const saturatedFat = watch("nutrition.saturatedFat");
  const transFat = watch("nutrition.transFat");
  const fiber = watch("nutrition.fiber");
  const sugar = watch("nutrition.sugar");

  useEffect(() => {
    setTotalCarbs((fiber || 0) + (sugar || 0));
  }, [fiber, sugar]);

  useEffect(() => {
    setTotalFat((saturatedFat || 0) + (transFat || 0));
  }, [saturatedFat, transFat]);

  return (
    <div className="p-1 border-2 border-black font-sans w-72">
      <div className="text-4xl font-extrabold leading-none">
        Nutrition Facts
      </div>
      <div className="flex justify-between font-bold border-b-8 border-black">
        <div>Serving size</div>
        <div className={clsx(servingMeasure === "" ? "text-gray-400" : "")}>
          1 {servingMeasure === "" ? "serving" : servingMeasure} (
          {servingGrams || 0}g)
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
            {...register("nutrition.calories", { valueAsNumber: true })}
            id="nutrition-calories"
            type="number"
            className="w-24 text-right pr-8 focus:pr-0 focus:placeholder:opacity-0"
            placeholder={"-"}
          />
        </div>
      </div>
      <div className="border-t-4 border-black text-sm pb-1">
        {/* <div className="text-right font-bold pt-1 pb-1">% Daily value*</div> */}
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            <span className="font-bold">Total Fat</span> {totalFat} g
          </div>
          {/* <div className="font-bold">10%</div> */}
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            Saturated Fat<span className="text-red-500 font-bold">*</span>{" "}
            <input
              {...register("nutrition.saturatedFat", { valueAsNumber: true })}
              type="number"
              id="nutrition-saturated-fat"
              className="w-8 text-right pr-1 focus:placeholder:opacity-0"
              placeholder={"-"}
            />
            g
          </div>
          {/* <div className="font-bold">5%</div> */}
        </div>
        <hr className="border-gray-500" />
        <div>
          <span className="italic">
            Trans Fat<span className="text-red-500 font-bold">*</span>
          </span>{" "}
          <input
            {...register("nutrition.transFat", { valueAsNumber: true })}
            type="number"
            id="nutrition-trans-fat"
            className="w-8 text-right pr-1 focus:placeholder:opacity-0"
            placeholder={"-"}
          />
          g
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            <span className="font-bold">
              Cholesterol<span className="text-red-500 font-bold">*</span>
            </span>{" "}
            <input
              {...register("nutrition.cholesterol", { valueAsNumber: true })}
              type="number"
              id="nutrition-cholesterol"
              className="w-8 text-right pr-1 focus:placeholder:opacity-0"
              placeholder={"-"}
            />
            mg
          </div>
          {/* <div className="font-bold">0%</div> */}
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            <span className="font-bold">
              Sodium<span className="text-red-500 font-bold">*</span>
            </span>{" "}
            <input
              {...register("nutrition.sodium", { valueAsNumber: true })}
              type="number"
              id="nutrition-sodium"
              className="w-8 text-right pr-1 focus:placeholder:opacity-0"
              placeholder={"-"}
            />
            mg
          </div>
          {/* <div className="font-bold">7%</div> */}
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            <span className="font-bold">Total Carbohydrate</span> {totalCarbs} g
          </div>
          {/* <div className="font-bold">13%</div> */}
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div className="pl-4">
            Fiber<span className="text-red-500 font-bold">*</span>{" "}
            <input
              {...register("nutrition.fiber", { valueAsNumber: true })}
              type="number"
              id="nutrition-dietary-fiber"
              className="w-8 text-right pr-1"
              placeholder={"-"}
            />
            g
          </div>
          {/* <div className="font-bold">14%</div> */}
        </div>
        <hr className="border-gray-500" />
        <div className="pl-4">
          Sugar<span className="text-red-500 font-bold">*</span>{" "}
          <input
            {...register("nutrition.sugar", { valueAsNumber: true })}
            type="number"
            id="nutrition-total-sugar"
            className="w-8 text-right pr-1"
            placeholder={"-"}
          />
          g
        </div>
        <hr className="border-gray-500" />
        <div>
          <span className="font-bold">
            Protein<span className="text-red-500 font-bold">*</span>
          </span>{" "}
          <input
            {...register("nutrition.protein", { valueAsNumber: true })}
            type="number"
            id="nutrition-protein"
            className="w-8 text-right pr-1"
            placeholder={"-"}
          />
          g
        </div>
      </div>
      <div className="border-t-8 border-black pt-1 text-sm">
        <div className="flex justify-between">
          <div>
            Vitamin D{" "}
            <input
              {...register("nutrition.vitaminD", { valueAsNumber: true })}
              type="number"
              className="w-8 text-right pr-1"
              placeholder={"-"}
            />
            mcg
          </div>
          {/* <div>10%</div> */}
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            Calcium{" "}
            <input
              {...register("nutrition.calcium", { valueAsNumber: true })}
              type="number"
              className="w-8 text-right pr-1"
              placeholder={"-"}
            />
            mg
          </div>
          {/* <div>20%</div> */}
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            Iron{" "}
            <input
              {...register("nutrition.iron", { valueAsNumber: true })}
              type="number"
              className="w-8 text-right pr-1"
              placeholder={"-"}
            />
            mg
          </div>
          {/* <div>45%</div> */}
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            Potassium{" "}
            <input
              {...register("nutrition.potassium", { valueAsNumber: true })}
              type="number"
              className="w-8 text-right pr-1"
              placeholder={"-"}
            />
            mg
          </div>
          {/* <div>6%</div> */}
        </div>
        <div className="border-t-4 border-black flex leading-none text-xs pt-2 pb-1">
          {/* <div className="pr-1">*</div> */}
          {/* <div>
            The % Daily Value (DV) tells you how much a nutrient in a serving of
            food contributes to a daily diet. 2,000 calories a day is used for
            general nutrition advice.
          </div> */}
        </div>
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
