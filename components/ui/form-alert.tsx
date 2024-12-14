"use client";

import { Alert, AlertDescription, AlertIcon } from "@/components/ui/alert";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const formAlertVariants = cva("", {
    variants: {
        type: {
            success: "variant-success",
            error: "variant-error",
            idle: "variant-default",
            loading: "variant-info"
        }
    },
    defaultVariants: {
        type: "idle"
    }
});

type FormAlertProps = {
    message: string | null | undefined;
    timeout?: number;
} & VariantProps<typeof formAlertVariants>;

export function FormAlert({ type = "idle", message, timeout = 5000 }: FormAlertProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(true);

        if (type === "success" && timeout > 0) {
            const hideTimer = setTimeout(() => setVisible(false), timeout);
            return () => clearTimeout(hideTimer);
        }
    }, [type, message, timeout]);

    if (!message) return null;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    <Alert
                        variant={type === "loading" ? "info" : type}
                        className={formAlertVariants({ type })}
                    >
                        <AlertDescription className="flex gap-2 items-center">
                            <AlertIcon variant={type === "loading" ? "info" : type} />
                            {message}
                        </AlertDescription>
                    </Alert>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
