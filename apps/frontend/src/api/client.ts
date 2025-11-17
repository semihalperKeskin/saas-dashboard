const refreshAccessToken = async () => {
  try {
    const res = await fetch("/api/auth/refresh-token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const data = await res.json();
    await localStorage.setItem("accessToken", data.accessToken);
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
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        ...(currentAccessToken
          ? { Authorization: `Bearer ${currentAccessToken}` }
          : {}),
      },
    } as RequestInit;
  };

  let response = await fetch(url, buildOptions());

  if (response.status === 401) {
    await refreshAccessToken();

    response = await fetch(url, buildOptions());
  }

  return response;
};

export default apiClient;
