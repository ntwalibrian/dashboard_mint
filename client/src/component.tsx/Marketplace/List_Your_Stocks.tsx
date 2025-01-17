import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Portfolio {
  quantity: number;
  price: number;
  symbol: string;
  company_name: string;
  total_supply: number;
  current_price: number;
  logo: string;
}

interface ListYourStocksProps {
  portfolio: Portfolio[];
  fetchPortfolio: () => Promise<void>;
}

export function ListYourStocks({
  portfolio,
  fetchPortfolio,
}: ListYourStocksProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Portfolio | null>(null);
  const [sellingPrice, setSellingPrice] = useState<string>("");
  const [sellingQuantity, setSellingQuantity] = useState<string>("");

  const handleDialogOpen = async () => {
    setIsDialogOpen(true);
    await fetchPortfolio();
  };

  const calculateTotal = () => {
    const price = parseFloat(sellingPrice) || 0;
    const quantity = parseInt(sellingQuantity) || 0;
    return price * quantity;
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FiPlusCircle className="mr-2" />
          List Your Stock
        </CardTitle>
        <CardDescription>Select a Rwandan stock to list</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" onClick={handleDialogOpen}>
              Select Stock to List
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Select a Stock</DialogTitle>
              <DialogDescription>
                Choose a stock from your holdings to list
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              <div className="grid grid-cols-3 gap-3 max-h-[350px] overflow-y-auto p-2">
                {portfolio.length > 0 ? (
                  portfolio.map((stock) => (
                    <div
                      key={stock.symbol}
                      onClick={() => {
                        setSelectedStock(stock);
                        setSellingPrice(stock.current_price.toString());
                        setSellingQuantity("1");
                      }}
                      className={`bg-white rounded-lg border hover:border-primary/50 cursor-pointer
                      transition-all duration-200 hover:shadow-md p-3 flex flex-col
                      hover:scale-105 w-[150px] ${
                        selectedStock?.symbol === stock.symbol
                          ? "border-primary border-2"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                          {stock.logo ? (
                            <img
                              src={stock.logo}
                              alt={stock.symbol}
                              className="w-4 h-4 rounded-full"
                            />
                          ) : (
                            <span className="text-xs font-semibold">
                              {stock.symbol.charAt(0)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-medium bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                          {stock.symbol}
                        </span>
                      </div>

                      <h3
                        className="font-semibold text-xs truncate mb-1"
                        title={stock.company_name}
                      >
                        {stock.company_name}
                      </h3>

                      <div className="mt-auto">
                        <p className="text-xs font-medium text-primary">
                        
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Quantity: {stock.quantity}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-6 text-gray-500">
                    <p className="text-sm">No stocks available</p>
                  </div>
                )}
              </div>

              {selectedStock && (
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={sellingQuantity}
                      onChange={(e) => setSellingQuantity(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="Price (RWF)"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-sm font-medium">Total:</p>
                    <p className="text-lg font-bold text-primary">
                      {new Intl.NumberFormat("en-RW", {
                        style: "currency",
                        currency: "RWF",
                        maximumFractionDigits: 0,
                      }).format(calculateTotal())}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              {selectedStock && (
                <Button
                  onClick={() => {
                    // Handle listing logic here
                    console.log({
                      stock: selectedStock,
                      quantity: sellingQuantity,
                      price: sellingPrice,
                      total: calculateTotal(),
                    });
                    setIsDialogOpen(false);
                  }}
                >
                  List Stock
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
