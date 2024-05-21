import wait from "@/helpers/wait";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { lazy } from "react";
import { ArticlesListProvider } from "./context";
import { NavLink } from "react-router-dom";
import PATHS from "@/constants/paths";

const ArticleTable = lazy(() => wait().then(() => import("./ArticleTable")));

const CreateArticle = lazy(() =>
  wait().then(() => import("./components/CreateArticle"))
);

const EditArticle = lazy(() =>
  wait().then(() => import("./components/EditArticle"))
);

const DeleteArticle = lazy(() =>
  wait().then(() => import("./components/DeleteArticle"))
);

export default function Articles() {
  return (
    <ArticlesListProvider>
      <Container maxWidth="md" sx={{ height: "100svh" }}>
        <Grid container width="100%" py={4}>
          <Grid
            item
            xs={12}
            container
            alignItems="center"
            justifyContent="space-between"
          >
            <CreateArticle />
            <NavLink to={PATHS.second}>Page 2</NavLink>
          </Grid>
          <EditArticle />
          <DeleteArticle />
          <Grid item xs={12}>
            <ArticleTable />
          </Grid>
        </Grid>
      </Container>
    </ArticlesListProvider>
  );
}
