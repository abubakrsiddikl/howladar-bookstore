"use client";
import LoadingSppiner from "@/components/LoadingSppiner";
import { useOrderStats } from "@/hooks/useOrderStats";

export default function StoreDashboard() {
  const { stats, loading } = useOrderStats();
  if (loading) {
    return <LoadingSppiner></LoadingSppiner>;
  }
  return (
    <div className="my-9 mx-5">
      <h1 className="uppercase text-2xl font-semibold">Hi welcom back</h1>
      <div className="grid md:grid-cols-2 gap-3">
        {/* toatal order cart */}
        <div className=" flex justify-center items-center gap-3 bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] px-10 py-4 text-center rounded-md text-white">
          <p>{/* <FaSackDollar className="text-2xl " /> */}</p>
          <div>
            <p className="text-3xl font-bold">{stats?.totalOrders} $</p>
            <p className="text-2xl"> Total Order</p>
          </div>
        </div>

        {/* total delivered order cart*/}
        <div className="flex justify-center items-center gap-3 bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] px-3 py-4 text-center rounded-md text-white">
          <p>{/* <FaMale className="text-3xl"></FaMale> */}</p>
          <div>
            <p className="text-3xl font-bold">{stats?.delivered}</p>
            <p className="text-2xl">Total Delivered</p>
          </div>
        </div>
        {/* total processing order cart */}
        <div className=" flex justify-center items-center gap-2 bg-gradient-to-r from-[#FE4880] to-[#FECDE9] px-3 py-4 text-center rounded-md text-white">
          <p>{/* <FaFemale className="text-3xl"></FaFemale> */}</p>
          <div>
            <p className="text-3xl font-bold">{stats?.processing}</p>
            <p className="text-2xl">Total Processing</p>
          </div>
        </div>
        {/* total shipped order cart */}
        <div className=" flex justify-center items-center gap-2 bg-gradient-to-r from-[#6AAEFF] to-[#6AAEFF] px-3 py-4 text-center rounded-md text-white">
          <p>{/* <MdWorkspacePremium className="text-3xl" /> */}</p>
          <div>
            <p className="text-3xl font-bold">{stats?.shipped}</p>
            <p className="text-2xl">Total Shipped</p>
          </div>
        </div>
        {/* total Delivered order cart*/}
        <div className=" flex justify-center items-center gap-3 bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] px-10 py-4 text-center rounded-md text-white">
          <p>{/* <FaDatabase className="text-2xl "></FaDatabase> */}</p>
          <div>
            <p className="text-3xl font-bold">{stats?.cancelled}</p>
            <p className="text-2xl"> Total Cancelled</p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
