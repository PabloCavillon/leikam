'use client'

import clsx from 'clsx';
import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import { formatNumber } from '@/util';

interface Props {
    value: number;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputEditable = ({value, handleChange}: Props)  => {
    
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    }

    const handleBlur = () => {
        setOpen(false);
    }

    const handleEnter = (event:React.KeyboardEvent<HTMLInputElement>) => {
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
                    onChange={(event) =>
                        handleChange(event)
                    }
                    min={0} 
                />
            </div>
            <div className={clsx('flex flex-row items-center justify-center gap-1',{'hidden': open}, {'block': !open})}>
                <span>{formatNumber(value, 2)}</span>
                <span className='hover:cursor-pointer hover:text-blue-500' onClick={handleClick}><CiEdit /></span>
            </div>
        </>
    )
}
