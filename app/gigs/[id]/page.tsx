"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { DollarSign, Calendar, Briefcase, Clock, FileText } from "lucide-react"
import { BidForm } from "@/components/bid-form"
import { BidsList } from "@/components/bids-list"

// Mock data
const MOCK_GIG = {
  id: "1",
  title: "Build a React Dashboard",
  description:
    "Looking for an experienced React developer to build a modern dashboard with charts and analytics. The project includes user authentication, real-time data visualization, and responsive design. Must have experience with React, TypeScript, and Tailwind CSS.",
  budget: 2500,
  status: "open",
  ownerId: "2",
  ownerName: "Sarah Johnson",
  createdAt: new Date("2024-01-10"),
}

export default function GigDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const [gig] = useState(MOCK_GIG)
  const [showBidForm, setShowBidForm] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const isOwner = user?.id === gig.ownerId

  const handleBidClick = () => {
    if (!user) {
      router.push("/login")
      return
    }
    setShowBidForm(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50 shadow-lg">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <Badge variant={gig.status === "open" ? "default" : "secondary"} className="mb-2">
                      {gig.status}
                    </Badge>
                    <CardTitle className="text-3xl leading-tight text-balance">{gig.title}</CardTitle>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {gig.ownerName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Posted by {gig.ownerName}</p>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{gig.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <Separator />

              <CardContent className="space-y-6 pt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Project Description
                  </h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{gig.description}</p>
                </div>

                {showBidForm && !isOwner && (
                  <>
                    <Separator />
                    <BidForm gigId={gig.id} onSuccess={() => setShowBidForm(false)} />
                  </>
                )}
              </CardContent>
            </Card>

            {isOwner && <BidsList gigId={gig.id} />}
          </div>

          <div className="space-y-4">
            <Card className="border-border/50 shadow-lg sticky top-20">
              <CardHeader>
                <CardTitle>Gig Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="rounded-full bg-primary/10 p-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Project Budget</p>
                    <p className="text-2xl font-bold text-primary">${gig.budget.toLocaleString()}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-muted p-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Posted</p>
                      <p className="font-medium text-sm">{gig.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-muted p-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="font-medium text-sm capitalize">{gig.status}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {!isOwner && (
                  <Button
                    className="w-full h-11"
                    onClick={handleBidClick}
                    disabled={gig.status !== "open" || showBidForm}
                    size="lg"
                  >
                    {showBidForm ? "Bid Form Open Below" : "Submit a Bid"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
