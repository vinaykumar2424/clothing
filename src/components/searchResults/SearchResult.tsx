import React, { useEffect, useMemo, useRef, useState } from 'react';
import './searchresult.scss';
import '../responsiveCSS/responsive.scss'
const { faker } = require('@faker-js/faker');


interface Product {
  id: string;
  name: string;
  price: string;
  discountedPrice: string;
  rating: number;
  stars: number;
  image: string;
}

interface SearchResultProps {
  searchInput: string;
  selectedFilters: string[];
}

const SearchResult: React.FC<SearchResultProps> = ({ searchInput, selectedFilters }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state to prevent multiple requests
  const observer = useRef<IntersectionObserver | null>(null);
  const bottomBoundaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const newProducts: Product[] = Array.from({ length: 20 }, () => ({
        id: faker.string.uuid(),
        image: faker.image.urlLoremFlickr({ category: 'clothing' }),
        name: faker.image.faker.commerce.productName({ category: 'clothing' }),
        price: faker.image.faker.commerce.price({ min: 500, max: 3000 }),
        discountedPrice: faker.image.faker.commerce.price({ min: 100, max: 3000 }), // Generate discounted price randomly
        rating: faker.image.faker.number.int({ min: 1, max: 5000 }), // Generate a random rating between 1 and 5
        stars: faker.image.faker.number.int({ min: 1, max: 5 }), // Generate a random number of stars between 1 and 5
      }));
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
      setLoading(false);
    };

    if (bottomBoundaryRef.current && !loading) {
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          fetchData();
        }
      }, { threshold: 0.5 });

      observer.current.observe(bottomBoundaryRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading]);

  // Apply filters based on selected filter options
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Convert prices to numbers
      const price = Number(product.price);
      const discountedPrice = Number(product.discountedPrice);

      // Filter by price range
      const priceFilterApplied = selectedFilters.includes("500") || selectedFilters.includes("1000-3000");
      let priceFilterPassed = true;
      if (priceFilterApplied) {
        if (selectedFilters.includes("500")) {
          priceFilterPassed = discountedPrice < 500 && discountedPrice < price;
        } else if (selectedFilters.includes("1000-3000")) {
          priceFilterPassed = discountedPrice >= 1000 && discountedPrice <= 3000 && price > discountedPrice && price >= 1000;
        }
      }

      // Filter by stars
      const starFilters = ["5-star", "4-star", "3-star", "2-star", "1-star"];
      const starFilterApplied = selectedFilters.some(filter => starFilters.includes(filter));
      let starFilterPassed = true;
      if (starFilterApplied) {
        starFilterPassed = selectedFilters.includes(`${product.stars}-star`);
      }

      // Filter by search input
      const searchFilterPassed = !searchInput || product.name.toLowerCase().includes(searchInput.toLowerCase()) || searchInput === "";
      // Return true if all filters passed
      return priceFilterPassed && starFilterPassed && searchFilterPassed;

    });
  }, [products, selectedFilters, searchInput]);





  const toggleFavorite = (productId: string) => {
    console.log(productId)
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter(id => id !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });
  }
  return (
    <div className="search-results">
      {(filteredProducts ? filteredProducts : products)?.map(product => (
        <div key={product.id} className="product">
          <div className='image-box'>
            <img src={product.image} alt={product.name} loading='lazy' />
            <button>View product</button>
            <i
              className={`fa fa-heart${favorites.includes(product.id) ? ' red-heart' : ''}`}
              onClick={() => toggleFavorite(product.id)}
            ></i>
          </div>
          <p className='product-name'>{product.name}</p>
          <div className='price'>
            <p className='total-price'>Rs. {Number(product.price).toFixed(0)}</p>
            <p className='discounted-price'>Rs.{Number(product.discountedPrice).toFixed(0)}</p>
          </div>
          <div className='rating'>
            {[...Array(product.stars)].map((_, index) => (
              <i key={index} className={`fa fa-star yellow-star`}></i>
            ))}
            {[...Array(5 - product.stars)].map((_, index) => (
              <i key={index + product.stars} className={`fa fa-star gray-star`}></i>
            ))}
            <span className='total-ratings'>({product.rating})</span>
          </div>
        </div>
      ))}
      <div ref={bottomBoundaryRef}></div>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default SearchResult;
