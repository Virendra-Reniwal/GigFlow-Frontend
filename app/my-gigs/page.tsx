"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DollarSign, Calendar } from "lucide-react"

// Mock data
const MOCK_MY_GIGS = [
  {
    id: "1",
    title: "Build a React Dashboard",
    budget: 2500,
    status: "open",
    createdAt: new Date("2024-01-10"),
    bidsCount: 2,
  },
]

export default function MyGigsPage() {
  const [gigs] = useState(MOCK_MY_GIGS)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">My Posted Gigs</h1>
          <p className="text-muted-foreground">Manage your posted projects and review bids</p>
        </div>

        {gigs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">You haven't posted any gigs yet</p>
              <Button asChild>
                <Link href="/post-gig">Post Your First Gig</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {gigs.map((gig) => (
              <Card key={gig.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl">{gig.title}</CardTitle>
                    <Badge variant={gig.status === "open" ? "default" : "secondary"}>{gig.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">${gig.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{gig.createdAt.toLocaleDateString()}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">{gig.bidsCount}</span>
                        <span className="text-muted-foreground"> bids</span>
                      </div>
                    </div>
                    <Button asChild variant="outline">
                      <Link href={`/gigs/${gig.id}`}>View Details</Link>
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
