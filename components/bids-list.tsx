"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const MOCK_BIDS = [
  {
    id: "1",
    gigId: "1",
    freelancerId: "3",
    freelancerName: "Alex Thompson",
    message:
      "I have 5 years of experience building React dashboards. I can deliver this project in 2 weeks with full testing.",
    price: 2200,
    status: "pending",
    createdAt: new Date("2024-01-11"),
  },
  {
    id: "2",
    gigId: "1",
    freelancerId: "4",
    freelancerName: "Maria Garcia",
    message: "React and TypeScript expert here! I specialize in data visualization and have built similar dashboards.",
    price: 2400,
    status: "pending",
    createdAt: new Date("2024-01-12"),
  },
]

export function BidsList({ gigId }: { gigId: string }) {
  const [bids, setBids] = useState(MOCK_BIDS)
  const { toast } = useToast()

  const handleHire = async (bidId: string) => {
    try {
      // Mock API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update bids locally
      setBids((prev) =>
        prev.map((bid) => (bid.id === bidId ? { ...bid, status: "hired" } : { ...bid, status: "rejected" })),
      )

      toast({
        title: "Freelancer hired!",
        description: "The gig has been assigned.",
      })
    } catch (error) {
      toast({
        title: "Failed to hire",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  }

  if (bids.length === 0) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Bids</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">No bids yet. Check back later!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Bids ({bids.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bids.map((bid) => (
          <Card key={bid.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{bid.freelancerName.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{bid.freelancerName}</p>
                    <p className="text-sm text-muted-foreground">{bid.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>
                <Badge
                  variant={bid.status === "hired" ? "default" : bid.status === "rejected" ? "secondary" : "outline"}
                >
                  {bid.status}
                </Badge>
              </div>

              <p className="text-sm leading-relaxed mb-4">{bid.message}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-bold text-lg">${bid.price.toLocaleString()}</span>
                </div>
                {bid.status === "pending" && <Button onClick={() => handleHire(bid.id)}>Hire</Button>}
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
