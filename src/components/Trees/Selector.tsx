import React from 'react'

type Props = {
    searchLevel: string
    setSearchLevel: React.Dispatch<React.SetStateAction<string>>
}

export const Selector = ({ searchLevel, setSearchLevel }: Props) => {
    function searchLevelChange(e: any) {
        setSearchLevel(e.target.value)
    }

    return (
        <div className='flex flex-row justify-center'>
            <div className='mx-2'>
                <input
                    type='radio'
                    name='searchLevel'
                    value='order'
                    checked={searchLevel === 'order'}
                    onChange={searchLevelChange}
                />
                <span className='ml-1'>Order</span>
            </div>
            <div className='mx-2'>
                <input
                    type='radio'
                    name='searchLevel'
                    value='family'
                    checked={searchLevel === 'family'}
                    onChange={searchLevelChange}
                />
                <span className='ml-1'>Family</span>
            </div>
        </div>
    )
}
