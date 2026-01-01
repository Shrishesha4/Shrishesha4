"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { Profile, Project, Blog } from "@/lib/types";

export type { Profile, Project, Blog };

export function usePortfolioData() {
  return usePortfolio();
}
