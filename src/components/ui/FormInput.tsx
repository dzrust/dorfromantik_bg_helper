import React from "react";
import { View, TextInputProps } from "react-native";
import { ErrorMessage, getIn, useFormikContext } from "formik";
import { Input } from "./Input";
import { Small } from "./TextVariants";
import { cn } from "../../lib/cn";

interface FormInputProps extends Omit<TextInputProps, "value" | "onChangeText" | "onBlur"> {
  name: string;
  className?: string;
}

export function FormInput({ name, className, ...props }: FormInputProps) {
  const { values, touched, errors, handleChange, handleBlur } = useFormikContext<any>();
  const isTouched = getIn(touched, name);
  const error = getIn(errors, name);
  return (
    <View>
      <Input
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={getIn(values, name)}
        className={cn(isTouched && error ? "border-red-500" : "", className)}
        {...props}
      />
      <ErrorMessage name={name} component={Small} className="text-red-600 mt-1" />
    </View>
  );
}
