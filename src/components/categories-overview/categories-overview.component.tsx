import { FunctionComponent, useEffect } from "react";

import { Container } from "./categories-overview.styles";

import CategoryOverview from "../category-overview/category-overview.component";
import Loading from "../loading/loading.component";
import { useAppSelector } from "../hooks/redux.hooks";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../store/category/category.actions";
import { AppDispatch } from "../../store/store";
import { Category } from "../../types/category.types";

const CategoriesOverview: FunctionComponent = () => {
  const { categories, isLoading } = useAppSelector(
    (state) => state.categoryReducer
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Container>
      {categories.map((category: Category) => (
        <CategoryOverview key={category.id} category={category} />
      ))}
    </Container>
  );
};

export default CategoriesOverview;
