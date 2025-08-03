import React from "react"

import { cn } from "@/lib/utils"

const Container = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full flex-col items-stretch gap-4 px-4 xl:mx-auto xl:w-[1280px]",
        className,
      )}
      {...props}
    />
  )
})
Container.displayName = "Container"

export { Container }
