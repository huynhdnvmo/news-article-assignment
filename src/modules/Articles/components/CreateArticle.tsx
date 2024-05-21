import wait from "@/helpers/wait";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { lazy, useCallback, useState } from "react";
import { useGetStateArticlesList } from "../context";

const ArticleForm = lazy(() => wait().then(() => import("../ArticleForm")));

export default function CreateArticle() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const fetchItems = useGetStateArticlesList((s) => s?.fetchItems);

  const handleReload = useCallback(() => {
    setShowForm(false);
    fetchItems?.({ pageIndex: 1 });
  }, [fetchItems]);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => {
          setShowForm(true);
        }}
      >
        Create
      </Button>
      {showForm ? (
        <ArticleForm
          open
          formType="create"
          onSubmitSuccess={handleReload}
          onCancel={() => {
            setShowForm(false);
          }}
        />
      ) : null}
    </>
  );
}
