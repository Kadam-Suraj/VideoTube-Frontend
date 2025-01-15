import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, indicator, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full cursor-pointer touch-none select-none items-center", className)}
    {...props}>
    <SliderPrimitive.Track
      className="relative w-full h-1 overflow-hidden bg-transparent rounded-full grow">
      <SliderPrimitive.Range className={cn("absolute h-full bg-primary", indicator)} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="hidden w-5 h-5 transition-colors border-2 rounded-full hover:block border-primary bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
