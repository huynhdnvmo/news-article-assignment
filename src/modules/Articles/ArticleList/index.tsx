import PATHS from "@/constants/paths";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import type { ChangeEvent } from "react";
import { useCallback, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { ArticlesListProvider, useGetStateArticlesList } from "../context";

function TotalCount() {
  const totalCount = useGetStateArticlesList(
    (s) => s?.pagination?.totalCount || 0
  );
  return (
    <Typography fontWeight={700} textTransform="uppercase" color="GrayText">
      {`${totalCount} articles found`}
    </Typography>
  );
}

function Paging() {
  const pageIndex = useGetStateArticlesList(
    (s) => s?.pagination?.pageIndex || 1
  );

  const pageSize = useGetStateArticlesList(
    (s) => s?.pagination?.pageSize || 20
  );

  const totalCount = useGetStateArticlesList(
    (s) => s?.pagination?.totalCount || 0
  );

  const fetchItems = useGetStateArticlesList((s) => s?.fetchItems);

  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / pageSize);
  }, [totalCount, pageSize]);

  const handleChange = useCallback(
    (event: ChangeEvent<unknown>, page: number) => {
      event?.stopPropagation?.();
      event?.preventDefault?.();
      fetchItems?.({ pageIndex: page, pageSize });
    },
    [pageSize, fetchItems]
  );

  return (
    <Pagination
      showFirstButton
      showLastButton
      color="primary"
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
      onChange={handleChange}
      count={totalPages}
      page={pageIndex}
    />
  );
}

function Items() {
  const items = useGetStateArticlesList((s) => s?.items);
  return items?.map?.((item) => (
    <Grid
      item
      xs={12}
      mb={2}
      component={Card}
      key={item.id}
      elevation={4}
      px={2}
    >
      <CardHeader
        subheader={`saigon times ${item.date}`}
        subheaderTypographyProps={{
          textTransform: "uppercase",
          fontSize: "12px",
        }}
        action={
          <IconButton>
            <BookmarkBorderIcon />
          </IconButton>
        }
        sx={{
          pb: 0,
        }}
      />
      <CardHeader
        title={item.title}
        titleTypographyProps={{
          fontWeight: 500,
          color: (theme) => theme.palette.grey[800],
          mb: 1,
        }}
        subheader={`${item.publisher}  |  auto-summarised by scoutasia`}
        subheaderTypographyProps={{
          textTransform: "uppercase",
          fontSize: "12px",
        }}
        sx={{
          pt: 0,
          borderBottom: (theme) => `1px solid ${theme.palette.grey[300]}`,
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.summary}
        </Typography>
      </CardContent>
    </Grid>
  ));
}

export default function ArticleList() {
  return (
    <ArticlesListProvider>
      <Container maxWidth="md" sx={{ height: "100svh" }}>
        <Grid container width="100%" py={4} height="100%">
          <Grid
            item
            xs={12}
            container
            mb={2}
            alignItems="center"
            p={2}
            justifyContent="space-between"
          >
            <TotalCount />
            <NavLink to={PATHS.main}>Page 1</NavLink>
          </Grid>
          <Grid item xs={12} height="calc(100% - 120px)" overflow="auto" p={2}>
            <Items />
          </Grid>
          <Grid
            item
            xs={12}
            container
            mb={2}
            alignItems="center"
            justifyContent="center"
            p={2}
          >
            <Paging />
          </Grid>
        </Grid>
      </Container>
    </ArticlesListProvider>
  );
}
