import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "../../utils/cn"

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => {
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        className={cn(
          "peer h-4 w-4 shrink-0 rounded border border-gray-300 bg-white ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-blue-600 checked:border-blue-600 appearance-none cursor-pointer",
          className,
        )}
        ref={ref}
        {...props}
      />
      <Check
        className="absolute left-0 top-0 h-4 w-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100"
        strokeWidth={3}
      />
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
