import React from 'react'
import Select from 'react-select'

type Props = {
    values: string[]
    selected: string
    setSelected: React.Dispatch<React.SetStateAction<string>>
}

export const Dropdown = ({ values, selected, setSelected }: Props) => {
    return (
        <Select
            options={values.map((v) => getOption(v))}
            value={getOption(selected)}
            onChange={(v) => v && setSelected(v.value)}
        />
    )
}

function getOption(value: string) {
    return { value: value, label: value }
}
