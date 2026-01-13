"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DollarSign, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Gig {
  id: string
  title: string
  description: string
  budget: number
  status: string
  ownerName: string
  createdAt: Date
}

export function GigCard({ gig }: { gig: Gig }) {
  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300 border-border/50 group">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <Badge variant={gig.status === "open" ? "default" : "secondary"}>{gig.status}</Badge>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="font-bold text-lg text-primary">${gig.budget.toLocaleString()}</span>
          </div>
        </div>

        <CardTitle className="text-xl leading-7 group-hover:text-primary transition-colors">{gig.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{gig.description}</p>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border-2 border-primary/20">
              <AvatarFallback>{gig.ownerName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{gig.ownerName}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{gig.createdAt.toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full group">
          <Link href={`/gigs/${gig.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
