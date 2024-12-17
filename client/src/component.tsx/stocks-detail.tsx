import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StockAvatar } from "./Stocks-avatar";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { StockData } from "@/data/Stock-data";
import { Separator } from "@/components/ui/separator";
import StockChart from "./Stocks-chart";
import { BuyStockPopup } from "./Buy-stock-popup";

interface StockDetailsProps {
  stock: StockData;
  isOpen: boolean;
  onClose: () => void;
}

export function StockDetails({ stock, isOpen, onClose }: StockDetailsProps) {
  const [isBuyPopupOpen, setIsBuyPopupOpen] = useState(false);
  const { symbol, company_name, current_price, change } = stock;
  const isPositive = change >= 0;

  const formatCurrency = (value: number): string => {
    try {
      return new Intl.NumberFormat("en-RW", {
        style: "currency",
        currency: "RWF",
        maximumFractionDigits: 0,
      }).format(value);
    } catch (error) {
      console.error("Error formatting currency:", error);
      return `RWF ${value}`;
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] w-full overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <StockAvatar symbol={symbol} name={company_name} />
              <span>
                {company_name} ({symbol})
              </span>
            </DialogTitle>
            <DialogDescription>
              Detailed information about {company_name} stock
            </DialogDescription>
          </DialogHeader>

          {current_price && (
            <StockChart totalPortfolio={current_price * 1000} />
          )}

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Stock Information</h3>
                <p>
                  <span className="font-medium">Current Price:</span>{" "}
                  {formatCurrency(current_price)}
                </p>
                <p
                  className={`flex items-center ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <span className="font-medium text-foreground">Change:</span>
                  {isPositive ? (
                    <ArrowUpIcon
                      className="w-4 h-4 mx-1"
                      aria-label="increase"
                    />
                  ) : (
                    <ArrowDownIcon
                      className="w-4 h-4 mx-1"
                      aria-label="decrease"
                    />
                  )}
                  {Math.abs(change).toFixed(2)}%
                </p>
                <p>
                  <span className="font-medium">Market Cap:</span>{" "}
                  {formatCurrency(stock.marketCap)}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Company Overview</h3>
                <p>
                  <span className="font-medium">CEO:</span> {stock.ceo}
                </p>
                <p>
                  <span className="font-medium">Founded:</span> {stock.founded}
                </p>
                <p>
                  <span className="font-medium">Headquarters:</span>{" "}
                  {stock.headquarters}
                </p>
                <p>
                  <span className="font-medium">Employees:</span>{" "}
                  {stock.employees.toLocaleString()}
                </p>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Financial Information</h3>
              <p>
                <span className="font-medium">Revenue:</span>{" "}
                {formatCurrency(stock.revenue)}
              </p>
              <p>
                <span className="font-medium">Net Income:</span>{" "}
                {formatCurrency(stock.netIncome)}
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Company Description</h3>
              <p>{stock.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Additional Information</h3>
              <p>
                <span className="font-medium">Industry:</span> {stock.industry}
              </p>
              <p>
                <span className="font-medium">Website:</span>{" "}
                <a
                  href={stock.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                  aria-label={`Visit ${company_name} website`}
                >
                  {stock.website}
                </a>
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onClose}>Close</Button>
            <Button variant="default" onClick={() => setIsBuyPopupOpen(true)}>
              Buy Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <BuyStockPopup
        stock={stock}
        isOpen={isBuyPopupOpen}
        onClose={() => setIsBuyPopupOpen(false)}
      />
    </>
  );
}