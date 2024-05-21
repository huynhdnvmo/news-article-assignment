import createFastContext from "@/helpers/createFastContext";
import type {
  ArticleFormStates,
  ArticleFormErrors,
  ArticleFormValues,
} from "./types";
import { memo, useCallback, useEffect, useRef } from "react";
import moment from "moment";
import isEqual from "lodash/isEqual";
import articleServices from "@/services/articles-services";

export const {
  Provider: ArticleFormProvider,
  useGetState: useGetStateArticleForm,
  useInitState: useInitStateArticleForm,
  useSetState: useSetStateArticleForm,
} = createFastContext<ArticleFormStates>();

export const SubmitListener = memo(
  ({ onSubmitSuccess }: { onSubmitSuccess?: (feedback?: unknown) => void }) => {
    const values = useGetStateArticleForm((s) => s?.values);
    const formType = useGetStateArticleForm((s) => s?.formType);
    const doValidate = useGetStateArticleForm((s) => s?.doValidate);
    const setState = useSetStateArticleForm();

    const handleAfterSuccess = useCallback(
      (feedback?: unknown) => {
        setState({ values: null });
        onSubmitSuccess?.(feedback);
      },
      [onSubmitSuccess, setState]
    );

    const doSubmit = useCallback(() => {
      if (doValidate?.(values) !== true) return;
      if (!values) return;
      console.log(values);

      if (formType === "create") {
        articleServices
          .addArticle({
            ...values,
            date: values.date?.format("DD/MM/YYYY"),
          })
          .then(({ isSuccess }) => {
            if (isSuccess) {
              handleAfterSuccess();
            }
          });
        return;
      }

      if (formType === "edit") {
        articleServices
          .updateArticle({
            ...values,
            date: values.date?.format("DD/MM/YYYY"),
          })
          .then(({ isSuccess }) => {
            if (isSuccess) {
              handleAfterSuccess();
            }
          });
        return;
      }
    }, [values, formType, doValidate, handleAfterSuccess]);

    useInitStateArticleForm("doSubmit", doSubmit, {
      when: "whenever-value-changes",
    });

    useInitStateArticleForm("onSubmitSuccess", handleAfterSuccess, {
      when: "whenever-value-changes",
    });

    return null;
  }
);
SubmitListener.displayName = "SubmitListener";

export const CancelInitializer = memo(
  ({ onCancel }: { onCancel?: () => void }) => {
    const setState = useSetStateArticleForm();

    const hancleCancel = useCallback(() => {
      setState({ values: null });
      onCancel?.();
    }, [onCancel, setState]);

    useInitStateArticleForm("onCancel", hancleCancel, {
      when: "whenever-value-changes",
    });

    return null;
  }
);
CancelInitializer.displayName = "CancelInitializer";

export const ValidateInitializer = memo(() => {
  const setState = useSetStateArticleForm();
  const doValidate = useCallback(
    (values: ArticleFormStates["values"]) => {
      const errors: ArticleFormErrors = {};
      if (!values?.title) {
        errors.title = "please enter";
      }

      if (!values?.summary) {
        errors.summary = "please enter";
      }

      if (!values?.publisher) {
        errors.publisher = "please enter";
      }

      if (!values?.date) {
        errors.date = "please enter";
      }

      if (!moment.isMoment(values?.date)) {
        errors.date = "invalid date";
      }

      const isValid = !Object.keys(errors).length;

      setState({ errors: isValid ? null : errors });

      return isValid;
    },
    [setState]
  );

  useInitStateArticleForm("doValidate", doValidate, {
    when: "whenever-value-changes",
  });

  return null;
});
ValidateInitializer.displayName = "ValidateInitializer";

const usePrevious = <T>(value: T): T => {
  const ref: any = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const ValuesInitializer = memo(
  ({
    values,
    formType = "create",
  }: {
    values?: Partial<ArticleFormValues>;
    formType?: "create" | "edit";
  }) => {
    const preValues = usePrevious(values);
    const setState = useSetStateArticleForm();

    useEffect(
      function controlValues() {
        setTimeout(() => {
          if (isEqual(values || null, preValues || null)) return;
          setState((states) => ({
            ...states,
            ...(!isEqual(values, states?.values)
              ? {
                  values: { ...states?.values, ...values },
                }
              : {}),
          }));
        }, 0);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [values]
    );

    useInitStateArticleForm("formType", formType, {
      when: "whenever-value-changes",
    });

    return null;
  }
);
ValuesInitializer.displayName = "ValuesInitializer";
