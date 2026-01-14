// lib/api.ts

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "" // empty = same origin (vercel rewrite)

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
    credentials: "include",
  }

  // ✅ Works for both dev & prod
  const url = endpoint.startsWith("/")
    ? `${API_URL}${endpoint}`
    : `${API_URL}/${endpoint}`

  const response = await fetch(url, config)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "API error" }))
    throw new Error(error.message || "Request failed")
  }

  return response.json()
}

export default apiClient
