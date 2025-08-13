
import React from "react";
import { Pressable, Text, PressableProps } from "react-native";
import { cn } from "../../lib/cn";

type ColorVariant = "primary" | "secondary" | "tertiary";
type StyleVariant = "solid" | "outline" | "ghost";

type Props = PressableProps & {
  color?: ColorVariant;
  variant?: StyleVariant;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  children?: React.ReactNode;
};

const colorStyles: Record<ColorVariant, any> = {
  primary: {
    solid: "bg-blue-600",
    outline: "border border-blue-600",
    ghost: "",
    textSolid: "text-white",
    textOutline: "text-blue-600",
    textGhost: "text-blue-600",
    disabledBg: "bg-blue-300",
    disabledText: "text-white/70",
  },
  secondary: {
    solid: "bg-green-600",
    outline: "border border-green-600",
    ghost: "",
    textSolid: "text-white",
    textOutline: "text-green-600",
    textGhost: "text-green-600",
    disabledBg: "bg-green-300",
    disabledText: "text-white/70",
  },
  tertiary: {
    solid: "bg-neutral-800",
    outline: "border border-neutral-800",
    ghost: "",
    textSolid: "text-white",
    textOutline: "text-neutral-800",
    textGhost: "text-neutral-800",
    disabledBg: "bg-neutral-400",
    disabledText: "text-white/70",
  },
};

export function Button({
  color = "primary",
  variant = "solid",
  size = "md",
  disabled = false,
  className,
  textClassName,
  children,
  ...rest
}: Props) {
  const base = "items-center justify-center rounded-2xl";
  const sizes: Record<string, string> = {
    sm: "h-9 px-3",
    md: "h-11 px-4",
    lg: "h-12 px-5",
  };

  const styles = colorStyles[color];
  const bg =
    variant === "solid"
      ? styles.solid
      : variant === "outline"
      ? styles.outline
      : styles.ghost;
  const textColor =
    variant === "solid"
      ? styles.textSolid
      : variant === "outline"
      ? styles.textOutline
      : styles.textGhost;

  const disabledBg =
    variant === "solid" ? styles.disabledBg : variant === "outline" ? styles.outline : "";
  const disabledText = styles.disabledText;

  return (
    <Pressable
      className={cn(
        base,
        sizes[size],
        disabled ? disabledBg : bg,
        disabled && "opacity-60",
        className
      )}
      android_ripple={{ color: "#00000022" }}
      disabled={disabled}
      {...rest}
    >
      <Text
        className={cn(
          disabled ? disabledText : textColor,
          "text-base font-semibold",
          textClassName
        )}
      >
        {children}
      </Text>
    </Pressable>
  );
}
