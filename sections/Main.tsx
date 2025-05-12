'use client'

import { ReactNode } from "react";

export default function Main ({children}: Readonly<{children: ReactNode}>) {
  return <main className="flex-grow w-full h-full">{children}</main>
}
