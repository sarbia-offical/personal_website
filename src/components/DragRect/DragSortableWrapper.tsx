import { SortableContext } from '@dnd-kit/sortable';

import type { SortableWrapperProps } from './type';

const SortableWrapper: React.FC<SortableWrapperProps> = (props: SortableWrapperProps) => {
    const { items, children, ...otherProps } = props;
    return (
        <SortableContext items={items} strategy={() => null} {...otherProps}>
            {children}
        </SortableContext>
    );
};

export default SortableWrapper;
