"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface BidFormProps {
  gigId: string
  onSuccess: () => void
}

export function BidForm({ gigId, onSuccess }: BidFormProps) {
  const [message, setMessage] = useState("")
  const [price, setPrice] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Bid submitted!",
        description: "The client will review your bid.",
      })
      onSuccess()
    } catch (error) {
      toast({
        title: "Failed to submit bid",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Your Bid</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price">Your Price (USD)</Label>
            <Input
              id="price"
              type="number"
              placeholder="e.g., 2000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              step="1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Proposal</Label>
            <Textarea
              id="message"
              placeholder="Explain why you're the best fit for this project..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="resize-none"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Bid"}
            </Button>
            <Button type="button" variant="outline" onClick={onSuccess}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}
