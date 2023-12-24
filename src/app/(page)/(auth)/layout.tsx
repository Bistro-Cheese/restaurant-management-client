import { AuthenticateLayout } from '@/hoc/authenticate-layout';

export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex flex-col justify-center bg-background px-6 lg:px-8'>
            <div className='mx-auto w-full max-w-md'>
                <AuthenticateLayout>{children}</AuthenticateLayout>
            </div>
        </div>
    );
}
