import TextField from "@mui/material/TextField";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import type { MobileDatePickerProps } from "@mui/x-date-pickers/MobileDatePicker";
import { useGetStateArticleForm, useSetStateArticleForm } from "../context";
import { memo, useCallback, useMemo } from "react";
import type { Moment } from "moment";

const InputDate = memo(() => {
  const setState = useSetStateArticleForm();
  const value = useGetStateArticleForm((s) => s?.values?.date || null);
  const error = useGetStateArticleForm((s) => s?.errors?.date);
  const isError = useMemo(() => !!error, [error]);
  const errorText = useMemo(() => error || undefined, [error]);

  const handleChange: Required<MobileDatePickerProps<Moment>>["onChange"] =
    useCallback(
      (value) => {
        setState((states) => ({
          ...states,
          values: {
            ...states?.values,
            date: value || null,
          },
        }));
      },
      [setState]
    );

  return (
    <MobileDatePicker
      label="Date"
      value={value}
      format="DD/MM/YYYY"
      onChange={handleChange}
      slots={{
        textField: TextField,
      }}
      slotProps={{
        textField(ownerState) {
          return {
            ...ownerState,
            fullWidth: true,
            name: "date",
            error: isError,
            helperText: errorText,
          };
        },
      }}
    />
  );
});

InputDate.displayName = "InputDate";
export default InputDate;
