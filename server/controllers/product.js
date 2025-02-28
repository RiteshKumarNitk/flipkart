import Product from "../models/product.js"; // Ensure correct import

const getProductByCategoryId = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const products = await Product.find({ category: categoryId }); // Ensure categoryId matches the stored format

        if (!products.length) {
            return res.status(404).json({
                message: `No products found for category ID: ${categoryId}`,
                success: false,
            });
        }

        res.status(200).json({
            data: products,
            message: "Products fetched successfully",
            success: true, 
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            error: error.message,
            message: "Server error",
            success: false,
        });
    }
};

export { getProductByCategoryId };
