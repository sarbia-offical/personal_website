import type { FC, PropsWithChildren } from 'react';
import type { DeepPartial } from 'utility-types';

import { isNil } from 'lodash';
import { useRef } from 'react';

import type { AppStoreType } from './store';
import type { AppInfoState } from './type';

import { AppInfoContext } from './constant';
import { createAppStore } from './store';

export const AppInfoStore: FC<PropsWithChildren<DeepPartial<AppInfoState>>> = ({
    children,
    ...props
}) => {
    const appStoreRef = useRef<AppStoreType>(null);
    if (isNil(appStoreRef.current)) {
        (appStoreRef as any).current = createAppStore(props);
    }
    return (
        <AppInfoContext.Provider value={appStoreRef.current}>{children}</AppInfoContext.Provider>
    );
};
