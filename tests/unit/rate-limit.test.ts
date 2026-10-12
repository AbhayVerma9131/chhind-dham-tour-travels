import { describe, it, expect } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  it("allows requests under the specified limit", () => {
    const id = "test-client-1";
    const res1 = checkRateLimit(id, 3, 10000);
    expect(res1.success).toBe(true);
    expect(res1.remaining).toBe(2);

    const res2 = checkRateLimit(id, 3, 10000);
    expect(res2.success).toBe(true);
    expect(res2.remaining).toBe(1);
  });

  it("blocks requests once the threshold is exceeded", () => {
    const id = "test-client-2";
    checkRateLimit(id, 2, 10000);
    checkRateLimit(id, 2, 10000);

    const blocked = checkRateLimit(id, 2, 10000);
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
  });
});
