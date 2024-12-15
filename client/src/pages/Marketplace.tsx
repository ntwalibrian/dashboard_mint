"use client"

import { useState, useMemo, useCallback } from "react"
import { FiTrendingUp, FiDollarSign, FiPlusCircle, FiUser, FiAlertTriangle, FiStar, FiShoppingCart } from 'react-icons/fi'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

export type Stock = {
  symbol: string;
  name: string;
  currentPrice: number;
}

export type UserHolding = Stock & {
  quantity: number;
}

export type StockListing = {
  symbol: string;
  name: string;
  price: number;
  quantity: number;
  seller: string;
}

export type BuyOrder = {
  symbol: string;
  name: string;
  quantity: number;
  price: number;
  buyer: string;
}

const availableStocks: Stock[] = [
  { symbol: "BK", name: "Bank of Kigali", currentPrice: 270 },
  { symbol: "BRALIRWA", name: "Brasseries et Limonaderies du Rwanda", currentPrice: 124 },
  { symbol: "CRYSTAL", name: "Crystal Telecom", currentPrice: 90 },
  { symbol: "EQTY", name: "Equity Group Holdings", currentPrice: 440 },
  { symbol: "KCB", name: "KCB Group", currentPrice: 370 },
  { symbol: "NMG", name: "Nation Media Group", currentPrice: 1200 },
  { symbol: "RHB", name: "RH Bophelo", currentPrice: 108 },
  { symbol: "USL", name: "Uchumi Supermarket", currentPrice: 45 },
]

const initialUserHoldings: UserHolding[] = availableStocks.map(stock => ({ ...stock, quantity: Math.floor(Math.random() * 100) + 1 }))

function useMarketplace() {
  const [listings, setListings] = useState<StockListing[]>([])
  const [userHoldings, setUserHoldings] = useState<UserHolding[]>(initialUserHoldings)
  const [buyOrders, setBuyOrders] = useState<BuyOrder[]>([])

  const addListing = useCallback((newListing: StockListing) => {
    setListings(prev => [...prev, newListing])
    setUserHoldings(prev => prev.map(holding => 
      holding.symbol === newListing.symbol
        ? { ...holding, quantity: holding.quantity - newListing.quantity }
        : holding
    ).filter(holding => holding.quantity > 0))
  }, [])

  const removeListing = useCallback((symbol: string, seller: string, quantity: number) => {
    setListings(prev => prev.map(listing => 
      listing.symbol === symbol && listing.seller === seller
        ? { ...listing, quantity: listing.quantity - quantity }
        : listing
    ).filter(listing => listing.quantity > 0))
  }, [])

  const updateHoldings = useCallback((symbol: string, quantity: number) => {
    setUserHoldings(prev => {
      const existingHolding = prev.find(holding => holding.symbol === symbol)
      if (existingHolding) {
        return prev.map(holding => 
          holding.symbol === symbol
            ? { ...holding, quantity: holding.quantity + quantity }
            : holding
        )
      } else {
        const newStock = availableStocks.find(stock => stock.symbol === symbol)
        if (newStock) {
          return [...prev, { ...newStock, quantity }]
        }
        return prev
      }
    })
  }, [])

  const addBuyOrder = useCallback((newOrder: BuyOrder) => {
    setBuyOrders(prev => [...prev, newOrder])
  }, [])

  return { listings, userHoldings, buyOrders, addListing, removeListing, updateHoldings, addBuyOrder }
}

