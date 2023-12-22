import { AuthenticateLayout } from "@/hoc/authenticate-layout";

export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (

        <div className='flex flex-col justify-center bg-gray-100 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <AuthenticateLayout>
                    {children}
                </AuthenticateLayout>
            </div>
        </div>
    );
}
