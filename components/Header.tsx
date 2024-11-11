import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

export const Header = () => {
    const headerMenu = [
        {
            id: 1,
            name: 'Ride',
            alt: 'ride-icon',
            icon: '/taxi.png'
        },
        {
            id: 2,
            name: 'Package',
            alt: 'pakage-icon',
            icon: '/box.png'
        }
    ]
    return (
        <div className='p-5 pb-3 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between'>
            <div className='flex gap-24 items-center'>
                <Image src='/uber_logo.png' alt='logo' width={70} height={70} />
                <div className='flex gap-6 items-center'>
                    {headerMenu.map((item) => (
                        <div className='flex gap-2 items-center' key={item.id}>
                            <Image src={item.icon} alt={item.alt} width={30} height={30} />
                            <h2 className='text-[14px] font-medium'>{item.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <UserButton />
        </div>
    )
}
