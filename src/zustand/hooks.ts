import { useContext } from "react";
import { AppInfoState } from "./type";
import { AppInfoContext } from "./constant";
import { isNil } from "lodash";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";

/**
 * 获取context上的store
 * @param selector 
 * @returns 
 */
const useAppInfoContext = <T>(selector: (state: AppInfoState) => T) => {
    const store = useContext(AppInfoContext);
    if(isNil(store)){
        throw new Error('Missing AppInfoContext.Provider in the tree');
    }
    return useStore(store, useShallow(selector));
}

/**
 * 获取store
 * @returns 
 */
const useAppInfoStore = () => {
    const store = useContext(AppInfoContext);
    if(isNil(store)){
        throw new Error('Missing AppInfoContext in the tree');
    }
    return store;
}

export {
    useAppInfoContext,
    useAppInfoStore
}