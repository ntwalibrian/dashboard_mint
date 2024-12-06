import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface StockAvatarProps {
  symbol: string
  name: string
}

export function StockAvatar({ symbol, name }: StockAvatarProps) {
  return (
    <Avatar className="h-9 w-9">
      <AvatarFallback className="bg-primary text-primary-foreground">
        {name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
