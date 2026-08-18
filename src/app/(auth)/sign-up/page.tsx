import type { Metadata } from "next";
import Signup01 from "./signup01";

export const metadata: Metadata = {
  title: "Sign up | Skiilink Ventures Limited",
  description: "Create your account on Skiilink Ventures Limited",
};

export default function Page() {
  return <Signup01 />;
}
