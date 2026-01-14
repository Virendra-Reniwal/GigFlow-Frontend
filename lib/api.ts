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

  // ✅ Same-origin API call (Vercel proxy)
  const url = `/api/${endpoint.replace(/^\/+/, "")}`

  const response = await fetch(url, config)

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "API request failed",
    }))
    throw new Error(error.message)
  }

  return response.json()
}

export default apiClient
