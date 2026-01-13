"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "@/contexts/theme-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Briefcase, Plus, User, Moon, Sun, LayoutDashboard, Home, FolderOpen, Gavel, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="rounded-xl bg-gradient-to-br from-primary to-primary/70 p-2.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-primary/25">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              GigFlow
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <div className="hidden lg:flex items-center gap-1 mr-2">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "hover:bg-accent/80 transition-all relative",
                      pathname === "/" &&
                        "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-0.5 after:bg-primary after:rounded-full",
                    )}
                  >
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "hover:bg-accent/80 transition-all relative",
                      pathname === "/dashboard" &&
                        "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-0.5 after:bg-primary after:rounded-full",
                    )}
                  >
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "hover:bg-accent/80 transition-all relative",
                      pathname === "/my-gigs" &&
                        "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-0.5 after:bg-primary after:rounded-full",
                    )}
                  >
                    <Link href="/my-gigs">
                      <FolderOpen className="mr-2 h-4 w-4" />
                      My Gigs
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "hover:bg-accent/80 transition-all relative",
                      pathname === "/my-bids" &&
                        "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-0.5 after:bg-primary after:rounded-full",
                    )}
                  >
                    <Link href="/my-bids">
                      <Gavel className="mr-2 h-4 w-4" />
                      My Bids
                    </Link>
                  </Button>
                </div>

                <Button
                  asChild
                  size="sm"
                  className="hidden md:flex bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/post-gig">
                    <Plus className="mr-2 h-4 w-4" />
                    Post a Gig
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="rounded-full hover:bg-accent/80 transition-all duration-300 p-1.5"
                    >
                      <Avatar className="h-9 w-9 ring-2 ring-primary/20 ring-offset-2 ring-offset-background transition-all hover:ring-primary/40">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold leading-none">{user.name}</p>
                        <p className="text-xs text-muted-foreground leading-none">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className={cn(pathname === "/profile" && "bg-accent")}>
                      <Link href="/profile" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className={cn("lg:hidden", pathname === "/" && "bg-accent")}>
                      <Link href="/" className="flex items-center cursor-pointer">
                        <Home className="mr-2 h-4 w-4" />
                        Home
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className={cn("lg:hidden", pathname === "/dashboard" && "bg-accent")}>
                      <Link href="/dashboard" className="flex items-center cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className={cn("md:hidden", pathname === "/post-gig" && "bg-accent")}>
                      <Link href="/post-gig" className="flex items-center cursor-pointer">
                        <Plus className="mr-2 h-4 w-4" />
                        Post a Gig
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className={cn("lg:hidden", pathname === "/my-gigs" && "bg-accent")}>
                      <Link href="/my-gigs" className="flex items-center cursor-pointer">
                        <FolderOpen className="mr-2 h-4 w-4" />
                        My Gigs
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className={cn("lg:hidden", pathname === "/my-bids" && "bg-accent")}>
                      <Link href="/my-bids" className="flex items-center cursor-pointer">
                        <Gavel className="mr-2 h-4 w-4" />
                        My Bids
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
                      {theme === "light" ? (
                        <>
                          <Moon className="mr-2 h-4 w-4" />
                          Switch to Dark Mode
                        </>
                      ) : (
                        <>
                          <Sun className="mr-2 h-4 w-4" />
                          Switch to Light Mode
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "hidden md:flex hover:bg-accent/80 transition-all relative",
                    pathname === "/" &&
                      "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-0.5 after:bg-primary after:rounded-full",
                  )}
                >
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-full hover:bg-accent/80 transition-all duration-300 hover:scale-110"
                  title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                >
                  {theme === "light" ? (
                    <Moon className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  )}
                </Button>
                <Button asChild variant="ghost" size="sm" className="hover:bg-accent/80 transition-all">
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
