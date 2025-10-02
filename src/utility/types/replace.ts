export type Replace<T extends string, Old extends string, New extends string> = T extends Old ? New : T;
