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
import { Briefcase, ArrowLeft, Info } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const fillDemoCredentials = () => {
    setEmail("demo@gigflow.com")
    setPassword("demo123")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(email, password)
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
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

        <div className="mb-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <p className="text-sm font-medium text-foreground">Demo Account</p>
              <p className="text-xs text-muted-foreground">
                Email: <span className="font-mono text-foreground">demo@gigflow.com</span>
                <br />
                Password: <span className="font-mono text-foreground">demo123</span>
              </p>
              <Button type="button" variant="secondary" size="sm" className="h-8 text-xs" onClick={fillDemoCredentials}>
                Use Demo Credentials
              </Button>
            </div>
          </div>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Don't have an account?</span>
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Register
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
