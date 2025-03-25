import Redis from "ioredis";

export class RateLimitService {
  private redis: Redis;
  private readonly DAILY_LIMIT = 1000;

  constructor() {
    const redisUrl = new URL(process.env.REDIS_URL || "");
    this.redis = new Redis({
      host: redisUrl.hostname,
      port: parseInt(redisUrl.port),
      password: process.env.REDIS_PASSWORD,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    this.redis.on("error", (error) => {
      console.error("Redis connection error:", error);
    });
  }

  private getKey(clientId: string): string {
    const today = new Date().toDateString();
    return `ratelimit:${clientId}:${today}`;
  }

  async incrementAndCheck(clientId: string): Promise<{
    allowed: boolean;
    remaining: number;
    reset: number;
  }> {
    const key = this.getKey(clientId);

    // Use multi to ensure atomic operation
    const result = await this.redis
      .multi()
      .incr(key)
      .expire(key, this.getSecondsUntilMidnight())
      .exec();

    if (!result) {
      throw new Error("Redis transaction failed");
    }

    const count = (result[0][1] as number) || 0;
    const remaining = Math.max(0, this.DAILY_LIMIT - count);

    return {
      allowed: count <= this.DAILY_LIMIT,
      remaining,
      reset: new Date().setHours(24, 0, 0, 0),
    };
  }

  private getSecondsUntilMidnight(): number {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight.getTime() - now.getTime()) / 1000);
  }
}
