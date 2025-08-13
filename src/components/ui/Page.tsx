import React from "react";
import { SafeAreaView, ScrollView, ViewProps } from "react-native";
import { cn } from "../../lib/cn";

type Props = ViewProps & {
  children: React.ReactNode;
  scroll?: boolean;
  className?: string;
};

export function Page({ children, scroll = true, className, ...p }: Props) {
  const Wrapper: any = scroll ? ScrollView : React.Fragment;
  const wrapperProps = scroll ? { contentContainerStyle: { flexGrow: 1 } } : {};

  return (
    <SafeAreaView className={cn("flex-1 bg-neutral-50", className)} {...p}>
      <Wrapper {...wrapperProps}>{children}</Wrapper>
    </SafeAreaView>
  );
}
