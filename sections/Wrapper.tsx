'use client'
import { ReactNode } from "react";

export interface ILayout  {
  children: Readonly<ReactNode>
}

export default function Wrapper ({children}: ILayout) {
  return (
    <div className="flex flex-col min-h-screen">{children}</div>
  )
}
