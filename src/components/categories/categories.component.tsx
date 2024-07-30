import { useEffect } from "react";

import CategoryItem from "../category-item/category-item.component";
import Loading from "../loading/loading.component";

import { CategoriesContainer, CategoriesContent } from "./categories.styles";

import { useDispatch } from "react-redux";
import { fetchCategories } from "../../store/category/category.actions";
import { AppDispatch } from "../../store/store";
import { useAppSelector } from "../hooks/redux.hooks";

const Categories = () => {
  const { categories, isLoading } = useAppSelector(
    (state) => state.categoryReducer
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <CategoriesContainer>
      {isLoading && <Loading />}
      <CategoriesContent>
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  );
};

export default Categories;
