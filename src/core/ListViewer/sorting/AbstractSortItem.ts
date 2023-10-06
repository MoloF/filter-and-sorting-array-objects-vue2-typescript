// import { TypeValues } from '@/@types/TypeKeys'

export interface IAbstractSortItemInput {
    name: string;
    // key?: keyof TypeValues<Item, RequiredType>;
    key?: string;
}

export interface IAbstractSortItem {
    data: IAbstractSortItemInput;

    handler(a: unknown, b: unknown): number;
}

export abstract class AbstractSortItem implements IAbstractSortItem {
  constructor (public data: IAbstractSortItemInput) {}

  abstract handler(a: unknown, b: unknown): number;
}
