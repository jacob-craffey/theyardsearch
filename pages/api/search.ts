import { NextApiRequest, NextApiResponse } from "next";
import { SearchService } from "../../services/SearchService";
import { RateLimitService } from "../../services/RateLimitService";

function getClientKey(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? typeof forwarded === "string"
      ? forwarded
      : forwarded[0]
    : req.socket.remoteAddress || "";
  return ip || "unknown";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const rateLimitService = new RateLimitService();
  const clientKey = getClientKey(req);

  try {
    const { allowed, remaining, reset } =
      await rateLimitService.incrementAndCheck(clientKey);

    // Add rate limit headers
    res.setHeader("X-RateLimit-Limit", 1000);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", reset);

    if (!allowed) {
      return res.status(429).json({
        message: "Daily request limit exceeded",
        remainingRequests: remaining,
        nextReset: reset,
      });
    }

    const { query } = req.body;
    const searchService = new SearchService();
    const results = await searchService.search(query);

    res.status(200).json({
      results,
      remainingRequests: remaining,
      nextReset: reset,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
