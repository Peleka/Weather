import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppThunkDispatch, AppRootStateType} from "../bll/store";

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
