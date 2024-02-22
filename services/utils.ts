// todo - specify the type of the state and action
export const mockState = (state: any, action:any) => typeof action === 'function'
  ? action(state) : ({ ...state, ...action });
