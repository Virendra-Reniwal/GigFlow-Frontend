// API client configuration and helper functions
const API_URL = process.env.NEXT_PUBLIC_API_URL 

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

  // Ensure only single slash between base URL and endpoint
  const url = endpoint.startsWith("/") ? `${API_URL}${endpoint}` : `${API_URL}/${endpoint}`

  const response = await fetch(url, config)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }))
    throw new Error(error.message || "API request failed")
  }

  return response.json()
}

export default apiClient
