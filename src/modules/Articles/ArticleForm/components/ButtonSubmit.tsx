import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import { memo } from "react";
import { useGetStateArticleForm } from "../context";

const ButtonSubmit = memo(() => {
  const doSubmit = useGetStateArticleForm((s) => s?.doSubmit);

  return (
    <Button type="button" variant="contained" startIcon={<CheckIcon />} onClick={doSubmit}>
      Save
    </Button>
  );
});

ButtonSubmit.displayName = "ButtonSubmit";
export default ButtonSubmit;
