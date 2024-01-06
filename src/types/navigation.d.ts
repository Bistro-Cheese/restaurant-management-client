import { ComponentType, Element } from 'react';

type CommonIconType = LucideIcon | IconType;

export interface IRoute {
    name: string;
    layout?: string;
    icon: CommonIconType;
    iconActive: CommonIconType;
    items?: any;
    path: string;
    secondary?: boolean | undefined;
}
interface RoutesType {
    name: string;
    layout: string;
    icon: CommonIconType;
    path: string;
    secondary?: boolean | undefined;
}
