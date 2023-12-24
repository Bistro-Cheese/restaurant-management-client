import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';

type SidebarItemType = {
    icon: LucideIcon | IconType;
    iconActive: LucideIcon | IconType;
    label: string;
    href: string;
};

export default SidebarItemType;
