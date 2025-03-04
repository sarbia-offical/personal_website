import type { SizeEnum } from '@/constants/containerBox.constants';
import type { UniqueIdentifier } from '@dnd-kit/core';

export interface CardItems {
    id: UniqueIdentifier;
    size: SizeEnum;
    componentId?: string;
}
