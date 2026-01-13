"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"

export function SearchBar() {
  const [search, setSearch] = useState("")

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for gigs by title, skills, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-14 text-base border-border/50 focus:border-primary shadow-sm"
          />
        </div>
        <Button size="lg" variant="outline" className="h-14 px-6 bg-transparent">
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
        <Button size="lg" className="h-14 px-8">
          Search
        </Button>
      </div>
    </div>
  )
}
