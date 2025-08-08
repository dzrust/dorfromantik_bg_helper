import React from "react";
import { Pressable, Text, PressableProps } from "react-native";
import { cn } from "../../lib/cn";
import { tokens } from "../../theme/tokens";

type Props = PressableProps & {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  textClassName?: string;
  children?: React.ReactNode;
};

export function Button({
  variant = "solid",
  size = "md",
  className,
  textClassName,
  children,
  ...rest
}: Props) {
  const base = "items-center justify-center " + tokens.radius;
  const sizes: Record<string, string> = {
    sm: "h-9 px-3",
    md: "h-11 px-4",
    lg: "h-12 px-5",
  };
  const variants: Record<string, string> = {
    solid: tokens.primaryBg,
    outline: "bg-transparent border border-black",
    ghost: "bg-transparent",
  };
  return (
    <Pressable
      className={cn(base, sizes[size], variants[variant], "active:opacity-80", className)}
      android_ripple={{ color: "#00000022" }}
      {...rest}
    >
      <Text
        className={cn(
          variant === "solid" ? tokens.primaryText : tokens.text,
          "text-base font-semibold",
          textClassName
        )}
      >
        {children}
      </Text>
    </Pressable>
  );
}
