interface Option {
    value: string
    disabled?: boolean
    hidden?: boolean
    name: string
}

interface SelectProps {
    name: string
    id: string
    defaultValue?: string
    required?: boolean
    options: Array<Option>
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
const InputSelect: React.FC<SelectProps> = ({
    options,
    name,
    id,
    defaultValue,
    required,
    onChange,
}) => {
    return (
        <>
            <select
                name={name}
                id={id}
                defaultValue={defaultValue}
                required={required}
                onChange={onChange}
            >
                {options.map((option, index) => {
                    return (
                        <option
                            key={index}
                            value={option.value}
                            disabled={option.disabled}
                            hidden={option.hidden}
                        >
                            {option.name}
                        </option>
                    )
                })}
            </select>
        </>
    )
}

export default InputSelect
