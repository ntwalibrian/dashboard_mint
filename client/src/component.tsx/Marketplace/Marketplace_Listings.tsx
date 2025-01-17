import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Listing {
  id: number;
  symbol: string;
  company_name: string;
  quantity: number;
  price: number;
  date: string;
  seller: string;
  status: "active" | "sold" | "cancelled";
}

export function MarketplaceListings() {
  const listings: Listing[] = []; // Empty array for now, will be populated from API later

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Active Listings</CardTitle>
      </CardHeader>
      <CardContent>
        {listings.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stock</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price per Share</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Listed Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{listing.symbol}</p>
                      <p className="text-sm text-muted-foreground">
                        {listing.company_name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{listing.seller}</TableCell>
                  <TableCell>{listing.quantity}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("en-RW", {
                      style: "currency",
                      currency: "RWF",
                      maximumFractionDigits: 0,
                    }).format(listing.price)}
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("en-RW", {
                      style: "currency",
                      currency: "RWF",
                      maximumFractionDigits: 0,
                    }).format(listing.price * listing.quantity)}
                  </TableCell>
                  <TableCell>
                    {new Date(listing.date).toLocaleDateString("en-RW", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                      ${
                        listing.status === "active"
                          ? "bg-green-100 text-green-700"
                          : listing.status === "sold"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {listing.status.charAt(0).toUpperCase() +
                        listing.status.slice(1)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No stocks currently listed in the marketplace</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
