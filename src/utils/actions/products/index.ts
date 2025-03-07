"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// get all products
export const getAllProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/medicines`, {
      next: {
        tags: ["MEDICINES"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get single product
export const getSingleProduct = async (medicineId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/medicine/${medicineId}`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};




// add product
// export const addProduct = async (productData: FormData): Promise<any> => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
//       method: "POST",
//       body: productData,
// headers: {
//   Authorization: (await cookies()).get("accessToken")!.value,
// },
//     });
//     revalidateTag("PRODUCT");
//     return res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };

// update product
// export const updateProduct = async (
//   productData: FormData,
//   productId: string
// ): Promise<any> => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
//       {
//         method: "PATCH",
//         body: productData,
//         headers: {
//           Authorization: (await cookies()).get("accessToken")!.value,
//         },
//       }
//     );
//     revalidateTag("PRODUCT");
//     return res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };
