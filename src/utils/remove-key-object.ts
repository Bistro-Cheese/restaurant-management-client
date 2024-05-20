import { UserFormValues } from '@/app/(page)/(root)/(admin)/owner/_components/create-employee-form';

const removeUnwantedKeys = (data: UserFormValues, unwantedKeys: string[]) => {
    unwantedKeys.forEach((unwantedKey) => {
        delete data[unwantedKey as keyof UserFormValues];
    });

    return data;
};

export default removeUnwantedKeys;
