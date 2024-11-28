
import bkIcon from '../assets/bk_icon.jpg';
import bralirwaIcon from '../assets/bralirwa_plc_logo.jpeg';
import equityIcon from '../assets/Equity.png'
import { StockInfoBox } from "./Stock_Info_Box"

const generateChartData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    name: `Day ${i + 1}`,
    value: Math.floor(Math.random() * 1000) + 500
  }))
}

export default function StockCard() {
  return (
    <div className="p-4  ">
      
      <div className="flex flex-wrap gap-4">
        <StockInfoBox
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
      </div>
    </div>
  )
}

