import React, { useState } from 'react';
import './homepage.scss'
import '../responsiveCSS/responsive.scss'
import SearchBar from '../searchBar/SearchBar';
import Filter from '../filter/Filter';
import SearchResult from '../searchResults/SearchResult';
import Wishlist from '../wishlist/Wishlist';
import logo from '../../images/logo.png'
import LatestTrends from '../latestTrands/LatestTrends';

const HomePage: React.FC = () => {

    const [searchBarActive, setSearchBarActive] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [resultActive, setResultActive] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    //   console.log(searchInput)
      const handleSearch = (query: string) => {
        setSearchInput(query); // Update searchInput state with the query
        setSearchBarActive(false);
        setResultActive(true);
        // console.log("Search input:", query);
    };
    const handleFilterChange = (filters: string[]) => {
        setSelectedFilters(filters);
    };
    //   console.log(selectedFilters)


    return (
        <div className={`homepage ${resultActive && 'resultActivated'}`}>
            <img src={logo} alt="logo" className='logo' />
            <SearchBar resultActive={resultActive} setResultActive={setResultActive} setSearchBarActive={setSearchBarActive} setSearchInput={setSearchInput} onSearch={handleSearch} />
            {searchInput && <div className='result-sections'>
                <h2 className='heading1'>Search Results</h2>
                <div className='result-componenets'>
                    <Filter onFilterChange={handleFilterChange} />
                    <SearchResult searchInput={searchInput} selectedFilters={selectedFilters} />
                </div>
            </div>}
            {searchBarActive && <LatestTrends resultActive={resultActive} />}
        </div>
    );
};

export default HomePage;