import { ErrorMessage, getIn, useFormikContext } from "formik";
import React from "react";
import { View } from "react-native";
import { Input, InputProps } from "./input";
import { Text } from "./text";

type FormInputProps = {
  name: string;
  label: string;
  helperText?: string;
  className?: string;
} & Omit<InputProps, 'value' | 'onChangeText' | 'onBlur'>;

export function FormInput({
  name,
  className = '',
  label,
  helperText,
  ...inputProps
}: FormInputProps) {
  const { values, touched, errors, handleChange, handleBlur } =
    useFormikContext<any>();
  const isTouched = getIn(touched, name);
  const error = getIn(errors, name);
  const hasError = isTouched && error;

  return (
    <View className={`mb-4 ${className}`}>
      <Text className="text-gray-700 font-medium mb-2" size="sm">
        {label}
      </Text>
      
      <Input
        {...inputProps}
        value={getIn(values, name)}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        isInvalid={hasError}
      />
      
      {helperText && (
        <Text className="text-gray-500 mt-1" size="sm" variant="caption">
          {helperText}
        </Text>
      )}
      
      <ErrorMessage
        name={name}
        render={(msg) => (
          <Text className="text-red-600 mt-1" size="sm" variant="caption">
            {msg}
          </Text>
        )}
      />
    </View>
  );
}