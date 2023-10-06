export type TypeKeys<T, R> = {
    [K in keyof T]: T[K] extends R ? K : never;
}[keyof T]

export type TypeValues<T, R> = Pick<T, TypeKeys<T, R>>
