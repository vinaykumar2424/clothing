import React, { useEffect, useState } from 'react';
import './latestTrends.scss';
import '../responsiveCSS/responsive.scss'

import imgs from '../../images/bg1.png'
const { faker } = require('@faker-js/faker');

interface SearchBarProps {
    resultActive: boolean;
}
const LatestTrends: React.FC<SearchBarProps> = ({ resultActive}) => {
    const [numberOfItems, setNumberOfItems] = useState<number>(5);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 415) {
                setNumberOfItems(2);
            } else if (window.innerWidth <= 765) {
                setNumberOfItems(3);
            } else {
                setNumberOfItems(5);
            }
        };

        handleResize(); // Initial call to set the initial number of items

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const products = Array.from({ length: numberOfItems }, () => ({
        image: faker.image.urlLoremFlickr({ category: 'clothing' }),
        name: faker.commerce.productName({ category: 'clothing' }),
    }));

    return (
        <div className={`latest-trends ${resultActive ? 'latestActive' : ''}`}>
            <h2 className='heading1'>Latest Trends</h2>
            <section className='top-images'>
                {products?.map((product, index) => (
                    <div key={index} className="image">
                        <img src={product.image || imgs} alt="product" loading='lazy' />
                        <p>{product.name}</p>
                    </div>
                ))}
            </section>
            <section className='popular-suggestions'>
                <h2 className='heading2'>Popular suggestions</h2>
                {Array?.from({ length: 5 }, (_, index) => (
                    <p key={index}>{faker.commerce.productName()}</p>
                ))}
            </section>
        </div>
    );
};

export default LatestTrends;
