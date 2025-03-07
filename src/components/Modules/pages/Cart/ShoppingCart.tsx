"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CartItem } from "./CartItem";
import { Separator } from "@/components/ui/separator";
import { TCart } from "@/types/cartTypes";
import {
  clearCart,
  deleteCartItem,
  getCartItems,
  updateQuantityCartItem,
} from "@/utils/actions/cart";
import { toast } from "sonner";
import Link from "next/link";

const ShoppingCart = ({ cart }: { cart: TCart | null }) => {
  // handle update quantity cart item
  const handleUpdateQuantity = async (medicineId: string, quantity: number) => {
    const updateQuantityData = {
      medicineId: medicineId,
      quantity: quantity,
    };

    // update quantity from database
    try {
      const res = await updateQuantityCartItem(updateQuantityData);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message || "Failed to update quantity");
      }
    } catch (error) {
      toast.error("Something went wrong while updating the quantity");
      console.error(error);
    }
  };

  // handle remove item from cart item
  const handleRemoveItem = async (medicineId: string) => {
    console.log(medicineId, "removing item");

    try {
      const res = await deleteCartItem(medicineId);

      console.log("Remove Item Response:", res);

      if (res.success) {
        toast.success("Item removed successfully");
      } else {
        toast.error(res.message || "Failed to remove item");
      }
    } catch (error) {
      toast.error("Something went wrong while removing the item");
      console.error(error);
    }
  };

  // clear cart items
  const handleClearCart = async () => {
    try {
      const res = await clearCart();
      console.log("Clear Cart Response:", res);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message || "Failed to clear cart");
      }
    } catch (error) {
      toast.error("Something went wrong while removing the item");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-6 flex justify-center items-center">
      {cart ? (
        <Card className="w-full max-w-5xl shadow-xl p-6 rounded-lg">
          <CardHeader className="text-center text-3xl font-bold p-4">
            Shopping Cart
          </CardHeader>

          <Separator />
          {/* cart items */}
          <CardContent className="space-y-4 mt-5 overflow-x-auto">
            {/* clear cart  */}
            <Button
              onClick={handleClearCart}
              size="default"
              variant="destructive"
            >
              Clear Cart
            </Button>

            {cart?.items?.length === 0 ? (
              <div className="text-center text-lg">
                Your shopping cart is empty. Add some medicines to continue.
                <div className="my-5">
                  <Link href="/">
                    <Button variant="outline" className="w-full  py-3 text-lg">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              cart?.items?.map((item) => (
                <CartItem
                  key={item?.medicineId?._id}
                  item={item}
                  removeItem={handleRemoveItem}
                  updateQuantity={handleUpdateQuantity}
                />
              ))
            )}
          </CardContent>

          <div className="px-2 md:px-6">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Order Summary
            </h3>

            <Separator />
            <div className="space-y-2 my-5 text-lg">
              <div className="flex justify-between">
                <span className="text-lg font-medium">Original Price</span>
                <span className="text-lg font-semibold">
                  ${cart?.totalPrice.toFixed(2) || 0}
                </span>
              </div>
              <div className="flex justify-between text-green-400">
                <span className="text-lg font-medium">Savings</span>
                <span className="text-lg font-semibold">-$0</span>
              </div>

              <div className="flex justify-between mb-5">
                <span className="text-lg font-medium">Store Pickup</span>
                <span className="text-lg font-semibold">$30</span>
              </div>
              <Separator />

              <div className="flex justify-between font-bold text-xl mt-2 pt-4">
                <span>Total</span>
                <span>${(cart?.totalPrice + 30).toFixed(2) || 0}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-6 gap-4 px-2 md:px-6">
            <Button variant="outline" className="w-full md:w-1/2 py-3 text-lg">
              Continue Shopping
            </Button>

            <Button className="w-full md:w-1/2 py-3 text-lg bg-blue-600 hover:bg-blue-700">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div>
          <Card className="w-full max-w-5xl shadow-xl p-6 rounded-lg">
            <CardHeader className="text-center text-3xl font-bold p-4">
              Shopping Cart
            </CardHeader>
            <Separator />
            <CardContent className="space-y-4 mt-5 text-center overflow-x-auto">
              <p>No items in your cart.</p>
              <div>
                <Link href="/">
                  <Button variant="outline" className="w-full  py-3 text-lg">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
