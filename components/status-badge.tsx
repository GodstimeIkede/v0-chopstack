import { Badge } from "@/components/ui/badge"
import type { DeliveryStatus } from "@/lib/types"

interface StatusBadgeProps {
  status: DeliveryStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = (status: DeliveryStatus) => {
    switch (status) {
      case "pending":
        return "bg-secondary/20 text-secondary-foreground hover:bg-secondary/30"
      case "shipped":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-300 hover:bg-blue-500/30"
      case "delivered":
        return "bg-accent/20 text-accent-foreground hover:bg-accent/30"
      case "completed":
        return "bg-primary/20 text-primary hover:bg-primary/30"
    }
  }

  return (
    <Badge className={getStatusColor(status)} variant="outline">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
