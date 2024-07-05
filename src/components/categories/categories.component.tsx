import { useEffect, useState } from "react";
import axios from "axios";

import { Category } from "../../types/category.types";
import { env } from "process";

import CategoryItem from "../category-item/category-item.component";
import { CategoriesContainer, CategoriesContent } from "./categories.styles";

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
    <CategoriesContainer>
      <CategoriesContent>
        <div>
          {categories.map((category) => (
            <CategoryItem category={category} />
          ))}
        </div>
      </CategoriesContent>
    </CategoriesContainer>
  );
};

export default Categories;
