import createFastContext from "@/helpers/createFastContext";
import articleServices from "@/services/articles-services";
import { memo, ReactNode, useCallback, useEffect } from "react";

export type ArticleDetail = {
  id?: number | string;
  title?: string;
  summary?: string;
  date?: string;
  publisher?: string;
};

export type ArticlesListStates = {
  fetchItems?: (params?: {
    pageIndex?: number;
    pageSize?: number;
  }) => Promise<void>;
  fetching?: boolean;
  pagination?: {
    pageIndex?: number;
    pageSize?: number;
    totalCount?: number;
  };
  items?: ArticleDetail[];
  itemToInteract?: ArticleDetail | null;
  itemInteractAction?: "edit" | "delete" | "";
};

const {
  Provider,
  useGetState: useGetStateArticlesList,
  useInitState: useInitStateArticlesList,
  useSetState: useSetStateArticlesList,
} = createFastContext<ArticlesListStates>({
  items: [],
  itemInteractAction: "",
  itemToInteract: null,
  fetching: false,
  pagination: {
    pageIndex: 1,
    pageSize: 20,
    totalCount: 0,
  },
});

export {
  useGetStateArticlesList,
  useInitStateArticlesList,
  useSetStateArticlesList
};

const FetchDataInitializer = memo(() => {
  const setState = useSetStateArticlesList();
  const fetching = useGetStateArticlesList((s) => !!s?.fetching);
  const currentPageIndex = useGetStateArticlesList(
    (s) => s?.pagination?.pageIndex
  );
  const currentPageSize = useGetStateArticlesList(
    (s) => s?.pagination?.pageSize
  );

  const fetchItems = useCallback(
    async (params?: { pageIndex?: number; pageSize?: number }) => {
      if (fetching) return;
      setState({ fetching: true });
      const { pageIndex = currentPageIndex, pageSize = currentPageSize } =
        params || {};
      const { items, totalCount } = await articleServices.getArticles({
        pageIndex,
        pageSize,
      });

      setState((states) => ({
        ...states,
        fetching: false,
        items,
        pagination: {
          ...states?.pagination,
          pageIndex,
          pageSize,
          totalCount,
        },
      }));
    },
    [fetching, currentPageIndex, currentPageSize, setState]
  );

  useInitStateArticlesList("fetchItems", fetchItems, {
    when: "whenever-value-changes",
  });

  useEffect(() => {
    const fetchOnMount = async () => {
      await fetchItems();
    };
    fetchOnMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
});
FetchDataInitializer.displayName = "FetchDataInitializer";

export function ArticlesListProvider({ children }: { children?: ReactNode }) {
  return (
    <Provider>
      <FetchDataInitializer />
      {children}
    </Provider>
  );
}
