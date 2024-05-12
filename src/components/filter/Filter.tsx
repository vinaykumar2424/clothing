import React, { useState } from 'react';
import './filter.scss'
import '../responsiveCSS/responsive.scss'


interface FilterProps {
  onFilterChange: (filters: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilterType, setShowFilterType] = useState<boolean[]>([true, true, true]);

  const handleFilterChange = (filter: string) => {
    const index = selectedFilters.indexOf(filter);
    if (index === -1) {
      setSelectedFilters([...selectedFilters, filter]);
    } else {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    }
  };

  const toggleFilterType = (index: number) => {
    const updatedFilters = showFilterType.map((value, i) => i === index ? !value : value);
    setShowFilterType(updatedFilters);
  };

  // Call parent component's callback function with selected filters
  React.useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  return (
    <div className="filter">
      <div className='filter-type'>
        <div className='heading2' onClick={() => toggleFilterType(0)}>
          <h3>BRANDS</h3>
          <i className={`fa fa-angle-down ${showFilterType[0] ? 'down' : 'up'}`}></i>
        </div>
        {showFilterType[0] && (
          <div className='input-box'>
            <input
              type="checkbox"
              id="mango"
              checked={selectedFilters.includes("mango")}
              onChange={() => handleFilterChange("mango")}
            />
            <label>Mango</label>
          </div>
        )}
        {showFilterType[0] && (
          <div className='input-box'>
            <input
              type="checkbox"
              id="h&m"
              checked={selectedFilters.includes("h&m")}
              onChange={() => handleFilterChange("h&m")}
            />
            <label>H&M</label>
          </div>
        )}
      </div>
      <div className='filter-type'>
        <div className='heading2' onClick={() => toggleFilterType(1)}>
          <h3>PRICE RANGE</h3>
          <i className={`fa fa-angle-down ${showFilterType[1] ? 'down' : 'up'}`}></i>
        </div>
        {showFilterType[1] && (
          <div className='input-box'>
            <input
              type="checkbox"
              id="under500"
              checked={selectedFilters.includes("500")}
              onChange={() => handleFilterChange("500")}
            />
            <label>Under 500</label>
          </div>
        )}
        {showFilterType[1] && (
          <div className='input-box'>
            <input
              type="checkbox"
              id="1000to3000"
              checked={selectedFilters.includes("1000-3000")}
              onChange={() => handleFilterChange("1000-3000")}
            />
            <label>1000 To 3000</label>
          </div>
        )}
      </div>
      <div className='filter-type'>
        <div className='heading2' onClick={() => toggleFilterType(2)}>
          <h3>RATINGS</h3>
          <i className={`fa fa-angle-down ${showFilterType[2] ? 'down' : 'up'}`}></i>
        </div>
        {showFilterType[2] && (
          <div className='input-box'>
            <input
              type="checkbox"
              id="5star"
              checked={selectedFilters.includes("5-star")}
              onChange={() => handleFilterChange("5-star")}
            />
            <label>
              {[...Array(5)].map((_, index) => (
                <i key={index} className="fa fa-star yellow-star"></i>
              ))}
            </label>
          </div>
        )}
        {showFilterType[2] && (
          <div className='input-box'>
            <input
              type="checkbox"
              id="4star"
              checked={selectedFilters.includes("4-star")}
              onChange={() => handleFilterChange("4-star")}
            />
            <label>
              {[...Array(5)].map((_, index) => (
                <i key={index} className={`fa fa-star ${index < 4 ? 'yellow-star' : 'gray-star'}`}></i>
              ))}
            </label>
          </div>
        )}
        {showFilterType[2] && (
          <div className='input-box'>
            <input
              type="checkbox"
              id="3star"
              checked={selectedFilters.includes("3-star")}
              onChange={() => handleFilterChange("3-star")}
            />
            <label>
              {[...Array(5)].map((_, index) => (
                <i key={index} className={`fa fa-star ${index < 3 ? 'yellow-star' : 'gray-star'}`}></i>
              ))}
            </label>
          </div>
        )}
        {showFilterType[2] && (
          <div className='input-box'>
            <input
              type="checkbox"
              id="2star"
              checked={selectedFilters.includes("2-star")}
              onChange={() => handleFilterChange("2-star")}
            />
            <label>
              {[...Array(5)].map((_, index) => (
                <i key={index} className={`fa fa-star ${index < 2 ? 'yellow-star' : 'gray-star'}`}></i>
              ))}
            </label>
          </div>
        )}
        {showFilterType[2] && (
          <div className='input-box'>
            <input
              type="checkbox"
              id="1star"
              checked={selectedFilters.includes("1-star")}
              onChange={() => handleFilterChange("1-star")}
            />
            <label>
              {[...Array(5)].map((_, index) => (
                <i key={index} className={`fa fa-star ${index < 1 ? 'yellow-star' : 'gray-star'}`}></i>
              ))}
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
