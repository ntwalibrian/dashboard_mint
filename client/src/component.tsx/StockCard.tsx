
import { StockInfoCard } from "./Stock_Info_Box";
interface Portfolio {
  quantity: number;
  price: number;
  symbol: string;
  company_name: string;
  total_supply: number;
  current_price: number;
  logo: string;
}
interface StockCardProps {
  portfolio: Portfolio[];
}

const generateChartData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    name: `Day ${i + 1}`,
    value: Math.floor(Math.random() * 1000) + 500,
  }));
};

export default function StockCard({ portfolio }: StockCardProps) {
  return (
    <div className="p-4  ">
      <div className="flex flex-wrap gap-4 flex-row">
        {portfolio.map((item, index) => (
          <StockInfoCard
            key={index}
            stockName={item.company_name}
            logoSrc={item.logo}
            price={item.price}
            change={0.4}
            quantity={item.quantity}
            chartData={generateChartData()}
          />
        ))}
        {/* <StockInfoBox
          stockName="BK"
          logoSrc={bkIcon}
          price={150689.25}
          change={2.5}
          chartData={generateChartData()}
        />
        <StockInfoBox
          stockName="Bralirwa"
          logoSrc={bralirwaIcon}
          price={305987.75}
          change={0.8}
          chartData={generateChartData()}
        />
        <StockInfoBox
          stockName="Equity"
          logoSrc={equityIcon}
          price={275078.15}
          change={1.2}
          chartData={generateChartData()}
        />
        <StockInfoBox
          stockName="Equity"
          logoSrc={equityIcon}
          price={275078.15}
          change={1.2}
          chartData={generateChartData()}
        />
        <StockInfoBox
          stockName="Equity"
          logoSrc={equityIcon}
          price={275078.15}
          change={1.2}
          chartData={generateChartData()}
        />
        <StockInfoBox
          stockName="Equity"
          logoSrc={equityIcon}
          price={275078.15}
          change={1.2}
          chartData={generateChartData()}
        />
        <StockInfoBox
          stockName="Equity"
          logoSrc={equityIcon}
          price={275078.15}
          change={1.2}
          chartData={generateChartData()}
        /> */}
      </div>
    </div>
  );
}
