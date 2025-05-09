"use server"

import { cookies } from "next/headers";

export const getMonthlyAnalytic = async () => {
  try {

    const url = `${process.env.NEXT_PUBLIC_BASE_API}/monthly-sales/analytics`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["MONTHLY_ANALYTIC"],
      },
    });

    const data = await res.json();

    return data;
  } catch (error: any) {
    console.log("API Error:", error.message);
  }
};

export const getDashboardReport = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_API}/dashboard/analytics`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        authorization: (await cookies()).get("accessToken")!.value,
      },
      next: {
        tags: ["MONTHLY_ANALYTIC"],
      },
    });

    const data = await res.json();



    return data;
  } catch (error: any) {
    console.error("API Error:", error.message);
  }
};
