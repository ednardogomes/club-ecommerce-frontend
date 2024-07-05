import { useEffect, useState } from "react";
import axios from "axios";

import { Category } from "../../types/category.types";
import { env } from "process";

import "./categories.styles.css";
import CategoryItem from "../category-item/category-item.component";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  console.log(categories);

  // const fetchCategories = async () => {
  //   try {
  //     const { data } = await axios.get(`${env.apiUrl}/api/category`);
  //     console.log({ data });
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  return (
    <div className="categories-container">
      <div className="categories-content">
        <div>
          {categories.map((category) => (
            <CategoryItem category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
