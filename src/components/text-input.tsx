import type { Component, JSX } from "solid-js"
import { splitProps } from "solid-js"

import { Input } from "./ui/input"
import { Label } from "./ui/label"

export interface TextInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "email" | "tel" | "password" | "url" | "date"
  label?: string
  error?: string
}

const TextInput: Component<TextInputProps> = (props) => {
  const [, rest] = splitProps(props, ["value", "label", "error"])
  return (
    <div>
      {props.label && (
        <Label for={props.name}>
          {props.label} {props.required && <span>*</span>}
        </Label>
      )}
      <Input
        {...rest}
        id={props.name}
        value={props.value || ""}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
      />
      {props.error && (
        <p id={`${props.name}-error`} class="pt-2 text-xs text-red-600">
          {props.error}
        </p>
      )}
    </div>
  )
}

export { TextInput }
