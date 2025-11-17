const refreshAccessToken = () => {
  fetch("/api/auth/refresh-token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const { accessToken } = data;
      localStorage.setItem("accessToken", accessToken);
    })
    .catch((error) => {
      throw error("Error refreshing access token:", error);
    });
};

export default refreshAccessToken;
