import SelectClientMPPage from "@/components/Pages/SelectClientMPPage";
import Head from "next/head";
const AssignMealPlanToUserPage = () => {
  return (
    <>
      <Head>
        <title>Gro - Assign Meal Plan</title>
        <link rel="icon" href="/gro_logo.png" />
      </Head>
      <SelectClientMPPage />
    </>
  );
};

export default AssignMealPlanToUserPage;
