import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import UsePortfolio from "../../hooks/UsePortfolio";
import { useUser } from "../../context/UserContext";
function Dashboard() {
  const {user} =useUser()
  const {portfolio} = UsePortfolio(user.id)
  console.table(portfolio)
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[200px,1fr] ">
      <div className="hidden md:flex md:flex-col border-r-2 border-slate-300 h-screen">
        <Sidebar/>
      </div>
      
      <div className="w-full grid grid-rows-[100px,1fr]">
        <div className="border-b-2 w-full border-slate-300">
          {/* ntushaka kuyigira always on top uzambwire */}
          <Navbar />
        </div>
        <div>blu here main Dashboard</div>
      </div>
    </div>
  )
}

export default Dashboard
