import { defaultHead } from 'next/head';

function getEnumKeyByEnumValue<T extends { [index: string]: any }>(
    myEnum: T,
    enumValue: number
): keyof T | null {
    let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
}

export default getEnumKeyByEnumValue;