export function RwandanP2PStockMarketplace() {
  const { listings, userHoldings, buyOrders, addListing, removeListing, updateHoldings, addBuyOrder } = useMarketplace()
  const [selectedStock, setSelectedStock] = useState<UserHolding | null>(null)
  const [listQuantity, setListQuantity] = useState(1)
  const [listPrice, setListPrice] = useState(0)
  const [buyQuantity, setBuyQuantity] = useState(1)
  const [buyPrice, setBuyPrice] = useState(0)
  const [selectedListing, setSelectedListing] = useState<StockListing | null>(null)
  const { toast } = useToast()
  const [createBuyOrderOpen, setCreateBuyOrderOpen] = useState(false)
  const [selectedBuyStock, setSelectedBuyStock] = useState<Stock | null>(null)

  const marketStats = useMemo(() => {
    const totalListings = listings.length
    const totalMarketValue = listings.reduce((sum, listing) => sum + listing.price * listing.quantity, 0)
    const averagePrice = totalListings > 0 ? totalMarketValue / totalListings : 0
    const totalShares = listings.reduce((sum, listing) => sum + listing.quantity, 0)

    return { totalListings, totalMarketValue, averagePrice, totalShares }
  }, [listings])

  const handleListStock = () => {
    if (selectedStock) {
      const availableQuantity = userHoldings.find(holding => holding.symbol === selectedStock.symbol)?.quantity || 0
      const existingListings = listings.filter(listing => listing.symbol === selectedStock.symbol && listing.seller === 'Current User')
      const totalListedQuantity = existingListings.reduce((sum, listing) => sum + listing.quantity, 0)

      if (listQuantity > availableQuantity - totalListedQuantity) {
        toast({
          title: "Listing Error",
          description: `You can't list more than you own. You have ${availableQuantity - totalListedQuantity} available to list.`,
          variant: "destructive",
        })
        return
      }

      if (listPrice <= 0) {
        toast({
          title: "Listing Error",
          description: "Price must be greater than 0 RWF.",
          variant: "destructive",
        })
        return
      }

      const newListing: StockListing = {
        symbol: selectedStock.symbol,
        name: selectedStock.name,
        price: listPrice,
        quantity: listQuantity,
        seller: 'Current User',
      }
      addListing(newListing)
      setSelectedStock(null)
      setListQuantity(1)
      setListPrice(0)
      toast({
        title: "Stock Listed",
        description: `Successfully listed ${listQuantity} shares of ${selectedStock.symbol} at ${listPrice} RWF each.`,
      })
    }
  }

  const handleBuy = (listing: StockListing) => {
    setSelectedListing(listing)
    setBuyQuantity(1)
    setBuyPrice(listing.price)
  }

  const handlePlaceBuyOrder = () => {
    if (selectedListing) {
      if (buyQuantity <= 0 || buyQuantity > selectedListing.quantity) {
        toast({
          title: "Order Error",
          description: "Invalid order quantity.",
          variant: "destructive",
        })
        return
      }

      if (buyPrice <= 0) {
        toast({
          title: "Order Error",
          description: "Price must be greater than 0 RWF.",
          variant: "destructive",
        })
        return
      }

      const newOrder: BuyOrder = {
        symbol: selectedListing.symbol,
        name: selectedListing.name,
        quantity: buyQuantity,
        price: buyPrice,
        buyer: 'Current User',
      }

      addBuyOrder(newOrder)
      removeListing(selectedListing.symbol, selectedListing.seller, buyQuantity)
      updateHoldings(selectedListing.symbol, buyQuantity)
      
      toast({
        title: "Buy Order Placed",
        description: `You have placed a buy order for ${buyQuantity} shares of ${selectedListing.symbol} at ${buyPrice} RWF each.`,
      })
      
      setSelectedListing(null)
      setBuyQuantity(1)
      setBuyPrice(0)
    }
  }

  const handleCreateBuyOrder = () => {
    if (selectedBuyStock && buyQuantity > 0 && buyPrice > 0) {
      const newOrder: BuyOrder = {
        symbol: selectedBuyStock.symbol,
        name: selectedBuyStock.name,
        quantity: buyQuantity,
        price: buyPrice,
        buyer: 'Current User',
      }

      addBuyOrder(newOrder)
      
      toast({
        title: "Buy Order Placed",
        description: `You have placed a buy order for ${buyQuantity} shares of ${selectedBuyStock.symbol} at ${buyPrice} RWF each.`,
      })
      
      setSelectedBuyStock(null)
      setBuyQuantity(1)
      setBuyPrice(0)
      setCreateBuyOrderOpen(false)
    } else {
      toast({
        title: "Order Error",
        description: "Please fill in all fields correctly.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center text-primary"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      Marketplace
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Alert variant="default" className="mb-8">
          <FiAlertTriangle className="h-4 w-4" />
          <AlertTitle>Caution</AlertTitle>
          <AlertDescription>
            All prices are monitored to ensure fairness and transparency in the marketplace. Any suspicious activity will be investigated.
          </AlertDescription>
        </Alert>
      </motion.div>

      <Tabs defaultValue="market" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="market">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FiPlusCircle className="mr-2" />
                  List Your Stock
                </CardTitle>
                <CardDescription>Select a Rwandan stock to list on the marketplace</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Select Stock to List</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Select a Stock</DialogTitle>
                      <DialogDescription>
                        Choose a Rwandan stock from your holdings to list on the marketplace.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                      {userHoldings.map((holding) => {
                        const existingListings = listings.filter(listing => listing.symbol === holding.symbol && listing.seller === 'Current User')
                        const totalListedQuantity = existingListings.reduce((sum, listing) => sum + listing.quantity, 0)
                        const availableToList = holding.quantity - totalListedQuantity
                        return (
                          <Button
                            key={holding.symbol}
                            onClick={() => setSelectedStock(holding)}
                            variant={selectedStock?.symbol === holding.symbol ? "default" : "outline"}
                            disabled={availableToList <= 0}
                            className="w-full text-left flex flex-col items-start p-2 h-auto"
                          >
                            <span className="font-bold">{holding.symbol}</span>
                            <span className="text-sm truncate w-full">{holding.name}</span>
                            <span className="text-xs text-muted-foreground">Available: {availableToList}</span>
                          </Button>
                        )
                      })}
                      {selectedStock && (
                        <>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="listQuantity" className="text-right">
                              Quantity
                            </Label>
                            <Input
                              id="listQuantity"
                              type="number"
                              min="1"
                              max={selectedStock.quantity}
                              value={listQuantity}
                              onChange={(e) => setListQuantity(Math.max(1, parseInt(e.target.value)))}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="listPrice" className="text-right">
                              Price (RWF)
                            </Label>
                            <Input
                              id="listPrice"
                              type="number"
                              min="0.01"
                              step="0.01"
                              value={listPrice}
                              onChange={(e) => setListPrice(parseFloat(e.target.value))}
                              className="col-span-3"
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <DialogFooter>
                      <Button onClick={handleListStock} disabled={!selectedStock || listPrice <= 0}>List Stock</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FiTrendingUp className="mr-2" />
                  Market Overview
                </CardTitle>
                <CardDescription>Current Rwandan market statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <motion.p 
                      className="text-2xl font-bold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {marketStats.totalListings}
                    </motion.p>
                    <p className="text-sm text-muted-foreground">Active Listings</p>
                  </div>
                  <div className="text-center">
                    <motion.p 
                      className="text-2xl font-bold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {marketStats.totalMarketValue.toFixed(2)} RWF
                    </motion.p>
                    <p className="text-sm text-muted-foreground">Total Market Value</p>
                  </div>
                  <div className="text-center">
                    <motion.p 
                      className="text-2xl font-bold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {marketStats.averagePrice.toFixed(2)} RWF
                    </motion.p>
                    <p className="text-sm text-muted-foreground">Average Price</p>
                  </div>
                  <div className="text-center">
                    <motion.p 
                      className="text-2xl font-bold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {marketStats.totalShares}
                    </motion.p>
                    <p className="text-sm text-muted-foreground">Total Shares</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Available Listings</h3>
            <Dialog open={createBuyOrderOpen} onOpenChange={setCreateBuyOrderOpen}>
              <DialogTrigger asChild>
                <Button>
                  <FiShoppingCart className="mr-2" />
                  Create Buy Order
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Buy Order</DialogTitle>
                  <DialogDescription>
                    Place a new buy order for Rwandan stocks.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="buyStock" className="text-right">
                      Stock
                    </Label>
                    <Select
                      onValueChange={(value) => setSelectedBuyStock(availableStocks.find(stock => stock.symbol === value) || null)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a stock" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableStocks.map((stock) => (
                          <SelectItem key={stock.symbol} value={stock.symbol}>
                            {stock.symbol} - {stock.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="buyQuantity" className="text-right">
                      Quantity
                    </Label>
                    <Input
                      id="buyQuantity"
                      type="number"
                      min="1"
                      value={buyQuantity}
                      onChange={(e) => setBuyQuantity(Math.max(1, parseInt(e.target.value)))}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="buyPrice" className="text-right">
                      Price (RWF)
                    </Label>
                    <Input
                      id="buyPrice"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={buyPrice}
                      onChange={(e) => setBuyPrice(parseFloat(e.target.value))}
                      className="col-span-3"
                    />
                  </div>
                  <AnimatePresence>
                    {selectedBuyStock && buyQuantity > 0 && buyPrice > 0 && (
                      <motion.div
                        className="grid grid-cols-4 items-center gap-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <Label className="text-right">Total Cost</Label>
                        <div className="col-span-3 font-bold text-primary">
                          {(buyQuantity * buyPrice).toFixed(2)} RWF
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateBuyOrder}>Place Buy Order</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FiDollarSign className="mr-2" />
                Available Listings
              </CardTitle>
              <CardDescription>Current Rwandan stock listings in the marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price (RWF)</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((listing, index) => (
                    <motion.tr
                      key={`${listing.symbol}-${listing.seller}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <TableCell className="font-medium">{listing.symbol}</TableCell>
                      <TableCell>{listing.name}</TableCell>
                      <TableCell>{listing.price.toFixed(2)}</TableCell>
                      <TableCell>{listing.quantity}</TableCell>
                      <TableCell>{listing.seller}</TableCell>
                      <TableCell>
                        <Button onClick={() => {
                          setSelectedBuyStock(availableStocks.find(stock => stock.symbol === listing.symbol) || null)
                          setBuyPrice(listing.price)
                          setBuyQuantity(1)
                          setCreateBuyOrderOpen(true)
                        }}>
                          Buy
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FiUser className="mr-2" />
                My Portfolio
              </CardTitle>
              <CardDescription>Your current Rwandan stock holdings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Current Price (RWF)</TableHead>
                    <TableHead>Total Value (RWF)</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userHoldings.map((holding, index) => (
                    <motion.tr
                      key={holding.symbol}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <TableCell className="font-medium">{holding.symbol}</TableCell>
                      <TableCell>{holding.name}</TableCell>
                      <TableCell>{holding.quantity}</TableCell>
                      <TableCell>{holding.currentPrice.toFixed(2)}</TableCell>
                      <TableCell>{(holding.quantity * holding.currentPrice).toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <FiStar className="text-yellow-400 mr-1" />
                          <span>{(Math.random() * 10).toFixed(2)}%</span>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FiDollarSign className="mr-2" />
                My Buy Orders
              </CardTitle>
              <CardDescription>Your current buy orders in the marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price (RWF)</TableHead>
                    <TableHead>Total Value (RWF)</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buyOrders.map((order, index) => (
                    <motion.tr
                      key={`${order.symbol}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <TableCell className="font-medium">{order.symbol}</TableCell>
                      <TableCell>{order.name}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.price.toFixed(2)}</TableCell>
                      <TableCell>{(order.quantity * order.price).toFixed(2)}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                          Pending
                        </span>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
      
    </div>
  )
}

