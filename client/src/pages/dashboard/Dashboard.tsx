import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Portfolio from "../../components/dashboard/Portfolio";
import UseListings from "../../hooks/UseListings";
import BalanceCard from "../../components/dashboard/Balance";
function Dashboard() {
  const { stocks } = UseListings();
  console.table(stocks);
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[200px,1fr] ">
      <div className="hidden md:flex md:flex-col border-r-2 border-slate-300 h-screen">
        <Sidebar />
      </div>

      <div className="w-full grid grid-rows-[80px,1fr]">
        <div className="border-b-2 w-full border-slate-300 sticky top-0 z-50 bg-white">
          <Navbar />
        </div>
        <div className="p-4 font-bold ">
          <Portfolio />
        </div>
        <BalanceCard/>
      </div>
    </div>
  );
}

export default Dashboard;
