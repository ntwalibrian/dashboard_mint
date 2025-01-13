import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

import { StockData } from "@/data/Stock-data";
import useBuyStock from "@/hooks/useBuyStock";
import useBalance from "@/hooks/useBalance";

interface BuyStockPopupProps {
  uid: string;
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
  const [validationError, setValidationError] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { id, symbol, company_name, current_price } = stock;
  const { fetchBalance, balance } = useBalance(uid);
  const { toast } = useToast();
  const { loading, error, success, buyStock } = useBuyStock();

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setValidationError("");
      setShowSuccessAlert(false);
    }
  }, [isOpen]);

  const validatePurchase = (): boolean => {
    const totalCost = current_price * quantity;
    
    if (!quantity || quantity < 1) {
      setValidationError("Quantity must be at least 1");
      return false;
    }
    
    if (totalCost > balance) {
      setValidationError("Insufficient balance for this purchase");
      return false;
    }
    
    if (!uid || !id) {
      setValidationError("Invalid user or stock information");
      return false;
    }
    
    setValidationError("");
    return true;
  };

  const handleBuy = async () => {
    if (!validatePurchase()) return;

    const values: BuyValues = {
      user_id: uid,
      stock_id: id,
      quantity: quantity,
      limit_price: current_price,
    };

    try {
      await buyStock(values);
      await fetchBalance();
      
      // Show success toast
      toast({
        title: "Purchase Successful",
        description: `Successfully bought ${quantity} shares of ${symbol}`,
        variant: "default",
        duration: 5000,
        action: (
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            <span>Total: {formatCurrency(current_price * quantity)}</span>
          </div>
        ),
      });
      
      setShowSuccessAlert(true);
      // Close dialog after a brief delay to show success state
      setTimeout(() => {
        onClose();
        setShowSuccessAlert(false);
      }, 2000);
    } catch (err) {
      // Show error toast
      toast({
        title: "Purchase Failed",
        description: error || "Failed to complete the purchase. Please try again.",
        variant: "destructive",
        duration: 7000,
        action: (
          <div className="flex items-center">
            <XCircle className="w-4 h-4 text-red-500 mr-2" />
            <span>Error details: {error || "Unknown error"}</span>
          </div>
        ),
      });
    }
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Buy {company_name} ({symbol})
          </DialogTitle>
          <DialogDescription>
            Enter the number of shares you want to purchase.
          </DialogDescription>
        </DialogHeader>
        
        {showSuccessAlert && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            <AlertDescription className="text-green-700">
              Purchase successful! Closing dialog...
            </AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert variant="destructive">
            <XCircle className="w-4 h-4 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          {validationError && (
            <Alert variant="destructive">
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <div className="col-span-3">
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setQuantity(value > 0 ? value : 1);
                }}
                min="1"
                disabled={loading}
                className="col-span-3"
              />
              <p className="text-sm text-gray-500 mt-1">
                Available Balance: {formatCurrency(balance)}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Price</Label>
            <div className="col-span-3">{formatCurrency(current_price)}</div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Total</Label>
            <div className="col-span-3">
              <span className="font-bold">
                {formatCurrency(current_price * quantity)}
              </span>
              {current_price * quantity > balance && (
                <p className="text-sm text-red-500 mt-1">
                  Exceeds available balance
                </p>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleBuy} 
            disabled={loading || !!validationError || current_price * quantity > balance}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Buy Shares'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BuyStockPopup;