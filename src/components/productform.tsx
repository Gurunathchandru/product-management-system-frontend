import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Product {
  product_id?: string;
  product_name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  user?: string;
  created_at?: Date;
  updated_at?: Date;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const user_token = localStorage.getItem("token");
  const navigate = useNavigate();
  const BACKEND_URL = process.env.BACKEND_URL;

  /* Fetch all products */
  const fetchProducts = async () => {
    try {
      if (!user_token) {
        alert("Please login");
        navigate("/");
      } else {
        const options = {
          url: `${BACKEND_URL}/api/product/viewProduct`,
          headers: {
            Authorization: `bearer ${user_token}`,
          },
        };
        const response = (await axios(options)) as any;
        const data = (await response.data.products) || [];
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  /* Search products by name */
  const searchProducts = async () => {
    try {
      if (!search) {
        alert("please enter product name to search");
      } else {
        const options = {
          url: `${BACKEND_URL}/api/product/viewProduct?product_name=${search}`,
          headers: {
            Authorization: `bearer ${user_token}`,
          },
        };
        const response = (await axios(options)) as any;
        const data = response.data.product;
        setProducts([data]);
      }
    } catch (error: any) {
      console.error("Error searching products:", error);
      if (error?.response?.data?.message) {
        let error_message = error.response.data?.errors?.length
          ? (error.response.data.message as any) +
            ": " +
            error.response.data.errors.join(",")
          : error.response.data.message;
        alert(error_message);
        setSearch("");
        fetchProducts();
      } else {
        alert("An error occurred. Please try again");
      }
    }
  };

  // Save (create or update) product
  const saveProduct = async () => {
    const url = currentProduct?.product_id
      ? `${BACKEND_URL}/api/product/updateProduct/${currentProduct.product_id}`
      : `${BACKEND_URL}/api/product/createProduct`;
    const method = currentProduct?.product_id ? "PUT" : "POST";

    let updateData = {
      updatedFields: currentProduct,
    };
    try {
      const options = {
        url,
        method,
        headers: {
          Authorization: `bearer ${user_token}`,
          "Content-Type": "application/json",
        },
        data: currentProduct?.product_id
          ? JSON.stringify(updateData)
          : JSON.stringify(currentProduct),
      };
      const response = (await axios(options)) as any;
      alert(response.data.message);

      fetchProducts();
      handleClose();
    } catch (error: any) {
      console.error("Error saving product:", error);
      if (error?.response?.data?.message) {
        let error_message = error.response.data?.errors?.length
          ? (error.response.data.message as any) +
            ": " +
            error.response.data.errors.join(",")
          : error.response.data.message;
        alert(error_message);
      } else {
        alert("An error occurred. Please try again");
      }
    }
  };

  /* Delete a product */
  const deleteProduct = async (id: string) => {
    try {
      const options = {
        url: `${BACKEND_URL}/api/product/deleteProduct/${id}`,
        method: "delete",
        headers: {
          Authorization: `bearer ${user_token}`,
          "Content-Type": "application/json",
        },
      };
      const response = (await axios(options)) as any;
      alert(response.data.message);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle Dialog open and close
  const handleOpen = (product: Product | null = null) => {
    setCurrentProduct(product);
    // setCurrentProduct(product || { product_name: "", description: "", price: 0, category: "", quantity: 0 });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <CssBaseline />
      {user_token && (
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Product Management
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <TextField
              label="Search by Name"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: "300px" }}
            />

            <Button variant="contained" onClick={searchProducts}>
              Search
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpen()}
            >
              Add Product
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              {products.length > 0 && (
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Description</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Price</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Quantity</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Category</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <TableRow key={product.product_id}>
                      <TableCell>{product.product_name}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => handleOpen(product)}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => deleteProduct(product.product_id!)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Typography
                        variant="subtitle1"
                        align="center"
                        sx={{ mt: 3 }}
                      >
                        No products found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {products.length === 0 && (
            <Typography variant="subtitle1" align="center" sx={{ mt: 3 }}>
              No products found.
            </Typography>
          )}

          {/* Product Form Dialog */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              {currentProduct?.product_id ? "Edit Product" : "Add Product"}
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Name"
                fullWidth
                value={currentProduct?.product_name}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct!,
                    product_name: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Description"
                fullWidth
                value={currentProduct?.description}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct!,
                    description: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Price"
                type="number"
                fullWidth
                value={currentProduct?.price}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct!,
                    price: parseFloat(e.target.value),
                  })
                }
              />
              <TextField
                margin="dense"
                label="Quantity"
                type="number"
                fullWidth
                value={currentProduct?.quantity}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct!,
                    quantity: parseFloat(e.target.value),
                  })
                }
              />
              <TextField
                margin="dense"
                label="Category"
                fullWidth
                value={currentProduct?.category}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct!,
                    category: e.target.value,
                  })
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={saveProduct} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
      <CssBaseline />
      {user_token && (
        <Box sx={{ mt: 5 }}>
          <Button
            fullWidth
            style={{ background: "black", color: "white" }}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ProductPage;
