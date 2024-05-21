import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid, { GridProps } from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import { ChangeEvent, MouseEventHandler, useCallback, useMemo } from "react";
import {
  ArticleDetail,
  useGetStateArticlesList,
  useSetStateArticlesList,
} from "../context";
import { Typography } from "@mui/material";

function ArticleRow({ data }: { data: ArticleDetail }) {
  const setState = useSetStateArticlesList();

  const handleClickEdit: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      setState({
        itemInteractAction: "edit",
        itemToInteract: data,
      });
    },
    [data, setState]
  );

  const handleClickDelete: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      setState({
        itemInteractAction: "delete",
        itemToInteract: data,
      });
    },
    [data, setState]
  );

  return (
    <TableRow>
      <TableCell>{data.title || ""}</TableCell>
      <TableCell>{data.summary || ""}</TableCell>
      <TableCell>
        {moment(data?.date, "DD/MM/YYYY").format("DD/MM/YYYY")}
      </TableCell>
      <TableCell>{data.publisher || ""}</TableCell>
      <TableCell>
        <Grid container>
          <Grid item xs={6}>
            <IconButton onClick={handleClickEdit} color="primary">
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <IconButton onClick={handleClickDelete} color="primary">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
}

function Rows() {
  const items = useGetStateArticlesList((s) => s?.items);
  return items?.map?.((item) => <ArticleRow key={item?.id} data={item} />);
}

function Nodata() {
  const shouldShow = useGetStateArticlesList((s) => !s?.items?.length);
  return shouldShow ? (
    <TableRow>
      <TableCell colSpan={5} align="center">
        No data.
      </TableCell>
    </TableRow>
  ) : null;
}

function TotalCount() {
  const totalCount = useGetStateArticlesList(
    (s) => s?.pagination?.totalCount || 0
  );
  return <Typography fontWeight={700}>{`Total: ${totalCount}`}</Typography>;
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

export default function ArticleTable(props: Partial<GridProps>) {
  return (
    <Grid container {...props}>
      <Grid
        item
        xs={12}
        container
        mb={2}
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        <Grid item xs={4}>
          <TotalCount />
        </Grid>
        <Grid item xs={8} container justifyContent="flex-end">
          <Paging />
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        container
        component={Paper}
        elevation={5}
        sx={{
          width: "100%",
          overflow: "hidden",
          maxHeight: "600px",
        }}
      >
        <TableContainer sx={{ height: "100%", width: "100%" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Summary</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Publisher</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Rows />
              <Nodata />
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
