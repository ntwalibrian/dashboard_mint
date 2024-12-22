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
import axios from "axios";
import { StockData } from "@/data/Stock-data";
import { useEffect } from "react";
// import { useParams } from "react-router-dom";

interface BuyStockPopupProps {
  uid: "";
  stock: StockData;
  isOpen: boolean;
  onClose: () => void;
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
  const [values, setValues] = useState({
    user_id: "",
    stock_id: 0,
    quantity: 0,
    limit_price: 0,
  });

  const handleBuy = () => {
    setValues({
      user_id: uid,
      stock_id: id,
      quantity: quantity,
      limit_price: current_price,
    });

    console.log(uid);
    console.log(values);
    console.log(`Buying ${quantity} shares of ${symbol}`);
    if (
      values.user_id &&
      values.stock_id &&
      values.quantity &&
      values.limit_price
    ) {
      axios
        .post("/api/place_buy_order", values)
        .then((res) => {
          console.log(values);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    onClose();
  };
  // useEffect(() => {
  //   if (
  //     values.user_id &&
  //     values.stock_id &&
  //     values.quantity &&
  //     values.limit_price
  //   ) {
  //     axios
  //       .post("/api/place_buy_order", values)
  //       .then((res) => {
  //         console.log(values);
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     console.log(`Buyingdt ${quantity} shares of ${symbol}`);
  //     onClose();
  //   }
  // }, [values]);

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
