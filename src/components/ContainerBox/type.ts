import { UniqueIdentifier } from "@dnd-kit/core";
import { SizeEnum } from "./constant";

export interface CardItems{
    id: UniqueIdentifier,
    size: SizeEnum,
    componentId?: string
}