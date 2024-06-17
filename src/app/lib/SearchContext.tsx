'use client'
import { createContext, useContext, useState } from "react";




type initialProps = {
    searchValue : string,
    handleSearchValue: (value : string) => void
}

export const SearchContext = createContext<null | initialProps>(null);


export const SearchProvider = ({
    children
} : {
    children : React.ReactNode
}) => {

    const [searchValue, setSearchValue] = useState<string>("");

    const handleSearchValue = (value : string) => setSearchValue(value);

    const values = {
        searchValue,
        handleSearchValue
    }

    return(
        <SearchContext.Provider value={values}>
            {children}
        </SearchContext.Provider>
    )

}