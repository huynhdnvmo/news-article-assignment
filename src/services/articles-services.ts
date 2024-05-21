import db, { ArticleDetail } from "./articles-database";

const articleServices = {
  async getArticles({
    pageIndex = 1,
    pageSize = 20,
  }: {
    pageIndex?: number;
    pageSize?: number;
  }) {
    const { totalCount, items } = await db.getPaginated(pageIndex, pageSize);
    return {
      totalCount,
      items,
    };
  },

  async addArticle(item: ArticleDetail) {
    const { isSuccess } = await db.add(item);
    return {
      isSuccess,
    };
  },

  async updateArticle(item: ArticleDetail) {
    const { isSuccess } = await db.update(item);
    return {
      isSuccess,
    };
  },

  async deleteArticle(item: ArticleDetail) {
    const { isSuccess } = await db.remove(item);
    return {
      isSuccess,
    };
  },
};
export default articleServices;
