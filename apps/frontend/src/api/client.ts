const API_BASE = import.meta.env.VITE_API_URL || "";

const resolveUrl = (path: string) => {
  if (!API_BASE) return path;
  return `${API_BASE}${path.replace(/^\/api/, "")}`;
};

const refreshAccessToken = async () => {
  try {
    const res = await fetch(resolveUrl("/api/auth/refresh-token"), {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const data = await res.json();
    localStorage.setItem("accessToken", data.accessToken);
  } catch (error) {
    console.error("Error refreshing access token:", error);
    localStorage.removeItem("accessToken");
    throw error;
  }
};

const apiClient = async (url: string, options: RequestInit = {}) => {
  const buildOptions = () => {
    const currentAccessToken = localStorage.getItem("accessToken");

    return {
      credentials: "include",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        ...(currentAccessToken
          ? { Authorization: `Bearer ${currentAccessToken}` }
          : {}),
      },
    } as RequestInit;
  };

  let response = await fetch(resolveUrl(url), buildOptions());

  if (response.status === 401) {
    await refreshAccessToken();
    response = await fetch(resolveUrl(url), buildOptions());
  }

  return response;
};

export default apiClient;
