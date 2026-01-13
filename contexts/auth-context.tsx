"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import authService from "@/services/authService"

interface User {
  id: string
  name: string
  email: string
  role: "client" | "freelancer"
  bio?: string
  skills?: string[]
  profileImage?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, role: "client" | "freelancer") => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
  updateUser: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password })
      const mappedUser: User = {
        id: response.user._id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
        bio: response.user.bio,
        skills: response.user.skills,
        profileImage: response.user.profileImage,
      }

      setUser(mappedUser)
      setToken(response.token)
      localStorage.setItem("user", JSON.stringify(mappedUser))
      localStorage.setItem("token", response.token)
    } catch (error) {
      console.error("[v0] Login error:", error)
      throw error
    }
  }

  const signup = async (name: string, email: string, password: string, role: "client" | "freelancer") => {
    try {
      const response = await authService.register({ name, email, password, role })
      const mappedUser: User = {
        id: response.user._id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
        bio: response.user.bio,
        skills: response.user.skills,
        profileImage: response.user.profileImage,
      }

      setUser(mappedUser)
      setToken(response.token)
      localStorage.setItem("user", JSON.stringify(mappedUser))
      localStorage.setItem("token", response.token)
    } catch (error) {
      console.error("[v0] Signup error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      if (token) {
        await authService.logout()
      }
    } catch (error) {
      console.error("[v0] Logout error:", error)
    } finally {
      setUser(null)
      setToken(null)
      localStorage.removeItem("user")
      localStorage.removeItem("token")
    }
  }

  const updateUser = async (data: Partial<User>) => {
    if (!token) throw new Error("Not authenticated")

    try {
      const response = await authService.updateProfile(token, data)
      const mappedUser: User = {
        id: response.user._id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role,
        bio: response.user.bio,
        skills: response.user.skills,
        profileImage: response.user.profileImage,
      }

      setUser(mappedUser)
      localStorage.setItem("user", JSON.stringify(mappedUser))
    } catch (error) {
      console.error("[v0] Update user error:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, isLoading, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
