"use client";

import { createContext, useContext, type ReactNode } from "react";
import { brand } from "@/lib/branding";

const BrandContext = createContext(brand);

export function BrandProvider({ children }: { children: ReactNode }) {
  return <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>;
}

export function useBrand() {
  return useContext(BrandContext);
}
