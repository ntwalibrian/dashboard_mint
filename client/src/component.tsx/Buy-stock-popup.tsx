import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { StockData } from "@/data/Stock-data";

import useBuyStock from "@/hooks/useBuyStock";
import useBalance from "@/hooks/useBalance";

interface BuyStockPopupProps {
  uid: "";
  stock: StockData;
  isOpen: boolean;
  onClose: () => void;
}
interface BuyValues {
  user_id: string;
  stock_id: number;
  quantity: number;
  limit_price: number;
}

export function BuyStockPopup({
  uid,
  stock,
  isOpen,
  onClose,
}: BuyStockPopupProps) {
  const [quantity, setQuantity] = useState(1);
  const { id, symbol, company_name, current_price } = stock;
  // const { uid } = useParams();
  const {fetchBalance} = useBalance(uid)

  const { loading, error,success, buyStock } = useBuyStock();
  const handleBuy = () => {
    const values: BuyValues = {
      user_id: uid,
      stock_id: id,
      quantity: quantity,
      limit_price: current_price,
    };

    console.log(uid);
    console.log(values);
    console.log(`Buying ${quantity} shares of ${symbol}`);

    if (
      !values.limit_price ||
      !values.quantity  ||
      !values.stock_id ||
      !values.user_id
    ) {
      console.error("Invalid input values for buying shares:", values);
      return;
    }
    buyStock(values);
    fetchBalance()
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
          <DialogTitle>
            Buy {company_name} ({symbol})
          </DialogTitle>
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
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Price</Label>
            <div className="col-span-3">{formatCurrency(current_price)}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Total</Label>
            <div className="col-span-3 font-bold">
              {formatCurrency(current_price * quantity)}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleBuy}>Buy Shares</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
