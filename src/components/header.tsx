import { HeaderContent } from "@/components/header-content"
import { MobileSidebar } from "./mobile-sidebar"
import { Logo } from "@/app/(page)/(root)/(admin)/_components/logo"




export const Header = () => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <div className="p-6">
                <Logo />
            </div>
            <MobileSidebar />
            <HeaderContent />
        </div>
    )
}