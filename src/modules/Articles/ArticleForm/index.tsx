import wait from "@/helpers/wait";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { lazy, useMemo } from "react";
import {
  ArticleFormProvider,
  CancelInitializer,
  SubmitListener,
  useGetStateArticleForm,
  ValidateInitializer,
  ValuesInitializer,
} from "./context";
import type { FormArticleProps } from "./types";

const InputTitle = lazy(() =>
  wait().then(() => import("./components/InputTitle"))
);
const InputSummary = lazy(() =>
  wait().then(() => import("./components/InputSummary"))
);
const InputPublisher = lazy(() =>
  wait().then(() => import("./components/InputPublisher"))
);
const InputDate = lazy(() =>
  wait().then(() => import("./components/InputDate"))
);
const ButtonSubmit = lazy(() =>
  wait().then(() => import("./components/ButtonSubmit"))
);

function FormTitle() {
  const isEdit = useGetStateArticleForm((s) => s?.formType === "edit");
  return <>{isEdit ? "Edit article" : "Create article"}</>;
}

function Form({ ...props }: Partial<DialogProps>) {
  const onCancel = useGetStateArticleForm((s) => s?.onCancel);

  const $Inputs = useMemo(
    () => (
      <Grid container width="100%" p={2}>
        <Grid item xs={12} mb={2}>
          <InputTitle />
        </Grid>
        <Grid item xs={12} mb={2}>
          <InputSummary />
        </Grid>
        <Grid item xs={12} mb={2}>
          <InputDate />
        </Grid>
        <Grid item xs={12}>
          <InputPublisher />
        </Grid>
      </Grid>
    ),
    []
  );

  return (
    <Dialog
      open
      component="form"
      scroll="paper"
      keepMounted={false}
      onClose={onCancel}
      {...props}
    >
      <DialogTitle>
        <FormTitle />
      </DialogTitle>
      <DialogContent>{$Inputs}</DialogContent>
      <DialogActions>
        <ButtonSubmit />
      </DialogActions>
    </Dialog>
  );
}

export default function ArticleForm({
  values,
  onCancel,
  onSubmitSuccess,
  open = false,
  formType,
  ...props
}: FormArticleProps) {
  return (
    <ArticleFormProvider>
      <ValidateInitializer />
      <ValuesInitializer values={values} formType={formType} />
      <CancelInitializer onCancel={onCancel} />
      <SubmitListener onSubmitSuccess={onSubmitSuccess} />
      {!open ? null : <Form {...props} />}
    </ArticleFormProvider>
  );
}
