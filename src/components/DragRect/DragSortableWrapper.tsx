import type { SortableWrapperProps } from '@/types/dragRect.types';

import { SortableContext } from '@dnd-kit/sortable';

const SortableWrapper: React.FC<SortableWrapperProps> = (props: SortableWrapperProps) => {
    const { items, children, ...otherProps } = props;
    return (
        <SortableContext items={items} strategy={() => null} {...otherProps}>
            {children}
        </SortableContext>
    );
};

export default SortableWrapper;
