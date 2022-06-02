import {Nullable} from "../../types";

const initialState: AppStateType = {
  isInitialized: false,
  status: 'idle',
  error: null
}

export const appReducer = (state: AppStateType = initialState, action: AppActions): AppStateType => {

  switch (action.type) {
    case AppActionType.SET_INITIALIZED:
    case AppActionType.SET_STATUS:
    case AppActionType.SET_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state
  }
}

export const setAppStatus = (status: AppStatusType) => ({type: AppActionType.SET_STATUS, payload: {status}} as const)
export const setAppIsInitialized = (isInitialized: boolean) => ({
  type: AppActionType.SET_INITIALIZED,
  payload: {isInitialized}
} as const)
export const setAppError = (error: Nullable<string>) => ({type: AppActionType.SET_ERROR, payload: {error}} as const)

//types
export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStateType = {
  isInitialized: boolean
  status: AppStatusType
  error: string | null
}

enum AppActionType {
  SET_STATUS = 'SET_STATUS',
  SET_ERROR = 'SET_ERROR',
  SET_INITIALIZED = 'SET_INITIALIZED',
}

export type AppActions =
  | ReturnType<typeof setAppError>
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppIsInitialized>
