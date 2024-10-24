import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Api_URL } from "../../utills/Server";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Mencategory() {
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [del, setDel] = useState("");
  const [menProduct, setMenproduct] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token");

  const fetchMenProducts = async () => {
    try {
      const response = await axios.get(Api_URL + "men/getShoes");
      setMenproduct(response.data.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  useEffect(() => {
    fetchMenProducts();
  }, []);

  const handleCreateMen = async (e) => {
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
        await axios.put(Api_URL + `men/update/${editId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Men's shoes updated successfully");
        resetForm();
      } else {
        const response = await axios.post(Api_URL + "men/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Men's shoes created successfully");
        resetForm();
      }
      fetchMenProducts();
    } catch (error) {
      console.error("Error updating shoe:", error.response || error);
      alert("Failed");
    }
  };

  const resetForm = () => {
    setImage("");
    setBrand("");
    setDescription("");
    setPrice("");
    setDel("");
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (men) => {
    setBrand(men.brand);
    setDescription(men.description);
    setPrice(men.price);
    setDel(men.del);
    setEditMode(true);
    setEditId(men._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this shoe?")) {
      try {
        await axios.delete(Api_URL + `men/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Men's shoes deleted successfully");
        fetchMenProducts();
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
            MEN SHOES FORM
          </Card.Title>
          <Card.Text className="text-teal-500">
            Welcome to the shoes Form
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <form onSubmit={handleCreateMen} className="space-y-4 w-full">
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
          Men's Shoes Managed by Admin
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.isArray(menProduct) &&
            menProduct.map((men) => (
              <div
                className="max-w-sm rounded overflow-hidden shadow-lg"
                key={men._id}
              >
                <img
                  src={Api_URL + `men/img/${men.image}`}
                  alt="Shoe image"
                  className="w-full h-72 object-cover"
                />
                <div className="px-6 py-4">
                  <div className="text-center font-bold text-teal-700">
                    {men.brand}
                  </div>
                  <div className="text-center">
                    <del className="text-red-500">{men.del}</del>
                    <p className="text-lg font-bold text-green-600">
                      {men.price}
                    </p>
                  </div>
                  <div className="font-bold text-xl mb-2">{men.title}</div>
                  <p className="text-gray-700 text-base text-center">
                    {men.description}
                  </p>
                </div>
                <div className="mt-auto flex justify-around px-6 py-4">
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                    onClick={() => handleEdit(men)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                    onClick={() => handleDelete(men._id)}
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
