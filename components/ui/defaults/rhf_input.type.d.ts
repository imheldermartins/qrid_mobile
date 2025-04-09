import {
  Controller,
  UseControllerProps,
  Control,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

import { TextInput as InputType, TextInputProps, View } from "react-native";
import { C, F, S } from "../Typography/style";

/**
 * Mantém <T extends FieldValues> para que esse Input possa ser usado
 * em qualquer formulário.
 */
type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  error?: string;
  required?: string | boolean;
  typeField?: "text" | "password" | "email";
  value?: PathValue<T, Path<T>>;
  title?: string;
  f?: F;
  s?: S;
  c?: C;
  fullWidth?: boolean;
} & Omit<UseControllerProps<T>, "control" | "name"> &
  TextInputProps;

export { Props as InputProps };
