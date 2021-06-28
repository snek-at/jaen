import {RootState} from '..'

export type Selector<S> = (state: RootState) => S
