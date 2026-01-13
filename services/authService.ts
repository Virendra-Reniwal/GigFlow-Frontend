import apiClient from "@/lib/api"

export interface RegisterData {
  name: string
  email: string
  password: string
  role: "client" | "freelancer"
}

export interface LoginData {
  email: string
  password: string
}

export interface User {
  _id: string
  name: string
  email: string
  role: "client" | "freelancer"
  bio?: string
  skills?: string[]
  profileImage?: string
  createdAt: string
}

export interface AuthResponse {
  success: boolean
  token: string
  user: User
}

const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    return apiClient("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    return apiClient("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    return apiClient("/auth/logout", {
      method: "POST",
    })
  },

  getProfile: async (token: string): Promise<{ success: boolean; user: User }> => {
    return apiClient("/auth/me", {
      token,
    })
  },

  updateProfile: async (token: string, data: Partial<User>): Promise<{ success: boolean; user: User }> => {
    return apiClient("/auth/me", {
      method: "PUT",
      token,
      body: JSON.stringify(data),
    })
  },
}

export default authService
