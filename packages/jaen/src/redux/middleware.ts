import {Middleware} from 'redux'

export const onErrorResetAndRery = <State>(persistKey: string) => {
  const middleware: Middleware<{}, State> = () => next => action => {
    try {
      return next(action)
    } catch (e) {
      console.error('Error during action dispatching. Call Fn then retry', e)

      localStorage.removeItem(persistKey)

      next({
        type: 'RESET_STATE'
      })

      return next(action)
    }
  }

  return middleware
}
