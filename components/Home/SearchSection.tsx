import React from 'react'
import InputItem from './InputItem'

const SearchSection = () => {
    console.log("🚀 ~ file: SearchSection.tsx:15 ~ SearchSection ~ test2:")
    return (
        <div className='p-2 md: pd-6 border-[2px] rounded-xl'>
            <p className='text-[20px] font-bold'>Get a ride</p>
            <InputItem type='source' />
            {/* <InputItem type='destination' /> */}
            <button className='p-3 bg-black w-full mt-5 text-white rounded-lg'>Search</button>
        </div>
    )
}

export default SearchSection