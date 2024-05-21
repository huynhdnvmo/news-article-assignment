import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useMemo } from "react";
import { useGetStateArticlesList, useSetStateArticlesList } from "../context";
import articleServices from "@/services/articles-services";

export default function DeleteArticle() {
  const setState = useSetStateArticlesList();
  const isDelete = useGetStateArticlesList(
    (s) => s?.itemInteractAction === "delete"
  );
  const item = useGetStateArticlesList((s) => s?.itemToInteract);
  const fetchItems = useGetStateArticlesList((s) => s?.fetchItems);

  const hancleCancel = useCallback(() => {
    setState({
      itemInteractAction: "",
      itemToInteract: null,
    });
  }, [setState]);

  const shouldShow = useMemo(() => isDelete && !!item, [isDelete, item]);

  const handleConfirm = useCallback(() => {
    if (!item) return;
    articleServices.deleteArticle(item).then(({ isSuccess }) => {
      if (isSuccess) {
        setState({
          itemInteractAction: "",
          itemToInteract: null,
        });
        fetchItems?.();
      }
    });
  }, [item, setState, fetchItems]);

  return shouldShow ? (
    <Dialog open scroll="paper" keepMounted={false} onClose={hancleCancel}>
      <DialogTitle>Please confirm</DialogTitle>
      <DialogContent>
        Do you want to delete the article: <b>{item?.title}</b>?
      </DialogContent>
      <DialogActions>
        <Button onClick={hancleCancel}>No</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
}
