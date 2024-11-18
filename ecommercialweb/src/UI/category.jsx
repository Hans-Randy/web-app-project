import '../layout/css/layout.css'
import '../layout/css/responsive.css'
import '../layout/css/category.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';

function Category() {
    const Categories = [
        'Gaming accessories',
        'Home & Kitchen',
        'Beauty & Personal Care',
        'Kids',
        'Watches',
        'Video Games',
        'Clothing, Shoes & Jewelry',
        'Toys for all ages',
        'travel essentials'
    ]

    const [activeIndex, setActiveIndex] = useState(0)

    const handleClick = (index) => {
        console.log(index)
        setActiveIndex(index)
    }

    return (
        <div className="container">
            <div className="grid">
                <div className="grid_row">
                    <div className="grid_collumn-2">
                        <nav className="category">
                            <h3 className="cat_heading">
                            <FontAwesomeIcon icon={faList} className='cat_heading-icon'/>
                            Category
                            </h3>
                            <ul className="cat-list">
                            
                            {Categories.map((category, index) => (

                                <li key = {index}
                                onClick={() => 
                                    handleClick(index)
                                }
                                className={`${activeIndex === index ? 'cat--active .cat-item_link::before' : 'cat-items'}`}
                                >
                                    <a href="#" className="cat-item_link">{category}</a>
                                </li>
                            ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category