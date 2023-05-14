import Link from "next/link";

const PlansIndexPage = () => {
  return (
    <div>
      PlansIndexPage
      <button className="bg-green-500 text-white p-2 rounded-md">
        <Link href="/dashboard/plans/add">Add new Plan</Link>
      </button>
    </div>
  );
};

export default PlansIndexPage;
