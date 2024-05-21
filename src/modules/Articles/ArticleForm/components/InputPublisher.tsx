import TextField, { TextFieldProps } from "@mui/material/TextField";
import { memo, useCallback, useMemo } from "react";
import { useGetStateArticleForm, useSetStateArticleForm } from "../context";

const InputPublisher = memo(() => {
  const setState = useSetStateArticleForm();
  const value = useGetStateArticleForm((s) => s?.values?.publisher);
  const error = useGetStateArticleForm((s) => s?.errors?.publisher);
  const isError = useMemo(() => !!error, [error]);
  const errorText = useMemo(() => error || undefined, [error]);

  const handleChange: Required<TextFieldProps>["onChange"] = useCallback(
    (e) => {
      setState((states) => ({
        ...states,
        values: {
          ...states?.values,
          publisher: e?.target?.value || "",
        },
      }));
    },
    [setState]
  );

  return (
    <TextField
      fullWidth
      label="Publisher"
      name="publisher"
      value={value || ""}
      onChange={handleChange}
      error={isError}
      helperText={errorText}
    />
  );
});

InputPublisher.displayName = "InputPublisher";
export default InputPublisher;
