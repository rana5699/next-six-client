"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useForm } from "react-hook-form";
import SFormInput from "../../Shared/Form/SFormInput";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { loginUser } from "@/utils/actions/loginUser";
import { useAppDispatch } from "@/redux/hooks";
import { decodedToken } from "@/utils/decodedToken";
import { setUser } from "@/redux/features/user/authSlice";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const form = useForm({
    // resolver: zodResolver(loginValidationSchema),
    // defaultValues: {
    //   email: "developer@gmail.com",
    //   password: "000000",
    // },
  });
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: any) => {
    try {
      const res = await loginUser(data);


      if (!res?.data?.accessToken) {
        toast.error(res.message);
      }
      if (res?.data?.accessToken) {
        toast.success(res.message);

        const user = decodedToken(res?.data?.accessToken);

        dispatch(setUser({ user: user, token: res?.data?.accessToken }));

        localStorage.setItem("accessToken", res?.data?.accessToken);

       

        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex  flex-col w-full gap-6 max-w-2xl mx-auto">
      <Card className="">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-title">Welcome back</CardTitle>
          <CardDescription className="font-description">Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button variant="outline" className="w-full font-description">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground font-description">
                    Or continue with
                  </span>
                </div>
                <div className="grid gap-6">
                  <SFormInput
                    control={form.control}
                    name="email"
                    placeholder="valid email/phone"
                    label="Email/Phone"
                    type="text"
                  />

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/reset-password"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <SFormInput
                      control={form.control}
                      name="password"
                      placeholder="m@example123"
                      type="password"
                    />
                  </div>

                  <Button type="submit" variant={"outline"} className="w-full font-description">
                    Login
                  </Button>
                </div>
                <div className="text-center text-sm font-description">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="underline underline-offset-4 font-description"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
