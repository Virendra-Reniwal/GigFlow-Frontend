// API client configuration and helper functions
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

interface FetchOptions extends RequestInit {
  token?: string
}

async function apiClient(endpoint: string, options: FetchOptions = {}) {
  const { token, ...fetchOptions } = options

  const config: RequestInit = {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...fetchOptions.headers,
    },
    credentials: "include", // Important for cookies
  }

  const response = await fetch(`${API_URL}${endpoint}`, config)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }))
    throw new Error(error.message || "API request failed")
  }

  return response.json()
}

export default apiClient
