// ibi ni filler ntusare

import { useUser } from "../../context/UserContext";
import UsePortfolio from "../../hooks/UsePortfolio";

interface Portfolio {
  quantity: number;
  price: number;
  symbol: string;
  company_name: string;
  total_supply: number;
  current_price: number;
  logo: string;
  holding_id: string;
}

const Avatar = ({
  src,
  alt,
  size,
}: {
  src: string;
  alt: string;
  size: number;
}) => (
  <img
    src={src}
    alt={alt}
    className="rounded-full object-cover"
    style={{ width: `${size}px`, height: `${size}px` }}
  />
);

function StockCard({Portfolio} : {Portfolio : Portfolio}) {
  
  return (
    <div
      className="min-w-[180px] h-[180px] bg-white rounded-xl shadow-sm border border-gray-100 
      transition-all duration-300 ease-in-out hover:shadow-md hover:scale-105 hover:-translate-y-1 
      hover:bg-white/95 cursor-pointer p-5"
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex items-center space-x-3">
          <Avatar
            src={Portfolio.logo}
            alt={Portfolio.symbol}
            size={32}
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{Portfolio.symbol}</h3>
            <p className="text-xs text-gray-500">{Portfolio.company_name}</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-baseline mb-1">
            <p className="text-lg font-bold text-gray-900">{Portfolio.price}RWF</p>
            <span className="text-xs font-medium text-green-600">+2.4%</span>
          </div>
          <p className="text-xs text-gray-500">{Portfolio.quantity} shares</p>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {

  const {user} = useUser()
  const { portfolio } = UsePortfolio(user.id)
  

  return (
    <div className="max-w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-2">My Portfolio</h2>
      <p className="text-gray-600 text-sm mb-4">
        Track and manage your stock investments in one place
      </p>
      <div className="max-w-full overflow-x-auto">
        <div className="flex gap-4 pb-4">
          {/* {[1, 2, 3, 4].map((_, index) => (
            <StockCard key={index} />
          ))} */}
          {portfolio.map((item,index) => {
            return <StockCard key={index} Portfolio={item}/>
          })}
        </div>
      </div>
    </div>
  );
}
