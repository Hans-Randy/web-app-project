import Product from "../models/Product.js";
import validateProduct from "../validation/productValidation.js";
import { bucket } from "../utils/database.js";

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    // Retrieve all products and populate the image metadata
    const products = await Product.find();

    // Use Promise.all to resolve asynchronous calls for each product
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        // Find the image by ID
        const images = await bucket.find({ _id: product.imageId }).toArray();
        if (!images || images.length === 0) {
          return null; // Return null if no image is found
        }

        const image = images[0];
        // Stream the file content
        const base64File = await new Promise((resolve, reject) => {
          let fileData = Buffer.from([]);
          const downloadStream = bucket.openDownloadStream(image._id);

          downloadStream.on("data", (chunk) => {
            fileData = Buffer.concat([fileData, chunk]);
          });

          downloadStream.on("end", () => {
            // Encode file data in Base64 and resolve the promise
            resolve(fileData.toString("base64"));
          });

          downloadStream.on("error", (err) => {
            reject(err); // Reject the promise on error
          });
        });

        return {
          ...product._doc,
          image: {
            filename: image.filename,
            contentType: image.contentType,
            length: image.length,
            uploadDate: image.uploadDate,
            data: base64File, // Send file content encoded in Base64
          },
        };
      })
    );

    // Filter out any null results (products without images)
    const validProducts = productsWithImages.filter(
      (product) => product !== null
    );

    if (validProducts.length === 0) {
      return res
        .status(404)
        .json({ error: "No products with valid images found." });
    }

    res.json(validProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const images = await bucket.find({ _id: product.imageId }).toArray();

    if (!images || images.length === 0) {
      return res
        .status(404)
        .send(`The image of product [${product.name}] could not be found.`);
    }

    const image = images[0];

    // Stream the file content and encode it in Base64
    const base64File = await new Promise((resolve, reject) => {
      let fileData = Buffer.from([]);
      const downloadStream = bucket.openDownloadStream(image._id);

      downloadStream.on("data", (chunk) => {
        fileData = Buffer.concat([fileData, chunk]);
      });

      downloadStream.on("end", () => {
        resolve(fileData.toString("base64")); // Resolve with Base64 encoded data
      });

      downloadStream.on("error", (err) => {
        reject(err); // Reject on error
      });
    });

    res.status(200).json({
      product,
      image: {
        filename: image.filename,
        contentType: image.contentType,
        length: image.length,
        uploadDate: image.uploadDate,
        data: base64File, // Send file content encoded in Base64
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all products containing a particular substring in name
export const getProductsByName = async (req, res) => {
  const { name } = req.query; // Extract the 'name' query string parameter

  try {
    // Check if the name query parameter exists
    if (!name) {
      return res
        .status(400)
        .json({ message: "Name query parameter is required" });
    }

    // Find products where the name contains the substring
    const products = await Product.find({
      name: { $regex: name, $options: "i" }, // Case-insensitive search in 'name'
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Use Promise.all to resolve asynchronous calls for each product
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        // Find the image by ID
        const images = await bucket.find({ _id: product.imageId }).toArray();
        if (!images || images.length === 0) {
          return null; // Return null if no image is found
        }

        const image = images[0];

        // Stream the file content and encode it in Base64
        const base64File = await new Promise((resolve, reject) => {
          let fileData = Buffer.from([]);
          const downloadStream = bucket.openDownloadStream(image._id);

          downloadStream.on("data", (chunk) => {
            fileData = Buffer.concat([fileData, chunk]);
          });

          downloadStream.on("end", () => {
            resolve(fileData.toString("base64")); // Resolve with Base64 encoded data
          });

          downloadStream.on("error", (err) => {
            reject(err); // Reject on error
          });
        });

        return {
          ...product._doc,
          image: {
            filename: image.filename,
            contentType: image.contentType,
            length: image.length,
            uploadDate: image.uploadDate,
            data: base64File, // Send file content encoded in Base64
          },
        };
      })
    );

    // Filter out any null results (products without images)
    const validProducts = productsWithImages.filter(
      (product) => product !== null
    );

    if (validProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "No products with valid images found." });
    }

    res.json(validProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all products containing a particular substring in category
export const getProductsByCategory = async (req, res) => {
  const { category } = req.query; // Extract the 'category' query string parameter

  try {
    // Check if the category query parameter exists
    if (!category) {
      return res
        .status(400)
        .json({ message: "Category query parameter is required" });
    }

    // Find products where the category contains the substring
    const products = await Product.find({
      category: { $regex: category, $options: "i" }, // Case-insensitive search in 'category'
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Use Promise.all to resolve asynchronous calls for each product
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        // Find the image by ID
        const images = await bucket.find({ _id: product.imageId }).toArray();
        if (!images || images.length === 0) {
          return null; // Return null if no image is found
        }

        const image = images[0];

        // Stream the file content and encode it in Base64
        const base64File = await new Promise((resolve, reject) => {
          let fileData = Buffer.from([]);
          const downloadStream = bucket.openDownloadStream(image._id);

          downloadStream.on("data", (chunk) => {
            fileData = Buffer.concat([fileData, chunk]);
          });

          downloadStream.on("end", () => {
            resolve(fileData.toString("base64")); // Resolve with Base64 encoded data
          });

          downloadStream.on("error", (err) => {
            reject(err); // Reject on error
          });
        });

        return {
          ...product._doc,
          image: {
            filename: image.filename,
            contentType: image.contentType,
            length: image.length,
            uploadDate: image.uploadDate,
            data: base64File, // Send file content encoded in Base64
          },
        };
      })
    );

    // Filter out any null results (products without images)
    const validProducts = productsWithImages.filter(
      (product) => product !== null
    );

    if (validProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "No products with valid images found." });
    }

    res.json(validProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create a new product
export const createProduct = async (req, res) => {
  // Validate data
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, description, price, quantity, category } = req.body;
  const imageId = req.uploadedFile.id;
  const product = new Product({
    name,
    description,
    price,
    quantity,
    category,
    imageId,
  });

  try {
    const savedProduct = await product.save();

    const images = await bucket.find({ _id: product.imageId }).toArray();

    const image = images[0];

    // Stream the file content and encode it in Base64
    const base64File = await new Promise((resolve, reject) => {
      let fileData = Buffer.from([]);
      const downloadStream = bucket.openDownloadStream(image._id);

      downloadStream.on("data", (chunk) => {
        fileData = Buffer.concat([fileData, chunk]);
      });

      downloadStream.on("end", () => {
        resolve(fileData.toString("base64")); // Resolve with Base64 encoded data
      });

      downloadStream.on("error", (err) => {
        reject(err); // Reject on error
      });
    });

    res.status(200).json({
      savedProduct,
      image: {
        filename: image.filename,
        contentType: image.contentType,
        length: image.length,
        uploadDate: image.uploadDate,
        data: base64File, // Send file content encoded in Base64
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update an existing product
export const updateProduct = async (req, res) => {
  // Validate data
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { id } = req.params;
  const { name, description, price, quantity, category } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.category = category;
    product.imageId = req.uploadedFile.id;

    const updatedproduct = await product.save();

    const images = await bucket.find({ _id: product.imageId }).toArray();

    const image = images[0];

    // Stream the file content and encode it in Base64
    const base64File = await new Promise((resolve, reject) => {
      let fileData = Buffer.from([]);
      const downloadStream = bucket.openDownloadStream(image._id);

      downloadStream.on("data", (chunk) => {
        fileData = Buffer.concat([fileData, chunk]);
      });

      downloadStream.on("end", () => {
        resolve(fileData.toString("base64")); // Resolve with Base64 encoded data
      });

      downloadStream.on("error", (err) => {
        reject(err); // Reject on error
      });
    });

    res.status(200).json({
      updatedproduct,
      image: {
        filename: image.filename,
        contentType: image.contentType,
        length: image.length,
        uploadDate: image.uploadDate,
        data: base64File, // Send file content encoded in Base64
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PATCH partially update a product
export const patchProduct = async (req, res) => {
  // Validate data
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    Object.assign(product, updates);

    const updatedProduct = await product.save();

    const images = await bucket.find({ _id: product.imageId }).toArray();

    const image = images[0];

    // Stream the file content and encode it in Base64
    const base64File = await new Promise((resolve, reject) => {
      let fileData = Buffer.from([]);
      const downloadStream = bucket.openDownloadStream(image._id);

      downloadStream.on("data", (chunk) => {
        fileData = Buffer.concat([fileData, chunk]);
      });

      downloadStream.on("end", () => {
        resolve(fileData.toString("base64")); // Resolve with Base64 encoded data
      });

      downloadStream.on("error", (err) => {
        reject(err); // Reject on error
      });
    });

    res.status(200).json({
      updatedProduct,
      image: {
        filename: image.filename,
        contentType: image.contentType,
        length: image.length,
        uploadDate: image.uploadDate,
        data: base64File, // Send file content encoded in Base64
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE remove a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    // Delete the image from GridFS
    await bucket.delete(product.imageId);
    await product.deleteOne();
    res.json({ message: "product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE products
export const deleteProducts = async (req, res) => {
  try {
    const { ids } = req.body; // Expecting { ids: [id1, id2, ...] }

    if (!Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({ error: "Invalid or missing 'ids' array." });

    // Find products by IDs
    const products = await Product.find({ _id: { $in: ids } });

    if (!products.length) {
      return res
        .status(404)
        .json({ error: "No products found for the provided IDs." });
    }

    // Extract image IDs from the products
    const imageIds = products
      .filter((product) => product.imageId) // Only consider products with imageIds
      .map((product) => product.imageId);

    // Delete associated images from GridFS
    const deleteImagePromises = imageIds.map((imageId) =>
      bucket.delete(imageId).catch((err) => {
        console.error(
          `Failed to delete image with ID ${imageId}: ${err.message}`
        );
      })
    );
    await Promise.all(deleteImagePromises);

    const result = await Product.deleteMany({ _id: { $in: ids } });
    res.json({
      message: "Products deleted successfully.",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
