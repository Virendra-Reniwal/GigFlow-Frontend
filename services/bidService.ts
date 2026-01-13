import apiClient from "@/lib/api"

export interface Bid {
  _id: string
  gig:
    | string
    | {
        _id: string
        title: string
        budget: number
        status: string
      }
  freelancer: {
    _id: string
    name: string
    email: string
  }
  amount: number
  deliveryTime: number
  proposal: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
  updatedAt: string
}

export interface CreateBidData {
  gigId: string
  amount: number
  deliveryTime: number
  proposal: string
}

const bidService = {
  createBid: async (token: string, data: CreateBidData): Promise<{ success: boolean; bid: Bid }> => {
    return apiClient("/bids", {
      method: "POST",
      token,
      body: JSON.stringify(data),
    })
  },

  getGigBids: async (gigId: string, token?: string): Promise<{ success: boolean; bids: Bid[] }> => {
    return apiClient(`/bids/gig/${gigId}`, {
      token,
    })
  },

  getMyBids: async (token: string): Promise<{ success: boolean; bids: Bid[] }> => {
    return apiClient("/bids/my/submitted", {
      token,
    })
  },

  acceptBid: async (token: string, bidId: string): Promise<{ success: boolean; message: string; bid: Bid }> => {
    return apiClient(`/bids/${bidId}/accept`, {
      method: "POST",
      token,
    })
  },

  rejectBid: async (token: string, bidId: string): Promise<{ success: boolean; message: string; bid: Bid }> => {
    return apiClient(`/bids/${bidId}/reject`, {
      method: "POST",
      token,
    })
  },
}

export default bidService
