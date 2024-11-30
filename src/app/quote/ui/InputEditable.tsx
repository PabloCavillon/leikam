import { Product } from '@/interfaces'
import clsx from 'clsx';
import React, { useState } from 'react'

interface Props {
    product:Product;
    quantities: {[id:string]: number};
    handleChangeQuantity: (product: Product, quantityStr: string) => void;
}

export const InputEditable = ({product, quantities, handleChangeQuantity}: Props)  => {
    
    const {id} = product;
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    }

    const handleBlur = () => {
        setOpen(false);
    }

    const handleEnter = (event:any) => {
        if (event.key === 'Enter'){
            setOpen(false);
        }
    }

    return (
        <>
            <div className={clsx({'hidden': !open}, {'block': open})}>
                <input
                    onKeyDown={handleEnter}
                    onBlur={handleBlur}
                    className='bg-transparent border-b-2 text-center w-full'
                    type="number"
                    value={quantities[id] || 0} 
                    onChange={({target}) =>
                        handleChangeQuantity(product, target.value)
                    }
                    min={0} 
                />
            </div>
            <div className={clsx({'hidden': open}, {'block': !open})}>
                <span>{quantities[id]}</span>
                <span onClick={handleClick}>Editar</span>
            </div>
        </>
    )
}
