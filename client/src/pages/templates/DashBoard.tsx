import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
interface Portfolio {
  quantity: number;
  price: number;
  symbol: string;
  company_name: string;
  total_supply: number;
  current_price: number;
}
function DashBoard() {
  const { id } = useParams();
  const [data, setData] = useState<Portfolio[]>([]);
  const location = useLocation();
  const user = location.state?.user;

  useEffect(() => {
    axios
      .get(`/api/get_portfolio/${id}`)
      .then((res) => {
        console.log(res);
        setData(res.data.rows);
        console.log("data array bellow");
        console.log(data);
        console.log(res.data.rows);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
      });
  }, [id]);
  useEffect(() => {
    setTimeout(() => {
      console.log("after wait");
      console.log(data);
      console.log(data[0].quantity);
    }, 7000);
  });

  return (
    <div className="text-center justify-items-center">
      <div className="text-3xl">user_id : {user.id}</div>
      <div className="text-red-800 text-4xl border-b-2 border-blue-800">
        {user.username}
      </div>
      <div className="w-9 h-9 bg-slate-700 mt-3"></div>
      <form>
        <table>
          <thead>
            <th className="px-4">Symbol</th>
            <th className="px-4">Name</th>
            <th className="px-4">Price</th>
            <th className="px-4">Ammount owned</th>
            <th className="px-4">current_price</th>
            <th className="px-4">current_supply</th>
            <th className="px-4">Actions</th>
          </thead>
          <tbody>
            {data.map((item,index) => (
              <tr key={index}>
                <td className="px-2">{item.symbol}</td>
                <td className="px-2">{item.company_name}</td>
                <td className="px-2">{item.price}</td>
                <td className="px-2">{item.quantity}</td>
                <td className="px-2">{item.current_price}</td>
                <td className="px-2">{item.total_supply}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default DashBoard;
