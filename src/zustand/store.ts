import type { DeepPartial } from 'utility-types';

import { deepMerge } from '@/utils';
import { createStore } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { AppInfoOptions, AppInfoState } from './type';

import { CursorPointType } from './type';

export const createAppStore = (options: DeepPartial<AppInfoOptions> = {}) => {
    return createStore<AppInfoState>()(
        subscribeWithSelector(
            immer(
                devtools(
                    persist(
                        (set) => ({
                            ...deepMerge<AppInfoOptions, DeepPartial<AppInfoOptions>>(
                                {
                                    dragStatus: false,
                                    pointerStatus: CursorPointType.normal,
                                },
                                options,
                                'replace',
                            ),
                            changeDragStatus: (value: boolean) =>
                                set(() => ({ dragStatus: value })),
                            changePointerStatus: (value: CursorPointType) =>
                                set((state: AppInfoState) => {
                                    state.pointerStatus = value;
                                }),
                        }),
                        {
                            name: 'AppStoreInfo',
                        },
                    ),
                    {
                        name: 'AppStoreInfo',
                    },
                ),
            ),
        ),
    );
};

export type AppStoreType = ReturnType<typeof createAppStore>;
