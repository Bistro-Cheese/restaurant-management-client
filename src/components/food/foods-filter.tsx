import { useGetParams } from '@/hooks/use-get-params';
import { usePathname, useRouter } from 'next/navigation';

import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Categories } from '../category/categories';
import { FoodFilterCase } from './food-filter-case';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select';
import { Input } from '../ui/input';

import { filterByFields } from '@/utils/constants';
import { categories } from '@/utils/fake-data';
import { cn } from '@/lib/utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import qs from 'query-string';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounced';

const formSchema = z.object({
    isAscSort: z.string()
});

export const FoodsFilter = () => {
    const [minValue, setMinValue] = useState<string>('');
    const [maxValue, setMaxValue] = useState<string>('');
    const debouncedMinValue = useDebounce(minValue, 500);
    const debouncedMaxValue = useDebounce(maxValue, 500);

    const pathname = usePathname();
    const router = useRouter();

    const { category, name, sortCase, isAscSort, fromPrice, toPrice } =
        useGetParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isAscSort: ''
        }
    });

    const handleSortValueChange = (value: string) => {
        const url = qs.stringifyUrl(
            {
                url: pathname,
                query: {
                    category: category,
                    name: name,
                    sortCase: sortCase,
                    fromPrice: fromPrice,
                    toPrice: toPrice,
                    isAscSort: value === 'lowtohigh' ? true : false
                }
            },
            { skipNull: true, skipEmptyString: true }
        );

        router.push(url);
    };

    const handleMinValueChange = (value: string) => {
        let val = parseInt(value, 10);
        if (isNaN(val)) {
            setMinValue('');
        } else {
            // is A Number
            val = val >= 0 ? val : 0;
            setMinValue(val.toString());
        }
    };

    const handleMaxValueChange = (value: string) => {
        let val = parseInt(value, 10);
        if (isNaN(val)) {
            setMaxValue('');
        } else {
            // is A Number
            val = val >= 0 ? val : 0;
            setMaxValue(val.toString());
        }
    };

    useEffect(() => {
        const url = qs.stringifyUrl(
            {
                url: pathname,
                query: {
                    category: category,
                    name: name,
                    sortCase: sortCase,
                    fromPrice: debouncedMinValue,
                    toPrice: debouncedMaxValue,
                    isAscSort: isAscSort
                }
            },
            { skipNull: true, skipEmptyString: true }
        );

        router.push(url);
    }, [debouncedMinValue, debouncedMaxValue, pathname, category, sortCase, isAscSort, router, name]);

    return (
        <div className='flex grow flex-col gap-y-3 xl:flex-row xl:items-center xl:justify-between'>
            <Categories items={categories} />

            <div className='flex items-start justify-start gap-x-2'>
                {filterByFields.map((item) => (
                    <FoodFilterCase key={item.nameSortCase} nameSortCase={item.nameSortCase} />
                ))}
                <Form {...form}>
                    <form className='flex'>
                        <FormField
                            control={form.control}
                            name='isAscSort'
                            render={({ field }) => (
                                <FormItem>
                                    <Select
                                        onValueChange={(value) =>
                                            handleSortValueChange(value)
                                        }
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Price' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='lowtohigh'>
                                                Low - High
                                            </SelectItem>
                                            <SelectItem value='hightolow'>
                                                High - Low
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name="minPrice"
                            render={({ field }) => (
                                <FormItem >
                                    <FormControl >
                                        <Input className="w-[100px]"
                                            placeholder="min"
                                            type="number"
                                            inputMode="numeric"
                                            {...field}

                                            onChange={(e) => {
                                                field.onChange(parseInt(e.target.value, 10))
                                                setMinValue(e.target.value)
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>

                            )}
                        />
                        <div className="flex flex-col item-center justify-center"> - </div>
                        <FormField
                            control={form.control}
                            name="maxPrice"
                            render={({ field }) => (
                                <FormItem >
                                    <FormControl >
                                        <Input className="w-[100px]"

                                            placeholder="max"
                                            {...field}

                                        />
                                    </FormControl>
                                </FormItem>

                            )}
                        /> */}
                    </form>
                </Form>
                <Input
                    placeholder='min'
                    value={minValue}
                    type='number'
                    min='0'
                    inputMode='numeric'
                    pattern='[0-9]'
                    className={cn('w-20')}
                    onChange={(e) =>
                        handleMinValueChange(
                            e.target.value.replace(/[^\w\s]/gi, '')
                        )
                    }
                />
                <div className='item-center flex justify-between'> - </div>
                <Input
                    placeholder='max'
                    value={maxValue}
                    type='number'
                    inputMode='numeric'
                    pattern='[0-9]'
                    min='0'
                    className={cn('w-20')}
                    onChange={(e) =>
                        handleMaxValueChange(
                            e.target.value.replace(/[^\w\s]/gi, '')
                        )
                    }
                />
            </div>
        </div>
    );
};
