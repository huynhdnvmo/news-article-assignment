import type { LocalizationProviderProps } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import type { Moment } from "moment";
import "moment/locale/en-gb";

export type DateTimeProviderProps = Omit<
  LocalizationProviderProps<Moment, string>,
  "dateAdapter" | "moment" | "locale"
>;

export default function DateTimeProvider(props: DateTimeProviderProps) {
  const { children, ...otherProps } = props;
  return (
    <LocalizationProvider
      {...otherProps}
      dateAdapter={AdapterMoment}
      adapterLocale="en-gb"
    >
      {children}
    </LocalizationProvider>
  );
}
