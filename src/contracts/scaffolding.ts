export interface ScaffoldingFindOptions {
  select: {
    fields: Array<string>;
    populate: [{ collection: string; fields: Array<string> }];
  };
  pagination: { limit: number; offset: number };
  orderBy: { field: string; sort: 'DESC' | 'ASC' };
  filters: Array<Criteria>;
}
export type ID = string | number;
export enum CriteriaModifer {
  lt = 'lt',
  lte = 'lte',
  gt = 'gt',
  gte = 'gte',
  neq = 'neq',
  nin = 'nin',
  in = 'in',
  contains = 'contains',
  startsWith = 'startsWith',
  endsWith = 'endsWith',
}
export type Criteria = {
  field: string;
  modifier: CriteriaModifer;
  value: string | number | boolean | Array<string | number>;
};

export interface BaseService<
  T,
  CreateDTO,
  CreateBatchDTO,
  UpdateDTO,
  UpdateBatchDTO,
  // UpdateBulkDTO,
> {
  create(payload: CreateDTO): Promise<T>;
  createEach(payload: CreateBatchDTO): Promise<Array<T>>;
  find(options: ScaffoldingFindOptions): Promise<Array<T>>;
  findOne(id: ID): Promise<T>;
  updateOne(id: ID, payload: UpdateDTO): Promise<T>;
  updateEach(
    payload: UpdateBatchDTO,
  ): Promise<{ items: Array<{ [key: string]: boolean }> }>;
  // updateBulk(payload: UpdateBulkDTO): Promise<boolean>;
  destroyOne(id: ID): Promise<boolean>;
}
