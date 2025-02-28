import Category from "../models/category.js"; // Ensure correct import

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find(); // Use 'categories' instead of 'category'

    if (!categories.length) {
      return res.status(404).json({
        message: "No categories found",
        success: false,
      });
    }

    res.status(200).json({
      data: categories,
      message: "Categories fetched successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching categories:", error); // Log for debugging

    res.status(500).json({
      error: error.message,
      message: "Server error while fetching categories",
      success: false, // Fixed spelling
    });
  }
};

export { getAllCategory };
