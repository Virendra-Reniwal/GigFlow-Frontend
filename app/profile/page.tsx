"use client"

import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Mail, UserIcon, Star, Award, TrendingUp, Briefcase } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Card className="border-border/50 bg-card shadow-lg mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-lg">
                <AvatarFallback className="text-4xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-1 text-foreground">{user.name}</h2>
                <p className="text-muted-foreground mb-3">Professional Freelancer</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-foreground">4.9</span>
                    <span className="text-muted-foreground">(127 reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    <span>32 projects completed</span>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border/50 bg-card shadow-lg">
            <CardHeader>
              <CardTitle className="text-foreground">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border border-border/50">
                <UserIcon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Full Name</p>
                  <p className="font-medium text-foreground">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border border-border/50">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                  <p className="font-medium text-foreground">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card shadow-lg">
            <CardHeader>
              <CardTitle className="text-foreground">Performance Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <Award className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-0.5">Success Rate</p>
                  <p className="font-bold text-lg text-foreground">95%</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-0.5">Total Earned</p>
                  <p className="font-bold text-lg text-foreground">$24,300</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card shadow-lg md:col-span-2">
            <CardHeader>
              <CardTitle className="text-foreground">Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "UI/UX Design",
                  "Tailwind CSS",
                  "GraphQL",
                  "PostgreSQL",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
