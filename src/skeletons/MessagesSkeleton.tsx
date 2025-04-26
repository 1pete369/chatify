import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

export default function MessagesSkeleton() {
  return (
    <div className="flex-1 flex-col gap-4 px-4 py-6">
      {/* Other user message */}
      <div className="flex items-end gap-3 justify-start">
        <Skeleton className="h-[28px] w-[28px] rounded-full mt-1" />
        <div className="max-w-xs px-4 py-3 rounded-2xl bg-slate-200 dark:bg-slate-700 text-sm shadow-sm rounded-bl-sm">
          <div className="flex items-center justify-between gap-4 text-xs mb-2 opacity-80">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-10" />
          </div>
          <Skeleton className="h-4 w-48 mb-1" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Your message */}
      <div className="flex items-end gap-3 justify-end self-end">
        <div className="max-w-xs px-4 py-3 rounded-2xl bg-primary-300 dark:bg-primary-800 text-sm shadow-sm rounded-br-sm">
          <div className="flex items-center justify-between gap-4 text-xs mb-2 opacity-80">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-4 w-40 mb-1" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-[28px] w-[28px] rounded-full mt-1" />
      </div>

      {/* Other user message again */}
      <div className="flex items-end gap-3 justify-start">
        <Skeleton className="h-[28px] w-[28px] rounded-full mt-1" />
        <div className="max-w-xs px-4 py-3 rounded-2xl bg-slate-200 dark:bg-slate-700 text-sm shadow-sm rounded-bl-sm">
          <div className="flex items-center justify-between gap-4 text-xs mb-2 opacity-80">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-10" />
          </div>
          <Skeleton className="h-4 w-56 mb-1" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      {/* Your message again */}
      <div className="flex items-end gap-3 justify-end self-end">
        <div className="max-w-xs px-4 py-3 rounded-2xl bg-primary-300 dark:bg-primary-800 text-sm shadow-sm rounded-br-sm">
          <div className="flex items-center justify-between gap-4 text-xs mb-2 opacity-80">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-10" />
          </div>
          <Skeleton className="h-4 w-44 mb-1" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-[28px] w-[28px] rounded-full mt-1" />
      </div>
    </div>
  )
}
