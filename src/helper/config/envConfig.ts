export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
};

// "https://server-fast-bus-ticket.vercel.app/api/v1"
