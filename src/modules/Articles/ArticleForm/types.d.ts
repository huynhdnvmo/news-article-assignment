import type { Moment } from "moment";
import type { DialogProps } from "@mui/material/Dialog";

export type ArticleFormValues = {
  id?: string | number;
  title?: string;
  summary?: string;
  date?: Moment | null;
  publisher?: string;
};

export type ArticleFormErrors = {
  title?: string;
  summary?: string;
  date?: string;
  publisher?: string;
};

export type ArticleFormStates = {
  formType?: "create" | "edit";
  submiting?: boolean;
  values?: ArticleFormValues | null;
  errors?: ArticleFormErrors | null;
  doSubmit?: () => void;
  doValidate?: (values?: ArticleFormValues | null) => boolean;
  onSubmitSuccess?: (feedback?: unknown) => void;
  onCancel?: () => void;
};

export type FormArticleProps = Partial<DialogProps> & {
  formType?: "create" | "edit";
  values?: Partial<ArticleFormValues>;
  onCancel?: () => void;
  onSubmitSuccess?: (feedback?: unknown) => void;
};
