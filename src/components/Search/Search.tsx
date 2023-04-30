interface SearchProps {
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
}

const Search: React.FC<SearchProps> = ({ onSearch, placeholder }) => {
    return (
        <>
            <input type="text" placeholder={placeholder} onChange={onSearch} />
        </>
    )
}

export default Search
