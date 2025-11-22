import type { Metadata } from "next";
import { Button } from "./components/ui/button2";
import NotFound from "./components/notFound";
export const metadata: Metadata = {
  title: "404",
  description: "Error 404",
};

export default function Not_Found() {
  return (
    <NotFound/>
  );
}
