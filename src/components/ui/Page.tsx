import React from "react";
import { ScrollView, View, ViewProps } from "react-native";
import { cn } from "../../lib/cn";

type Props = ViewProps & {
  children: React.ReactNode;
  scroll?: boolean;
  className?: string;
};

export function Page({ children, scroll = false, className, ...p }: Props) {
  const Wrapper: any = scroll ? ScrollView : View;
  const scrollProps = scroll ? { contentContainerStyle: { flexGrow: 1 } } : {};

  return (
    <Wrapper className={cn("flex-1 bg-neutral-50 p-4", className)} {...scrollProps} {...p}>
      {children}
    </Wrapper>
  );
}
