import "./Mustaaaaard.css";
import StockCard from "../component.tsx/StockCard";
import StockWatchlist from "../component.tsx/StockWishlist";
import PortfolioChart from "@/component.tsx/Portfolio_chart";
import usePortfolio from "@/hooks/usePortfolio";

interface Props {
  user_id: number;
}
function HomeComponent({ user_id }: Props) {
  const { portfolio, error } = usePortfolio(user_id);

  if (error) {
    return <p>portfolio fetching error : {error}</p>;
  } else {
    return (
      <div className="container mx-auto p-4">
        <div>
          <h5 className="text-xl font-bold mb-4">My Portfolio</h5>
          <div className="bg-white rounded-lg shadow-lg border-gray-200 hover:shadow-xl transition-shadow w-full ">
            <StockCard portfolio={portfolio} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-6 w-full max-w-full">
            <div className="h-[500px] col-span-2">
              <PortfolioChart />
            </div>
            <div>
              <StockWatchlist />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
