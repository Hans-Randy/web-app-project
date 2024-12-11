import "../layout/css/layout.css";
import "../layout/css/category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getDistinctCategories } from "../utils/categories";

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const handleGetAllCategories = async () => {
      try {
        const response = await getDistinctCategories();
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    handleGetAllCategories();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    console.log(index);
    setActiveIndex(index);
  };

  return (
    <nav className="category">
      <h3 className="cat_heading">
        <FontAwesomeIcon icon={faList} className="cat_heading-icon" />
        Category
      </h3>
      <ul className="cat-list">
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => handleClick(index)}
            className={`${
              activeIndex === index
                ? "cat--active .cat-item_link::before"
                : "cat-items"
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
