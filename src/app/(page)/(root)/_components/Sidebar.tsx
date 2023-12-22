interface IProps {
    children?: React.ReactNode;
}

export const Sidebar = ({ children }: IProps) => {
    return (
        <div className='flex h-full flex-col overflow-y-auto border-r bg-white shadow-sm'>
            <div className='flex w-full flex-col'>{children}</div>
        </div>
    );
};
