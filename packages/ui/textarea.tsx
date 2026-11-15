// A textarea: `nsh/base`'s Input with several lines, in the look of `inputLook` — one look for a
// field, whatever lines it has. This library's own: nothing here comes from upstream, so there is
// no port region. Yours to change.
import { split } from "nsh";
import { Input as BaseInput, type InputProps as BaseInputProps } from "nsh/base";

import { inputLook } from "./input";

/**
 * A textarea's props: every `nsh/base` Input prop but `multiline` (a textarea is several lines, so
 * the return key writes one), and `invalid`, the look's error state. Its text, placeholder,
 * value, `readonly`, `disabled`, `maxLength`, `onChange` and `onContentSizeChange` are the field's.
 */
export type TextareaProps = Omit<BaseInputProps, "multiline"> & {
  /** Edged in the danger tone, its focus edge too (shadcn's `aria-invalid`). */
  invalid?: boolean;
};

/**
 * A field of several lines, after shadcn/ui's `Textarea`: a field in the look of `input.tsx`'s
 * `inputLook` with `multiline` on — the same fill, edge, text and placeholder, the same 1-point
 * edge that takes the theme's focus edge while it has the keys, 50% while disabled. Its content
 * starts at the top and the box is at least one line's height; the return key writes a line break.
 * `invalid` edges it in the danger tone, its focus edge too, for a field that must be corrected.
 */
export function Textarea(props: TextareaProps) {
  const [, rest] = split(props, ["invalid", "class", "style", "disabledStyle"]);
  // Read where used, so the look follows the appearance and the theme.
  const look = inputLook({
    invalid: () => !!props.invalid,
    readonly: () => !!props.readonly,
    disabled: () => !!props.disabled,
    multiline: true,
  });
  return (
    <BaseInput
      {...rest}
      multiline
      class={props.class ? `${look.class} ${props.class}` : look.class}
      style={[look.style, props.style ?? null]}
      disabledStyle={[look.disabledStyle, props.disabledStyle ?? null]}
    />
  );
}
