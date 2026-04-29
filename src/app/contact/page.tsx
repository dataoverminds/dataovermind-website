import type { Metadata } from "next";
import { ContactPage } from "@/components/sections/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with DataOverMind. Tell us about your AI automation needs and we'll help you build intelligent systems.",
};

export default function Contact() {
  return <ContactPage />;
}
