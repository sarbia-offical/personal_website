import type { SizeEnum } from '@/pages/about/components/ContainerBox/constant';

type options = Partial<{
    [key: string]: {
        value: any;
        hide: boolean;
    };
}>;

export interface IComponentProps {
    id: number | string;
    componentId: string;
    hide: boolean;
    size: SizeEnum | string;
    options?: options;
}
