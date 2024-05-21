import wait from "@/helpers/wait";
import moment from "moment";
import { lazy, useCallback, useMemo } from "react";
import { useGetStateArticlesList, useSetStateArticlesList } from "../context";

const ArticleForm = lazy(() => wait().then(() => import("../ArticleForm")));

export default function EditArticle() {
  const isEdit = useGetStateArticlesList(
    (s) => s?.itemInteractAction === "edit"
  );
  const item = useGetStateArticlesList((s) => s?.itemToInteract);
  const fetchItems = useGetStateArticlesList((s) => s?.fetchItems);

  const shouldShow = useMemo(() => isEdit && !!item, [isEdit, item]);

  const setState = useSetStateArticlesList();

  const hancleCancel = useCallback(() => {
    setState({
      itemInteractAction: "",
      itemToInteract: null,
    });
  }, [setState]);

  const handleReload = useCallback(() => {
    setState({
      itemInteractAction: "",
      itemToInteract: null,
    });

    fetchItems?.();
  }, [fetchItems, setState]);

  const formValues = useMemo(
    () => ({
      id: item?.id,
      title: item?.title || "",
      summary: item?.summary || "",
      date: !item?.date ? null : moment(item.date, "DD/MM/YYYY"),
      publisher: item?.publisher || "",
    }),
    [item?.title, item?.summary, item?.date, item?.publisher, item?.id]
  );

  return shouldShow ? (
    <ArticleForm
      open
      values={formValues}
      formType="edit"
      onSubmitSuccess={handleReload}
      onCancel={hancleCancel}
    />
  ) : null;
}
