import Sidebar from "../../components/Sidebar";

function Marketplace() {
  
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[200px,1fr] ">
      <div className="hidden md:flex md:flex-col border-r-2 border-blue-500 h-screen">
        <Sidebar/>
      </div>
      <div>market </div>
    </div>
  );
}

export default Marketplace;
