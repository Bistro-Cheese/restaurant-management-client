import { Dispatch, SetStateAction, useState } from 'react';

// icons
import { CgTrashEmpty } from 'react-icons/cg';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

// components
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import DeleteDialog from './DeleteDialog';

// hooks
import useGetIngredientByName from '@/hooks/ingredient/use-get-ingredient-by-name';

// types
import { InventoryType } from '@/types';
import { IngredientModalType } from '../inventory/page';

interface IProps {
    setModalState: Dispatch<SetStateAction<IngredientModalType>>;
    inventoryList: InventoryType[];
    isInventoryLoading: boolean;
}

const InventoryList = ({
    setModalState,
    inventoryList,
    isInventoryLoading
}: IProps) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteIngredientId, setDeleteIngredientId] = useState('');

    const { getIngredientByName } = useGetIngredientByName();

    const handleUpdateIngredient = (ingredientName: string) => {
        getIngredientByName(ingredientName)
            .unwrap()
            .then((res) => {
                setModalState({
                    id: res.data.id,
                    name: res.data.name,
                    type: res.data.ingredientType,
                    unit: res.data.unit,
                    supplier: res.data.supplier,
                    isOpen: true,
                    isUpdate: true
                });
            });
    };

    const handleDeleteIngredient = (ingredientName: string) => {
        getIngredientByName(ingredientName)
            .unwrap()
            .then((res) => {
                setDeleteIngredientId(res.data.id as string);
            });
        setDeleteDialogOpen(true);
    };

    if (isInventoryLoading) {
        return (
            <div className='text-center text-gray-500'>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <>
            <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md'>
                <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th
                                scope='col'
                                className='px-6 py-4 font-medium text-gray-900'
                            >
                                Ingredient
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-4 font-medium text-gray-900'
                            >
                                Quantity
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-4 font-medium text-gray-900'
                            >
                                Unit
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-4 font-medium text-gray-900'
                            >
                                Supplier
                            </th>
                            <th
                                scope='col'
                                className='px-6 py-4 font-medium text-gray-900'
                            >
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
                        {inventoryList.map((inventory: InventoryType) => (
                            <tr key={inventory.id}>
                                <td className='whitespace-nowrap px-6 py-4'>
                                    <div className='flex items-center'>
                                        <div className='text-sm font-medium text-gray-900'>
                                            {inventory.ingredientName}
                                        </div>
                                    </div>
                                </td>
                                <td className='whitespace-nowrap px-6 py-4'>
                                    <div className='text-sm text-gray-900'>
                                        {inventory.totalQuantity}
                                    </div>
                                </td>
                                <td className='whitespace-nowrap px-6 py-4'>
                                    <div className='text-sm text-gray-900'>
                                        {inventory.unit}
                                    </div>
                                </td>
                                <td className='whitespace-nowrap px-6 py-4'>
                                    <div className='text-sm text-gray-900'>
                                        {inventory.supplier}
                                    </div>
                                </td>
                                <td className='whitespace-nowrap px-6 py-4'>
                                    <div className='text-sm text-gray-900'>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    size='icon'
                                                    variant='ghost'
                                                >
                                                    <HiOutlineDotsVertical className='h-4 w-4 text-tertiary' />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className=''>
                                                <DropdownMenuGroup>
                                                    {/* Edit */}
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleUpdateIngredient(
                                                                inventory.ingredientName
                                                            )
                                                        }
                                                    >
                                                        <HiOutlinePencilSquare className='mr-2 h-4 w-4' />
                                                        <span>Edit</span>
                                                    </DropdownMenuItem>

                                                    {/* Delete */}
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleDeleteIngredient(
                                                                inventory.ingredientName
                                                            )
                                                        }
                                                    >
                                                        <CgTrashEmpty className='mr-2 h-4 w-4' />
                                                        <span>Delete</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <DeleteDialog
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                ingredientId={deleteIngredientId}
            />
        </>
    );
};

export default InventoryList;
