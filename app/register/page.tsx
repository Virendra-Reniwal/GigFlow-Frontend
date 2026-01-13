"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Briefcase, ArrowLeft } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"client" | "freelancer">("freelancer")
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signup(name, email, password, role)
      toast({
        title: "Account created!",
        description: "Welcome to GigFlow.",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="rounded-lg bg-primary p-2.5 group-hover:scale-110 transition-transform">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              GigFlow
            </span>
          </Link>
        </div>
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Enter your information to get started with GigFlow</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">Must be at least 6 characters</p>
              </div>
              <div className="space-y-3">
                <Label>I want to</Label>
                <RadioGroup value={role} onValueChange={(value) => setRole(value as "client" | "freelancer")}>
                  <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="freelancer" id="freelancer" />
                    <Label htmlFor="freelancer" className="flex-1 cursor-pointer">
                      <div className="font-medium">Work as a Freelancer</div>
                      <div className="text-xs text-muted-foreground">Find gigs and bid on projects</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="client" id="client" />
                    <Label htmlFor="client" className="flex-1 cursor-pointer">
                      <div className="font-medium">Hire as a Client</div>
                      <div className="text-xs text-muted-foreground">Post gigs and hire freelancers</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Already have an account?</span>
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </div>
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to home
                </Link>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
