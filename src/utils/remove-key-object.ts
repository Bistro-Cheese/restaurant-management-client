import { UserFormValues } from '@/app/(page)/(root)/(admin)/owner/_components/create-employee-form';

const removeUnwantedKeys = (data: UserFormValues, unwantedKeys: string[]) => {
    unwantedKeys.forEach((unwantedKey) => {
        console.log('removedKey at useUser:::', unwantedKey);
        delete data[unwantedKey as keyof UserFormValues];
    });
    console.log('object after cleaning unwanted keys:::', data);

    return data;
};

export default removeUnwantedKeys;
