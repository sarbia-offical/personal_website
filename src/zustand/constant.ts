import { createContext } from 'react';

import type { AppStoreType } from './store';

export const AppInfoContext = createContext<AppStoreType | null>(null);
