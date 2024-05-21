import TextField, { TextFieldProps } from "@mui/material/TextField";
import { memo, useCallback, useMemo } from "react";
import { useGetStateArticleForm, useSetStateArticleForm } from "../context";

const InputTitle = memo(() => {
  const setState = useSetStateArticleForm();
  const value = useGetStateArticleForm((s) => s?.values?.title);
  const error = useGetStateArticleForm((s) => s?.errors?.title);
  const isError = useMemo(() => !!error, [error]);
  const errorText = useMemo(() => error || undefined, [error]);

  const handleChange: Required<TextFieldProps>["onChange"] = useCallback(
    (e) => {
      setState((states) => ({
        ...states,
        values: {
          ...states?.values,
          title: e?.target?.value || "",
        },
      }));
    },
    [setState]
  );

  return (
    <TextField
      fullWidth
      label="Title"
      name="title"
      value={value || ""}
      onChange={handleChange}
      error={isError}
      helperText={errorText}
    />
  );
});

InputTitle.displayName = "InputTitle";
export default InputTitle;
