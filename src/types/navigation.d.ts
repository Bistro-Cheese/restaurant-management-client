import { ComponentType, Element } from 'react';

export interface IRoute {
    name: string;
    layout?: string;
    icon: LucideIcon | IconType;
    iconActive: LucideIcon | IconType;
    items?: any;
    path: string;
    secondary?: boolean | undefined;
}
interface RoutesType {
    name: string;
    layout: string;
    icon: LucideIcon | IconType;
    path: string;
    secondary?: boolean | undefined;
}
