const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({
      data: category,
      message: "This is the category route",
      success: true,});
} catch (error) {
    res
      .status(500)
      .json({
        error: error.message,
        message: "This is the category route",
        sucess: false,
      });
  }
};

export { getAllCategory };