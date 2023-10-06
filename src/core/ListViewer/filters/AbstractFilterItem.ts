import { Component } from 'vue'

export interface IAbstractFilterItemInput {
    name: string;
    key: string;
}

export interface IAbstractFilterItem {
  component: Component
  data: IAbstractFilterItemInput;

  handler(value: any): boolean;
  onChange(value: any): void;
}

export abstract class AbstractFilterItem implements IAbstractFilterItem {
  abstract component: Component

  constructor (public data: IAbstractFilterItemInput) {}

  abstract handler(value: any): boolean;

  abstract onChange(value: any): void
}
