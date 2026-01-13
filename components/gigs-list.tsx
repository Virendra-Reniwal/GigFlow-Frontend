"use client"

import { useState, useEffect } from "react"
import { GigCard } from "@/components/gig-card"
import gigService, { Gig } from "@/services/gigService"
import { Loader2 } from "lucide-react"

export function GigsList() {
  const [gigs, setGigs] = useState<Gig[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setIsLoading(true)
        const res = await gigService.getAllGigs({ status: "open" })
        setGigs(res.gigs)
      } catch (err) {
        console.error("Error fetching gigs:", err)
        setError(err instanceof Error ? err.message : "Failed to load gigs")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGigs()
  }, [])

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )

  if (error)
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{error}</p>
      </div>
    )

  if (!gigs.length)
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No gigs available at the moment.</p>
      </div>
    )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Available Gigs <span className="text-muted-foreground font-normal">({gigs.length})</span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {gigs.map((gig) => (
          <GigCard
            key={gig._id}
            gig={{
              id: gig._id,
              title: gig.title,
              description: gig.description,
              budget: gig.budget,
              status: gig.status,
              ownerName: gig.client?.name || "unknown",
              createdAt: new Date(gig.createdAt),
            }}
          />
        ))}
      </div>
    </div>
  )
}
