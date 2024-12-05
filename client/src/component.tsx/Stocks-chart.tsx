'use client'

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const timeRanges = ['24h', '1W', '1M', '1Y', 'All'];

export default function StockChart({totalPortfolio} : {totalPortfolio: number}) {
  const [percentageChange, setPercentageChange] = React.useState(2.5);
  const [activeRange, setActiveRange] = React.useState('All');

  return (
    <div className="w-full h-[400px] mx-auto mb-6">
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="flex-none">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold">Stock Performance</CardTitle>
            <div className="text-right">
              <div className="flex items-center justify-end">
                <span className="text-xl font-bold mr-2">RWF {totalPortfolio.toLocaleString()}</span>
                <span
                  className={`text-sm font-medium ${
                    percentageChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {percentageChange >= 0 ? '+' : ''}
                  {percentageChange.toFixed(2)}%
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {timeRanges.map((range) => (
              <Button
                key={range}
                variant={activeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  color: 'hsl(var(--foreground))',
                }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(142, 76%, 90%)"
                fillOpacity={0.8}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

