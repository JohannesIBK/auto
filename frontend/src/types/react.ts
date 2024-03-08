import { Dispatch, MutableRefObject, SetStateAction } from "react";

export type UseState<T> = Dispatch<SetStateAction<T>>;
export type UseRef<T> = MutableRefObject<T>;
