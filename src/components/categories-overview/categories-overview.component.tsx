import { FunctionComponent, useContext } from "react";
import { Container } from "./categories-overview.styles";
import { CategoryContext } from "../../contexts/category.context";

const CategoriesOverview: FunctionComponent = () => {
  const { categories } = useContext(CategoryContext);
  return (
    <Container>
      {categories.map((category) => (
        <p key={category.id}>{category.displayName}</p>
      ))}
    </Container>
  );
};

export default CategoriesOverview;
