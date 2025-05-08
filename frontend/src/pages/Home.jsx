import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasmore] = useState(true);
  const { user, token } = useContext(AuthContext);
  const [cartMessage, setCartMessage] = useState(false);
  const navigate = useNavigate();
  const limit = 10;

  const fetchProducts = async () => {
    try {
      const response = await api.get(`/products?page=${page}&limit=${limit}`);
      const data = response.data;
  
      setProducts((prev) => {
        const allProducts = [...prev, ...data.products];
  
        // Remove duplicates by _id
        const uniqueProducts = allProducts.filter(
          (product, index, self) =>
            index === self.findIndex((p) => p._id === product._id)
        );
  
        return uniqueProducts;
      });
  
      setHasmore(page < data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if(
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 && hasmore
      ) {
        setPage((prev) => prev + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); 
  }, [hasmore])

  const addToCart = async (product) => {
    try {
      if(user) {
        const response = await api.post('/cart', {productId: product._id}, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })
      } else {
        setCartMessage(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      <Navbar />
        <Message showMessage={cartMessage} setShowMessage={setCartMessage} message={"Please login to add items to cart!"} func={() => navigate('/login')} btn={"Login"}/>
        <div className="grid grid-cols-5 gap-5 py-10">
        {products.map((product) => (
          <div
          key={product._id}
          className="p-5 bg-gray-700 rounded-2xl flex flex-col justify-between h-[400px] hover:scale-101"
        >
          <Link to={`/${product._id}`} className="flex-grow">
            <div className="h-48 overflow-hidden rounded-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-5 flex flex-col flex-grow">
              <p className="font-bold text-xl line-clamp-2 break-words">
                {product.name}
              </p>
              <p className="text-green-200 mt-1">₹{product.price}</p>
            </div>
          </Link>
        
          {/* Buttons always stick to the bottom */}
          {user?.role === "user" || !user ? (
            <div className="flex justify-between items-center gap-2 mt-3">
              <button onClick={() => addToCart(product)} className="bg-green-500 px-3 py-2 rounded-xl text-sm cursor-pointer">
                Add to cart
              </button>
              <button className="bg-green-600 px-3 py-2 rounded-xl text-sm cursor-pointer">
                Buy now
              </button>
            </div>
          ) : user?.role === "admin" ? (
            <div className="flex justify-center items-center gap-2 mt-3">
              <Link to={`/edit/${product._id}`} className="bg-green-700 w-full px-3 py-2 rounded-xl text-sm">
                <button className="cursor-pointer">
                  Edit Product
                </button>
              </Link>
              <button
                className="bg-red-700 w-full px-3 py-2 rounded-xl text-sm cursor-pointer"
                onClick={() => deleteProduct(product._id)}
              >
                Delete Product
              </button>
            </div>
          ) : null}
        </div>        
        ))}
        </div>
      </div>
  );
}
