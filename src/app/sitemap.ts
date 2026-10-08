import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE.domain, changeFrequency: "monthly", priority: 1 }];
}
