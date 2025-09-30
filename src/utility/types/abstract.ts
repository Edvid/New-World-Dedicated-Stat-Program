export type AbstractType<T extends Record<keyof T, never>> = T
