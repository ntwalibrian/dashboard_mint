import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import MarketPlace from "../../components/marketplace/MarketPlace";
function Marketplace() {
  
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[200px,1fr] ">
      <div className="hidden md:flex md:flex-col border-r-2 border-slate-300 h-screen sticky top-0">
        <Sidebar/>
      </div>
      
      <div className="w-full grid grid-rows-[80px,1fr]">
        <div className="border-b-2 w-full border-slate-300 sticky top-0">
          {/* ntushaka kuyigira always on top uzambwire */}
          <Navbar />
        </div>
        <div className="w-full p-4">
          <MarketPlace/>
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
