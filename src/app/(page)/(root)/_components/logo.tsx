import Image from 'next/image';
import React from 'react';

export const Logo = () => {
    return <Image height={40} width={40} alt='logo' src='/logo.svg' />;
};
