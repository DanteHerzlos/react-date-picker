import { forwardRef, useState } from "react";
import style from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  label?: string;
  customValidationMessage?: string;
  isNumeric?: boolean;
  inputClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    customValidationMessage,
    isLoading = false,
    label,
    inputClassName,
    isNumeric,
    ...props
  },
  ref,
) {
  const [invalid, setInvalid] = useState<boolean>(false);
  const [validationMessage, setValidatiopnMessage] = useState<string>("");

  function onInvalidHandler(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    setInvalid(true);
    if (customValidationMessage) setValidatiopnMessage(customValidationMessage);
    else setValidatiopnMessage(e.currentTarget.validationMessage);

    if (props.onInvalid) props.onInvalid(e);
  }

  function onBlurHandler(e: React.FocusEvent<HTMLInputElement>) {
    if (e.currentTarget.validity.valid) setInvalid(false);
    props.onBlur && props.onBlur(e);
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInvalid(false);
    if (props.onChange) props.onChange(e);
  }

  return (
    <div className={[style.container, props.className].join(" ")}>
      <input
        {...props}
        disabled={props.disabled || isLoading}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        onInvalid={onInvalidHandler}
        placeholder="placeholder"
        className={
          {
            isNumeric: invalid
              ? [style.input, style.isNumeric, style._invalid].join(" ")
              : [style.input, style.isNumeric].join(" "),
            default: invalid
              ? [style.input, style._invalid].join(" ")
              : [style.input].join(" "),
          }[isNumeric ? "isNumeric" : "default"]
        }
        ref={ref}
      />
      <label className={style.label}>{label}</label>
      {invalid && (
        <span className={style.validationMessage}>{validationMessage}</span>
      )}
      {/*
       {isLoading && <CircularLoader className={style.loader} />}
      */}
    </div>
  );
});
