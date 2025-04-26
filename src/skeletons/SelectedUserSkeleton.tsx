import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

export default function SelectedUserSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className=" bg-slate-700 h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className=" bg-slate-700 h-4 w-[200px]" />
        <Skeleton className=" bg-slate-700 h-4 w-[160px]" />
      </div>
    </div>
  )
}
