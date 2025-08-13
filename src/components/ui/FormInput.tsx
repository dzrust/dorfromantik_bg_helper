import React from "react";
import { View, TextInputProps } from "react-native";
import { Field, ErrorMessage } from "formik";
import { Input } from "./Input";
import { Small } from "./TextVariants";
import { cn } from "../../lib/cn";

interface FormInputProps extends Omit<TextInputProps, 'value' | 'onChangeText' | 'onBlur'> {
  name: string;
  className?: string;
  showError?: boolean;
}

export function FormInput({ 
  name, 
  className, 
  showError = true, 
  ...props 
}: FormInputProps) {
  return (
    <View>
      <Field name={name}>
        {({ field, meta }: any) => (
          <Input
            value={field.value || ""}
            onChangeText={field.onChange(name)}
            onBlur={field.onBlur(name)}
            className={cn(
              showError && meta.touched && meta.error ? "border-red-500" : "",
              className
            )}
            {...props}
          />
        )}
      </Field>
      {showError && (
        <ErrorMessage name={name} component={Small} className="text-red-600 mt-1" />
      )}
    </View>
  );
}