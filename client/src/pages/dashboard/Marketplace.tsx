import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
function Marketplace() {
  
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[200px,1fr] ">
      <div className="hidden md:flex md:flex-col border-r-2 border-blue-500 h-screen">
        <Sidebar/>
      </div>
      
      <div className="w-full grid grid-rows-[100px,1fr]">
        <div className="border-b-2 w-full border-green-400">
          {/* ntushaka kuyigira always on top uzambwire */}
          <Navbar />
        </div>
        <div>blu market</div>
      </div>
    </div>
  );
}

export default Marketplace;
