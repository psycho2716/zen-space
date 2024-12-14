import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, Info, XCircle, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
    "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                destructive:
                    "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
                info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-200/30 dark:bg-blue-900/30 dark:text-blue-100 [&>svg]:text-blue-500",
                success:
                    "border-green-200 bg-green-50 text-green-900 dark:border-green-200/30 dark:bg-green-900/30 dark:text-green-100 [&>svg]:text-green-500",
                warning:
                    "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-200/30 dark:bg-yellow-900/30 dark:text-yellow-100 [&>svg]:text-yellow-500",
                error: "border-red-200 bg-red-50 text-red-900 dark:border-red-200/30 dark:bg-red-900/30 dark:text-red-100 [&>svg]:text-red-500",
                idle: "bg-background text-foreground",
                loading:
                    "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-200/30 dark:bg-blue-900/30 dark:text-blue-100 [&>svg]:text-blue-500"
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
);

const Alert = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h5
            ref={ref}
            className={cn("mb-1 font-medium leading-none tracking-tight", className)}
            {...props}
        />
    )
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

const AlertIcon = React.forwardRef<
    SVGSVGElement,
    React.ComponentPropsWithoutRef<"svg"> & {
        variant?: VariantProps<typeof alertVariants>["variant"];
    }
>(({ className, variant, ...props }, ref) => {
    const Icon = {
        default: Info,
        destructive: AlertCircle,
        info: Info,
        success: CheckCircle2,
        warning: AlertCircle,
        error: XCircle,
        idle: Info,
        loading: Loader2
    }[variant || "default"];

    return <Icon ref={ref} className={cn("h-4 w-4 stroke-current", className)} {...props} />;
});
AlertIcon.displayName = "AlertIcon";

export { Alert, AlertTitle, AlertDescription, AlertIcon };
