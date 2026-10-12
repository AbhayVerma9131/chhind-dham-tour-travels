import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { PATCH as updateBookingRoute } from "@/app/api/v1/admin/bookings/[id]/route";
import { GET as exportBookingsRoute } from "@/app/api/v1/admin/bookings/export/route";

describe("Admin Authorization Guards", () => {
  it("rejects unauthorized PATCH requests to update booking status with 401", async () => {
    const req = new NextRequest("http://localhost:3000/api/v1/admin/bookings/sample-id", {
      method: "PATCH",
      body: JSON.stringify({ status: "CONFIRMED" }),
    });

    const response = await updateBookingRoute(req, { params: { id: "sample-id" } });
    expect(response.status).toBe(401);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.message).toContain("Unauthorized");
  });

  it("rejects unauthorized GET requests to export bookings with 401", async () => {
    const req = new NextRequest("http://localhost:3000/api/v1/admin/bookings/export", {
      method: "GET",
    });

    const response = await exportBookingsRoute(req);
    expect(response.status).toBe(401);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.message).toContain("Unauthorized");
  });
});
