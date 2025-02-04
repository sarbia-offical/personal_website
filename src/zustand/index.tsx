import { FC, PropsWithChildren, useRef } from "react";
import { DeepPartial } from "utility-types";
import { AppInfoContext } from "./constant";
import { AppInfoState } from "./type"
import { AppStoreType, createAppStore } from "./store";
import { isNil } from "lodash";

export const AppInfoStore: FC<PropsWithChildren<DeepPartial<AppInfoState>>> = ({ children, ...props }) => {
    const appStoreRef = useRef<AppStoreType>(null);
    if(isNil(appStoreRef.current)){
        (appStoreRef as any).current = createAppStore(props)
    }
    return <AppInfoContext.Provider value={appStoreRef.current}>
        { children }
    </AppInfoContext.Provider>
}