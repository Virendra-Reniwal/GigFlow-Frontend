import { Navbar } from "@/components/navbar"
import { GigsList } from "@/components/gigs-list"
import { SearchBar } from "@/components/search-bar"
import { Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Connect with top talent worldwide</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6 leading-tight">
            Find Your Next{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Opportunity
            </span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
            Browse thousands of open projects and connect with clients looking for your unique skills and expertise
          </p>
          <SearchBar />
        </div>
        <GigsList />
      </main>
    </div>
  )
}
