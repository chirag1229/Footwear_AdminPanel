import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Api_URL } from "../../utills/Server";

export default function Womencategory() {
  const [image, setImage] = useState("");
  const [currentImage, setCurrentImage] = useState(""); // Store current image URL
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [del, setDel] = useState("");
  const [womenProduct, setWomenproduct] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch women's products
  const fetchWomenProducts = async () => {
    try {
      const response = await axios.get(Api_URL + "women/get");
      setWomenproduct(response.data.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  useEffect(() => {
    fetchWomenProducts();
  }, []);

  const handleCreateWomen = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("del", del);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (editMode) {
        console.log("editId : ", editId);
        const url = Api_URL + `Women/update/${editId}`;
        console.log(url);
        await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Women's shoes updated successfully");
      } else {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios.post(Api_URL + "Women/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        alert("Women's shoes created successfully");
      }
      resetForm();
      fetchWomenProducts();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed");
    }
  };

  const resetForm = () => {
    setImage("");
    setBrand("");
    setDescription("");
    setPrice("");
    setDel("");
    setCurrentImage(""); // Reset current image
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (women) => {
    setBrand(women.brand);
    setDescription(women.description);
    setPrice(women.price);
    setDel(women.del);
    setCurrentImage(women.image); // Set current image URL
    setEditMode(true);
    setEditId(women._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this shoe?")) {
      try {
        await axios.delete(Api_URL + `women/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Women's shoes deleted successfully");
        fetchWomenProducts(); // Refresh the list
      } catch (error) {
        console.error("There was an error deleting the shoe!", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-5 max-w-full">
      <Card className="bg-white shadow-lg w-full p-5">
        <Card.Body className="bg-teal-50">
          <Card.Title className="text-2xl sm:text-3xl font-bold text-teal-600">
            WOMEN SHOES FORM
          </Card.Title>
          <Card.Text className="text-teal-500">
            Welcome to the shoes Form
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <form onSubmit={handleCreateWomen} className="space-y-4 w-full">
            <div className="space-y-2">
              <Form.Label htmlFor="name" className="text-teal-600">
                Shoes Name
              </Form.Label>
              <input
                id="name"
                name="name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
                placeholder="Enter Title"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="space-y-2">
              <Form.Label htmlFor="discountPrice" className="text-teal-600">
                Shoes Discount Price
              </Form.Label>
              <input
                id="discountPrice"
                name="discountPrice"
                value={del}
                onChange={(e) => setDel(e.target.value)}
                required
                placeholder="Enter Shoes Discount Price"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="space-y-2">
              <Form.Label htmlFor="price" className="text-teal-600">
                Shoes Price
              </Form.Label>
              <input
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="space-y-2">
              <Form.Label htmlFor="description" className="text-teal-600">
                Shoes Description
              </Form.Label>
              <textarea
                as="textarea"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Enter Description"
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="space-y-2">
              <Form.Label htmlFor="image" className="text-teal-600">
                Shoes Image
              </Form.Label>
              {currentImage && !image && (
                <img
                  src={Api_URL + `women/img/${currentImage}`}
                  alt="Current shoe"
                  className="h-32 mb-2 object-cover"
                />
              )}
              <input
                id="image"
                name="image"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
              />
            </div>
            <Button
              type="submit"
              className="w-32 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
            >
              {editMode ? "Update Shoes" : "Add Shoes"}
            </Button>
          </form>
        </Card.Body>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl sm:text-2xl font-bold text-teal-600">
          Women's Shoes Managed by Admin
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.isArray(womenProduct) &&
            womenProduct.map((women) => (
              <div
                className="max-w-sm rounded overflow-hidden shadow-lg"
                key={women._id}
              >
                <img
                  src={Api_URL + `women/img/${women.image}`}
                  alt="image"
                  className="w-full h-72 object-cover"
                />
                <div className="px-6 py-4">
                  <div className="text-center font-bold text-teal-700">
                    {women.brand}
                  </div>
                  <div className="text-center">
                    <del className="text-red-500">{women.del}</del>
                    <p className="text-lg font-bold text-green-600">
                      {women.price}
                    </p>
                  </div>
                  <div className="font-bold text-xl mb-2">{women.title}</div>
                  <p className="text-gray-700 text-base text-center">
                    {women.description}
                  </p>
                </div>
                <div className="mt-auto flex justify-around px-6 py-4">
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                    onClick={() => handleEdit(women)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                    onClick={() => handleDelete(women._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
