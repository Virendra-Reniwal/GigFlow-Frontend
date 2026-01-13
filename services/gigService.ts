import apiClient from "@/lib/api"

export interface Gig {
  _id: string
  title: string
  description: string
  budget: number
  deadline: string
  category: string
  skills: string[]
  status: "open" | "closed" | "in_progress" | "completed"
  client: {
    _id: string
    name: string
    email: string
  }
  bidsCount?: number
  createdAt: string
  updatedAt: string
}

export interface CreateGigData {
  title: string
  description: string
  budget: number
  deadline: string
  category: string
  skills: string[]
}

const gigService = {
  getAllGigs: async (params?: {
    search?: string
    category?: string
    minBudget?: number
    maxBudget?: number
    status?: string
  }): Promise<{ success: boolean; gigs: Gig[] }> => {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, String(value))
        }
      })
    }
    const queryString = queryParams.toString()
    return apiClient(`/gigs${queryString ? `?${queryString}` : ""}`)
  },

  getGigById: async (id: string): Promise<{ success: boolean; gig: Gig }> => {
    return apiClient(`/gigs/${id}`)
  },

  createGig: async (token: string, data: CreateGigData): Promise<{ success: boolean; gig: Gig }> => {
    return apiClient("/gigs", {
      method: "POST",
      token,
      body: JSON.stringify(data),
    })
  },

  updateGig: async (
    token: string,
    id: string,
    data: Partial<CreateGigData>,
  ): Promise<{ success: boolean; gig: Gig }> => {
    return apiClient(`/gigs/${id}`, {
      method: "PUT",
      token,
      body: JSON.stringify(data),
    })
  },

  deleteGig: async (token: string, id: string): Promise<{ success: boolean; message: string }> => {
    return apiClient(`/gigs/${id}`, {
      method: "DELETE",
      token,
    })
  },

  getMyGigs: async (token: string): Promise<{ success: boolean; gigs: Gig[] }> => {
    return apiClient("/gigs/my/posted", {
      token,
    })
  },
}

export default gigService
