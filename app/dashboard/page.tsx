"use client"

import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import {
  DollarSign,
  TrendingUp,
  Briefcase,
  Clock,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
  Users,
} from "lucide-react"
import Link from "next/link"
import { Line, LineChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

// Mock data for dashboard statistics
const earningsData = [
  { month: "Jan", earnings: 2400 },
  { month: "Feb", earnings: 1398 },
  { month: "Mar", earnings: 3800 },
  { month: "Apr", earnings: 3908 },
  { month: "May", earnings: 4800 },
  { month: "Jun", earnings: 3800 },
]

const projectsData = [
  { month: "Jan", completed: 4, active: 2 },
  { month: "Feb", completed: 3, active: 3 },
  { month: "Mar", completed: 5, active: 2 },
  { month: "Apr", completed: 6, active: 4 },
  { month: "May", completed: 8, active: 3 },
  { month: "Jun", completed: 7, active: 5 },
]

const recentActivities = [
  { id: 1, type: "bid", title: "New bid on 'Build React Dashboard'", time: "2 hours ago", status: "pending" },
  { id: 2, type: "hired", title: "You were hired for 'Mobile App Design'", time: "5 hours ago", status: "success" },
  { id: 3, type: "payment", title: "Payment received: $2,500", time: "1 day ago", status: "success" },
  { id: 4, type: "bid", title: "Bid submitted for 'E-commerce Website'", time: "2 days ago", status: "pending" },
  { id: 5, type: "completed", title: "Project 'Logo Design' completed", time: "3 days ago", status: "success" },
]

const activeProjects = [
  { id: "1", title: "Build React Dashboard", client: "Tech Corp", budget: 2500, progress: 65, deadline: "2024-02-15" },
  { id: "2", title: "Mobile App Design", client: "StartupXYZ", budget: 1800, progress: 30, deadline: "2024-02-20" },
  { id: "3", title: "E-commerce Website", client: "ShopLocal", budget: 3500, progress: 85, deadline: "2024-02-10" },
]

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold text-balance">Welcome back, {user.name.split(" ")[0]}</h1>
              <p className="text-muted-foreground mt-1">Here's what's happening with your projects today</p>
            </div>
            <Button asChild size="lg">
              <Link href="/post-gig">Post New Gig</Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
              <DollarSign className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$24,300</div>
              <div className="flex items-center text-sm mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+12.5%</span>
                <span className="text-muted-foreground ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
              <Briefcase className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <div className="flex items-center text-sm mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+3</span>
                <span className="text-muted-foreground ml-2">new this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Bids</CardTitle>
              <Clock className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <div className="flex items-center text-sm mt-2">
                <ArrowDownRight className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-orange-500 font-medium">-2</span>
                <span className="text-muted-foreground ml-2">from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">87%</div>
              <div className="flex items-center text-sm mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">+5.2%</span>
                <span className="text-muted-foreground ml-2">improvement</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Earnings Chart */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <p className="text-sm text-muted-foreground">Your earnings over the last 6 months</p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={earningsData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="month" className="text-xs" stroke="hsl(var(--muted-foreground))" />
                      <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="earnings"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Projects Chart */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Project Statistics</CardTitle>
                <p className="text-sm text-muted-foreground">Completed vs active projects</p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectsData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="month" className="text-xs" stroke="hsl(var(--muted-foreground))" />
                      <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="active" fill="hsl(var(--muted))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Active Projects */}
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Projects</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Projects you're currently working on</p>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/my-gigs">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeProjects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-balance">{project.title}</h4>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {project.client}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />${project.budget.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(project.deadline).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity Feed */}
          <div className="space-y-8">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <p className="text-sm text-muted-foreground">Your latest updates and notifications</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div
                        className={`mt-1 rounded-full p-1.5 ${
                          activity.status === "success"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-orange-500/10 text-orange-500"
                        }`}
                      >
                        {activity.status === "success" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-snug">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="/post-gig">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Post a New Gig
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="/">
                    <Users className="h-4 w-4 mr-2" />
                    Browse Freelancers
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="/my-bids">
                    <Clock className="h-4 w-4 mr-2" />
                    View My Bids
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                  <Link href="/profile">
                    <Avatar className="h-4 w-4 mr-2">
                      <AvatarFallback className="text-[8px]">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    Edit Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card className="border-border/50 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-semibold">2.3 hrs</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "90%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Completion Rate</span>
                    <span className="font-semibold">95%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "95%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Client Satisfaction</span>
                    <span className="font-semibold">4.8/5.0</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "96%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
