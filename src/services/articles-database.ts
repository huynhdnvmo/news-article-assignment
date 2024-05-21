import wait from "@/helpers/wait";
import cloneDeep from "lodash/cloneDeep";
import mock from "./articles-mock.json";

export type ArticleDetail = {
  id?: number | string;
  title?: string;
  summary?: string;
  date?: string;
  publisher?: string;
};

const paginate = <T>(
  arr: T[] = [],
  page_number: number = 1,
  page_size: number = 10
) => {
  if (
    !(
      arr instanceof Array &&
      arr.length > 0 &&
      typeof page_size === "number" &&
      !Number.isNaN(page_size) &&
      page_size > 0 &&
      typeof page_number === "number" &&
      !Number.isNaN(page_number) &&
      page_number > 0
    )
  )
    return [];

  const source = cloneDeep(arr);
  return source.slice((page_number - 1) * page_size, page_number * page_size);
};

function newGuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function removeAt<T>(arr: T[] = [], index: number = 0) {
  // eslint-disable-next-line prefer-const
  let cloneArray = cloneDeep(arr);
  let updateArray = cloneArray.slice(0, index);
  updateArray = updateArray.concat(
    cloneArray.slice(index + 1, cloneArray.length)
  );
  return updateArray;
}

class SomeDatabase {
  private data: ArticleDetail[];

  public constructor() {
    this.data = mock;
  }

  public async getPaginated(
    pageIndex: number = 1,
    pageSize: number = 10
  ): Promise<{
    totalCount: number;
    items: ArticleDetail[];
  }> {
    await wait();
    return {
      totalCount: this.data.length,
      items: paginate<ArticleDetail>(this.data, pageIndex, pageSize),
    };
  }

  public async add(item: ArticleDetail): Promise<{
    isSuccess?: boolean;
  }> {
    await wait();
    const newData: ArticleDetail[] = [{ ...item, id: newGuid() }, ...this.data];
    this.data = newData;
    return {
      isSuccess: true,
    };
  }

  public async update(item: ArticleDetail): Promise<{
    isSuccess?: boolean;
  }> {
    await wait();
    const newData = cloneDeep(this.data);
    const i = newData.findIndex((o) => o.id === item.id);
    if (i < 0) {
      return {
        isSuccess: false,
      };
    }

    newData[i] = item;
    this.data = newData;
    return {
      isSuccess: true,
    };
  }

  public async remove(item: ArticleDetail): Promise<{
    isSuccess?: boolean;
  }> {
    await wait();
    const i = this.data.findIndex((o) => o.id === item.id);
    if (i < 0) {
      return {
        isSuccess: false,
      };
    }

    const newData = removeAt(this.data, i);
    this.data = newData;
    return {
      isSuccess: true,
    };
  }
}

const db = new SomeDatabase();

export default db;
