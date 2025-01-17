import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FiAlertTriangle } from "react-icons/fi";
import usePortfolio from "@/hooks/usePortfolio";
import { MarketOverview } from "@/component.tsx/Marketplace/Market_Overview";
import { ListYourStocks } from "@/component.tsx/Marketplace/List_Your_Stocks";
import { MarketplaceListings } from "@/component.tsx/Marketplace/Marketplace_Listings";
interface Props {
  user_id: number;
}

function Marketplace({ user_id }: Props) {
  const { portfolio, fetchPortfolio } = usePortfolio(user_id);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Marketplace</h1>

      <Alert variant="default" className="mb-8">
        <FiAlertTriangle className="h-4 w-4" />
        <AlertTitle>Caution</AlertTitle>
        <AlertDescription>
          All prices are monitored to ensure fairness and transparency in the
          marketplace.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="market" className="mb-12">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="market">
          <div className="space-y-8">
            <div className="flex gap-8">
              <ListYourStocks
                portfolio={portfolio}
                fetchPortfolio={fetchPortfolio}
              />
              <MarketOverview />
            </div>
            <MarketplaceListings />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Marketplace;
