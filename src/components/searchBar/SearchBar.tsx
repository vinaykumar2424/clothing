import React, { useEffect, useState } from 'react';
import './searchbar.scss';
import '../responsiveCSS/responsive.scss'

import searchImg from '../../images/search.png';
import closeImg from '../../images/close.png';

interface SearchBarProps {
    resultActive: boolean;
    setResultActive: React.Dispatch<React.SetStateAction<boolean>>;
    setSearchBarActive: React.Dispatch<React.SetStateAction<boolean>>;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchBarActive, resultActive, onSearch, setResultActive }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputFocus = () => {
        setSearchBarActive(true);
    };

    const handleInputBlur = () => {
        setSearchBarActive(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        if (inputValue) {
            onSearch(inputValue); // Call onSearch callback when button is clicked
        }
    };


    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (inputValue) {
                onSearch(inputValue); // Call onSearch callback when Enter key is pressed
            }
        }
    };

    useEffect(() => {
        if (resultActive) {
            onSearch(inputValue);
            setResultActive(true)
        }
    }, [inputValue])
    console.log(inputValue)
    return (
        <div className={`search-bar ${resultActive ? 'ResultsActive' : ''}`}>
            <input
                type="text"
                placeholder="Search"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                value={inputValue}
                className={`${resultActive ? 'active' : ''}`}
            />
            <button onClick={handleButtonClick}>
                <img src={searchImg} alt='search' />
            </button>

        </div>
    );
};

export default SearchBar;
