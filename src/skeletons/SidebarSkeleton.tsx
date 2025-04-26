import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function SidebarSkeleton() {
  return (
    <div className="flex flex-col  space-y-4">
      <Skeleton className=" bg-slate-700 h-12 w-full rounded-lg " />
      <div className="flex items-center space-x-4">
        <Skeleton className=" bg-slate-700 h-12 w-12 shrink-0 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className=" bg-slate-700 h-4 w-full" />
          <Skeleton className=" bg-slate-700 h-4 w-3/4" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className=" bg-slate-700 h-12 w-12 shrink-0 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className=" bg-slate-700 h-4 w-full" />
          <Skeleton className=" bg-slate-700 h-4 w-3/4" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className=" bg-slate-700 h-12 w-12 shrink-0 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className=" bg-slate-700 h-4 w-full" />
          <Skeleton className=" bg-slate-700 h-4 w-3/4" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className=" bg-slate-700 h-12 w-12 shrink-0 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className=" bg-slate-700 h-4 w-full" />
          <Skeleton className=" bg-slate-700 h-4 w-3/4" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className=" bg-slate-700 h-12 w-12 shrink-0 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className=" bg-slate-700 h-4 w-full" />
          <Skeleton className=" bg-slate-700 h-4 w-3/4" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className=" bg-slate-700 h-12 w-12 shrink-0 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className=" bg-slate-700 h-4 w-full" />
          <Skeleton className=" bg-slate-700 h-4 w-3/4" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className=" bg-slate-700 h-12 w-12 shrink-0 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className=" bg-slate-700 h-4 w-full" />
          <Skeleton className=" bg-slate-700 h-4 w-3/4" />
        </div>
      </div>
    </div>
  )
}
