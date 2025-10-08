export type ElementOfArr<T extends unknown[]> = T extends (infer item)[] ? item : never
