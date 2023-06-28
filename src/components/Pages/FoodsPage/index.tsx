import Table from "@/components/table";

const FoodsPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-12 text-center lg:text-left">
        Foods
      </h1>
      <div className="px-0 lg:px-6">
        <Table />
      </div>
    </>
  );
};

export default FoodsPage;
