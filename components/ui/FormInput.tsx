import { InterfaceFormControlProps } from "@gluestack-ui/form-control/lib/types";
import { ErrorMessage, getIn, useFormikContext } from "formik";
import React from "react";
import { TextInputProps } from "react-native";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "./form-control";
import { IInputFieldProps, Input, InputField } from "./input";

type FormInputProps = {
  name: string;
  label: string;
  helperText?: string;
  className?: string;
  inputProps: Omit<TextInputProps, "value" | "onChangeText" | "onBlur"> &
    IInputFieldProps;
} & InterfaceFormControlProps;

export function FormInput({
  name,
  className,
  label,
  helperText,
  inputProps,
  ...props
}: FormInputProps) {
  const { values, touched, errors, handleChange, handleBlur } =
    useFormikContext<any>();
  const isTouched = getIn(touched, name);
  const error = getIn(errors, name);
  return (
    <FormControl isInvalid={isTouched && error} size="md" {...props}>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input className="my-1">
        <InputField
          {...inputProps}
          value={getIn(values, name)}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
        />
      </Input>
      {helperText && helperText.length > 0 ? (
        <FormControlHelper>
          <FormControlHelperText>{helperText}</FormControlHelperText>
        </FormControlHelper>
      ) : null}
      <ErrorMessage
        name={name}
        render={(msg) => (
          <FormControlError>
            <FormControlErrorText>{msg}</FormControlErrorText>
          </FormControlError>
        )}
      />
    </FormControl>
  );
}
