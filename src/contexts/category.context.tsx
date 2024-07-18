import { createContext, FunctionComponent, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { Category } from "../types/category.types";
import { db } from "../config/firebase.config";
import { categoryConverter } from "../components/converters/firestore.converters";

interface ICategoryContext {
  categories: Category[];
  isLoading: boolean;
  fetchCategories: () => Promise<void>;
}

interface ICategoryContextProps {
  children: React.ReactNode;
}

export const CategoryContext = createContext<ICategoryContext>({
  isLoading: false,
  categories: [],
  fetchCategories: () => Promise.resolve(),
});

const CategoryContextProvider: FunctionComponent<ICategoryContextProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const categoriesFromFirestore: Category[] = [];

      const querySnapshot = await getDocs(
        collection(db, "categories").withConverter(categoryConverter)
      );

      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data());
      });

      setCategories(categoriesFromFirestore);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{ categories, isLoading, fetchCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
