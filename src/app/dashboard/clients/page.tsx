"use client";
import ClientsList from "@/components/ClientsList";

const ClientsPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-12">My Clients</h1>
      <ClientsList />
    </div>
  );
};

export default ClientsPage;
