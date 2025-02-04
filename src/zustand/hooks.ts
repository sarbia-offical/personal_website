import { isNil } from 'lodash';
import { useContext } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

import type { AppInfoState } from './type';

import { AppInfoContext } from './constant';

/**
 * 获取context上的store
 * @param selector
 * @returns
 */
const useAppInfoContext = <T>(selector: (state: AppInfoState) => T) => {
    const store = useContext(AppInfoContext);
    if (isNil(store)) {
        throw new Error('Missing AppInfoContext.Provider in the tree');
    }
    return useStore(store, useShallow(selector));
};

/**
 * 获取store
 * @returns
 */
const useAppInfoStore = () => {
    const store = useContext(AppInfoContext);
    if (isNil(store)) {
        throw new Error('Missing AppInfoContext in the tree');
    }
    return store;
};

export { useAppInfoContext, useAppInfoStore };
