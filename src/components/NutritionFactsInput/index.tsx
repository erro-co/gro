import { FC, useState } from "react";
import ServingTypeToggle from "./ServingTypeToggle";

export interface INutritionFacts {}

interface Nutrition {
  servingsPerContainer: number;
  servingSize: string;
  calories: number;
  nutrients: {
    name: string;
    quantity: string;
    dailyValue: number;
  }[];
}

const NutritionFactsInput: FC = () => {
  const [nutritionFacts, setNutritionFacts] = useState<Nutrition>({
    servingsPerContainer: 8,
    servingSize: "2/3 cup (55g)",
    calories: 45,
    nutrients: [
      { name: "Total Fat", quantity: "8g", dailyValue: 10 },
      { name: "Saturated Fat", quantity: "1g", dailyValue: 5 },
      { name: "Trans Fat", quantity: "8g", dailyValue: 0 },
      { name: "Cholesterol", quantity: "0mg", dailyValue: 0 },
      { name: "Sodium", quantity: "160mg", dailyValue: 7 },
      { name: "Total Carbohydrate", quantity: "37g", dailyValue: 13 },
      { name: "Dietary Fiber", quantity: "4g", dailyValue: 14 },
      { name: "Total Sugar", quantity: "12g", dailyValue: 0 },
      { name: "Includes 10g Added Sugars", quantity: "", dailyValue: 20 },
      { name: "Protein", quantity: "3g", dailyValue: 0 },
      { name: "Vitamin D", quantity: "2mcg", dailyValue: 10 },
      { name: "Calcium", quantity: "260mg", dailyValue: 20 },
      { name: "Iron", quantity: "8mg", dailyValue: 45 },
      { name: "Potassium", quantity: "240mg", dailyValue: 6 },
    ],
  });

  return (
    <div className="p-1 border-2 border-black font-sans w-72">
      <div className="text-4xl font-extrabold leading-none">
        Nutrition Facts
      </div>
      <div className="flex justify-between font-bold border-b-8 border-black">
        <div>Serving size</div>
        <div>2/3 cup (55g)</div>
      </div>
      <div className="flex justify-between items-end font-extrabold">
        <div>
          <div className="font-bold">Amount per serving</div>
          <div className="text-4xl">Calories</div>
        </div>
        <div className="text-5xl">
          <input
            id="nutrition-calories"
            type="text"
            className="w-16"
            placeholder={"-"}
          />
        </div>
      </div>
      <div className="border-t-4 border-black text-sm pb-1">
        <div className="text-right font-bold pt-1 pb-1">% Daily value*</div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            <span className="font-bold">Total Fat</span>{" "}
            <input
              type="text"
              id="nutrition-total-fat"
              className="w-8 text-right pr-1"
              placeholder={"-"}
            />
            g
          </div>
          <div className="font-bold">10%</div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            Saturated Fat{" "}
            <input
              type="text"
              id="nutrition-saturated-fat"
              className="w-8 text-right pr-1"
              placeholder={"-"}
            />
            g
          </div>
          <div className="font-bold">5%</div>
        </div>
        <hr className="border-gray-500" />
        <div>
          <span className="italic">Trans Fat</span>{" "}
          <input
            type="text"
            id="nutrition-trans-fat"
            className="w-8 text-right pr-1"
            placeholder={"-"}
          />
          g
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            <span className="font-bold">Cholesterol</span>{" "}
            <input
              type="text"
              id="nutrition-cholesterol"
              className="w-8 text-right pr-1"
              placeholder={"-"}
            />
            mg
          </div>
          <div className="font-bold">0%</div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            <span className="font-bold">Sodium</span>{" "}
            <input
              type="text"
              id="nutrition-sodium"
              className="w-8 text-right pr-1"
              placeholder={"-"}
            />
            mg
          </div>
          <div className="font-bold">7%</div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            <span className="font-bold">Total Carbohydrate</span>{" "}
            <input
              type="text"
              id="nutrition-total-carbohydrate"
              className="w-8 text-right pr-1"
              placeholder={"-"}
            />
            g
          </div>
          <div className="font-bold">13%</div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div className="pl-4">
            Dietary Fiber{" "}
            <input
              type="text"
              id="nutrition-dietary-fiber"
              className="w-8 text-right pr-1"
              placeholder={"-"}
            />
            g
          </div>
          <div className="font-bold">14%</div>
        </div>
        <hr className="border-gray-500" />
        <div className="pl-4">
          Total Sugar{" "}
          <input
            type="text"
            id="nutrition-total-sugar"
            className="w-8 text-right pr-1"
            placeholder={"-"}
          />
          g
        </div>
        <hr className="border-gray-500" />
        <div>
          <span className="font-bold">Protein</span>{" "}
          <input
            type="text"
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
              type="text"
              className="w-8 text-right pr-1"
              placeholder={"-"}
            />
            mcg
          </div>
          <div>10%</div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            Calcium{" "}
            <input
              type="text"
              className="w-8 text-right pr-1"
              placeholder={"-"}
            />
            mg
          </div>
          <div>20%</div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            Iron{" "}
            <input
              type="text"
              className="w-8 text-right pr-1"
              placeholder={"-"}
            />
            mg
          </div>
          <div>45%</div>
        </div>
        <hr className="border-gray-500" />
        <div className="flex justify-between">
          <div>
            Potassium{" "}
            <input
              type="text"
              className="w-8 text-right pr-1"
              placeholder={"-"}
            />
            mg
          </div>
          <div>6%</div>
        </div>
        <div className="border-t-4 border-black flex leading-none text-xs pt-2 pb-1">
          <div className="pr-1">*</div>
          <div>
            The % Daily Value (DV) tells you how much a nutrient in a serving of
            food contributes to a daily diet. 2,000 calories a day is used for
            general nutrition advice.
          </div>
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
