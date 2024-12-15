import { FiShoppingBag } from 'react-icons/fi'

// In your sidebar items array/configuration
{
  title: "Marketplace",
  href: "/marketplace",
  icon: FiShoppingBag,
  variant: "default"
}

// Or if your sidebar uses a different structure, it might look like:
<SidebarItem
  icon={FiShoppingBag}
  title="Marketplace"
  href="/marketplace"
  variant="default"
/> 