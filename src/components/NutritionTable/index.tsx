import React from "react";

const NutritionLabel = () => {
  return (
    <div className="max-w-[300px] bg-white border border-black">
      <div className="bg-gray-300 py-1">
        <div className="text-center font-bold">Label</div>
      </div>
      <div className="p-2">
        <div className="text-sm text-center font-bold">
          Nutrition Information
        </div>
        <div className="max-w-[270px] m-1.5">Serving Size: 100g</div>
        <table className="border-b-2 border-collapse border-t-2">
          <tbody>
            <tr className="border-b border-black text-sm">
              <td colSpan={2}>
                <div className="inline-block float-right">
                  <span>Average Quantity</span>
                  <br />
                  <span>Per Serving</span>
                </div>
                <td align="right" colSpan={1}>
                  %Daily Intake*
                </td>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="text-left">
                <div className="inline-block">
                  <div className="font-bold">Energy</div>
                </div>
                <div className="inline-block float-right">
                  <div></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NutritionLabel;
