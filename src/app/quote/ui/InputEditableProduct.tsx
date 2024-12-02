import { Product } from '@/interfaces'
import clsx from 'clsx';
import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import { FaRegEdit } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

interface Props {
    id:string;
    value: number;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>, id:string) => void;
}

export const InputEditableProduct = ({id, value, handleChange}: Props)  => {
    
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
                    value={value} 
                    onChange={ (event) => handleChange(event, id) }
                    min={0} 
                />
            </div>
            <div className={clsx('flex flex-row items-center justify-center gap-1',{'hidden': open}, {'block': !open})}>
                <span>{value}</span>
                <span className='hover:cursor-pointer hover:text-blue-500' onClick={handleClick}><CiEdit /></span>
            </div>
        </>
    )
}
