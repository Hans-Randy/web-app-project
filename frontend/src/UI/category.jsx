import "../layout/css/layout.css";
import "../layout/css/category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Category({ products, isLoading }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Extract distinct categories
  const distinctCategories = products
    ? [
        ...new Map(
          products.map((item) => [item?.category?.toLowerCase(), item.category])
        ).values(),
      ]
    : [];

  if (isLoading) {
    return (
      <nav className="category">
        <h3 className="cat_heading">
          <FontAwesomeIcon icon={faList} className="cat_heading-icon" />
          Category
        </h3>
        <div>
          <p>Loading...</p>
        </div>
      </nav>
    );
  }

  return (
    <nav className="category">
      <h3 className="cat_heading">
        <FontAwesomeIcon icon={faList} className="cat_heading-icon" />
        Category
      </h3>
      <ul className="cat-list">
        {distinctCategories.map((category, index) => (
          <li
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`cat-items ${
              activeIndex === index ? "cat--active" : ""
            }`}
          >
            <a href="#" className="cat-item_link">
              {category}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Category;
