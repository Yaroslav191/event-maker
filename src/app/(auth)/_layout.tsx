// import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
   const session = true;

   // if (session) {
   //    return <Redirect href={"/sign-in"} />;
   // }

   return <Stack />;
}
