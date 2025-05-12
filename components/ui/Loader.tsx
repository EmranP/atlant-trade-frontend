'use client'

import { cn } from "@/lib/utils"

interface LoaderProps {
  className?: string
  size?: number
}

export const Loader = ({ className, size = 40 }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'animate-spin rounded-full border-t-4 border-b-4 border-gray-200',
          className
        )}
        style={{
          width: size,
          height: size,
          borderTopColor: 'black',
          borderBottomColor: 'black',
        }}
      />
    </div>
  )
}
