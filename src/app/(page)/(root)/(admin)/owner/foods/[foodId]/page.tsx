'use client';

import { FoodForm } from '../../_components/create-food-form';

interface ProductPageProps {
    params: {
        foodId: string;
    };
}

const FoodPage: React.FC<ProductPageProps> = ({ params }) => {
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <FoodForm foodId={params.foodId} />
            </div>
        </div>
    );
};

export default FoodPage;
