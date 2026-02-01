"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface ScrollAnimationProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    duration?: number;
    viewport?: { once?: boolean; margin?: string };
}

export default function ScrollAnimation({
    children,
    className = "",
    delay = 0,
    direction = "up",
    duration = 0.5,
    viewport = { once: true, margin: "-10%" },
}: ScrollAnimationProps) {
    const shouldReduceMotion = useReducedMotion();

    const getVariants = (): Variants => {
        if (shouldReduceMotion) {
            return {
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
            };
        }

        const variants = {
            hidden: { opacity: 0, x: 0, y: 0, scale: 0.95 },
            visible: {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                transition: {
                    duration,
                    delay,
                    ease: [0.25, 0.1, 0.25, 1] as any, // Cubic bezier for "premium" feel
                },
            },
        };

        switch (direction) {
            case "up":
                variants.hidden.y = 40;
                break;
            case "down":
                variants.hidden.y = -40;
                break;
            case "left":
                variants.hidden.x = -40;
                break;
            case "right":
                variants.hidden.x = 40;
                break;
            case "none":
            default:
                break;
        }

        return variants;
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={getVariants()}
            className={className}
        >
            {children}
        </motion.div>
    );
}
