import type { UniqueIdentifier } from '@dnd-kit/core';

import type { SizeEnum } from './constant';

export interface CardItems {
    id: UniqueIdentifier;
    size: SizeEnum;
    componentId?: string;
}
