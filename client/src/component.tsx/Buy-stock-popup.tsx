import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StockData } from "@/data/Stock-data";

interface BuyStockPopupProps {
  stock: StockData;
  isOpen: boolean;
  onClose: () => void;
}

export function BuyStockPopup({ stock, isOpen, onClose }: BuyStockPopupProps) {
  const [quantity, setQuantity] = useState(1);
  const { symbol, company_name, current_price } = stock;

  const handleBuy = () => {
    // Here you would implement the actual stock purchase logic
    console.log(`Buying ${quantity} shares of ${symbol}`);
    onClose();
  };

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy {company_name} ({symbol})</DialogTitle>
          <DialogDescription>
            Enter the number of shares you want to purchase.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Price</Label>
            <div className="col-span-3">{formatCurrency(current_price)}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Total</Label>
            <div className="col-span-3 font-bold">{formatCurrency(current_price * quantity)}</div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleBuy}>Buy Shares</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}