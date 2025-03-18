import { useEffect, useState } from "react";
import { getCategories } from "../services/categories";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div>Loading categories...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div key={category._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{category.name}</h3>
            <p className="text-sm text-gray-500">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;