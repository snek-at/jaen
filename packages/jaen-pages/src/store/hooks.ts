import {useAppSelector} from '.'
import {OptionsState} from './types'

export const useOptions = (): OptionsState => {
  const options = useAppSelector(state => state.options)

  return options
}
