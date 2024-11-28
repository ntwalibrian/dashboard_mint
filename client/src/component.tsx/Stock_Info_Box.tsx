"use client";

import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { Avatar } from "./Avatar";

interface StockInfoBoxProps {
  stockName: string;
  logoSrc: string;
  price: number;
  quantity : number;
  change: number;
  chartData: { name: string; value: number }[];
}

export function StockInfoBox({
  stockName,
  logoSrc,
  price,
  change,
  quantity,
  chartData,
}: StockInfoBoxProps) {
  const isPositive = change >= 0;
  const changeColor = isPositive ? "#22c55e" : "#ef4444";
  const changeIcon = isPositive ? "▲" : "▼";

  return (
    <div className="w-[200px] h-[100px] overflow-hidden bg-slate-100 ">
      <div className="p-2 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar src={logoSrc} alt={`${stockName} Logo`} size={24} />
            <h3 className="text-xs font-bold truncate" title={stockName}>
              {stockName}
            </h3>
          </div>
          {/* <p className={`text-xs font-semibold`} style={{ color: changeColor }}>
            {changeIcon} {Math.abs(change).toFixed(2)}%
          </p> */}
          <p className={`text-xs font-semibold text-blue-600`} >
            {quantity}
          </p>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-sm font-bold">{price}RWF</p>
          <div className="h-[30px] w-[80px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={changeColor}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={changeColor}
                      stopOpacity={0.2}
                    />
                  </linearGradient>
                </defs>
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={changeColor}
                  fill="url(#colorGradient)"
                  strokeWidth={2}
                  fillOpacity={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
