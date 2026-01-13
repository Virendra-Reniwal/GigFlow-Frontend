"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Plus, DollarSign, FileText, Heading } from "lucide-react"

export default function PostGigPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      router.push("/login")
      return
    }

    setIsLoading(true)

    try {
      // Mock API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Gig posted successfully!",
        description: "Your gig is now visible to freelancers.",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Failed to post gig",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Plus className="h-4 w-4" />
            <span>Post a new gig</span>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-balance">Create a New Gig</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Share details about your project to attract talented freelancers
          </p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Provide clear information to help freelancers understand your needs</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  <Heading className="h-4 w-4 text-muted-foreground" />
                  Gig Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g., Build a React Dashboard with Analytics"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">Write a clear, descriptive title for your project</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project requirements, deliverables, timeline, and any specific skills needed..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={8}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Include as much detail as possible to attract the right talent
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  Budget (USD)
                </Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="2500"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                    min="0"
                    step="1"
                    className="pl-8 h-11"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Set a fair budget based on project scope and complexity</p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 h-11" disabled={isLoading}>
                  {isLoading ? "Posting..." : "Post Gig"}
                </Button>
                <Button type="button" variant="outline" className="h-11 bg-transparent" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </main>
    </div>
  )
}
