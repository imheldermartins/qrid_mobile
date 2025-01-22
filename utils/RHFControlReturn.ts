import { Control, FieldValues } from "react-hook-form";

type Prop = Control<FieldValues> | Record<string, any>;

export default function RHFControlReturn(control: Prop) {
    return (control as unknown) as Control<FieldValues>;
}