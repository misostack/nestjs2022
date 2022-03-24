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

export interface BaseService<T> {
  create<M>(payload: M): Promise<T>;
  createEach(payload: Array<Partial<T>>): Promise<Array<T>>;
  find(options: ScaffoldingFindOptions): Promise<Array<T>>;
  findOne(id: ID): Promise<T>;
  updateOne(criteria: { id: ID }, payload: Partial<T>): Promise<T>;
  destroyOne(criteria: { id: ID });
}
