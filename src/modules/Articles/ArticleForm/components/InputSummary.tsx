import TextField, { TextFieldProps } from "@mui/material/TextField";
import { memo, useCallback, useMemo } from "react";
import { useGetStateArticleForm, useSetStateArticleForm } from "../context";

const InputSummary = memo(() => {
  const setState = useSetStateArticleForm();
  const value = useGetStateArticleForm((s) => s?.values?.summary);
  const error = useGetStateArticleForm((s) => s?.errors?.summary);
  const isError = useMemo(() => !!error, [error]);
  const errorText = useMemo(() => error || undefined, [error]);

  const handleChange: Required<TextFieldProps>["onChange"] = useCallback(
    (e) => {
      setState((states) => ({
        ...states,
        values: {
          ...states?.values,
          summary: e?.target?.value || "",
        },
      }));
    },
    [setState]
  );

  return (
    <TextField
      fullWidth
      label="Summary"
      name="summary"
      value={value || ""}
      onChange={handleChange}
      multiline
      rows={3}
      error={isError}
      helperText={errorText}
    />
  );
});

InputSummary.displayName = "InputSummary";
export default InputSummary;
