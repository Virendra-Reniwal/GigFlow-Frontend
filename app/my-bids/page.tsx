"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DollarSign, Calendar } from "lucide-react"

// Mock data
const MOCK_MY_BIDS = [
  {
    id: "1",
    gigId: "2",
    gigTitle: "Mobile App Design",
    price: 1600,
    status: "pending",
    createdAt: new Date("2024-01-13"),
  },
]

export default function MyBidsPage() {
  const [bids] = useState(MOCK_MY_BIDS)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">My Bids</h1>
          <p className="text-muted-foreground">Track the status of your submitted proposals</p>
        </div>

        {bids.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">You haven't submitted any bids yet</p>
              <Button asChild>
                <Link href="/">Browse Available Gigs</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bids.map((bid) => (
              <Card key={bid.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl">{bid.gigTitle}</CardTitle>
                    <Badge
                      variant={
                        bid.status === "hired" ? "default" : bid.status === "rejected" ? "destructive" : "outline"
                      }
                    >
                      {bid.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">${bid.price.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{bid.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button asChild variant="outline">
                      <Link href={`/gigs/${bid.gigId}`}>View Gig</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
