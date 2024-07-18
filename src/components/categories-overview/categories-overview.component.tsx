import { FunctionComponent, useContext } from "react";

import { Container } from "./categories-overview.styles";

import { CategoryContext } from "../../contexts/category.context";

import CategoryOverview from "../category-overview/category-overview.component";

const CategoriesOverview: FunctionComponent = () => {
  const { categories } = useContext(CategoryContext);
  return (
    <Container>
      {categories.map((category) => (
        <CategoryOverview key={category.id} category={category} />
      ))}
    </Container>
  );
};

export default CategoriesOverview;
