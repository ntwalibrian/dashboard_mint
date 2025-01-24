import { 
  LayoutDashboardIcon, 
  LineChartIcon, 
  ShoppingCartIcon, 
  SettingsIcon 
} from "lucide-react";

export const navlinks = [
  { 
    name: "Dashboard", 
    href: "/dashboard", 
    icon: LayoutDashboardIcon 
  },
  {
    name: "Stocks",
    href: "/dashboard/stocks",
    icon: LineChartIcon
  },
  {
    name: "MarketPlace",
    href: "/dashboard/marketplace",
    icon: ShoppingCartIcon
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon
  },
];
