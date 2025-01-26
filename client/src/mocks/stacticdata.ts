import {
  LayoutDashboardIcon,
  LineChartIcon,
  ShoppingCartIcon,
  SettingsIcon,
  CircleDollarSign,
} from "lucide-react";

export const navlinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Stocks",
    href: "/dashboard/stocks",
    icon: LineChartIcon,
  },
  {
    name: "MarketPlace",
    href: "/dashboard/marketplace",
    icon: ShoppingCartIcon,
  },
  {
    name: "Account",
    href: "#",
    icon: CircleDollarSign,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
];
