import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { User } from "../types/types";

// Define product interface
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductResponse {
  products: Product[];
  totalPage: number;
}

interface IContext {
  user: User;
  token: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartMessage, setCartMessage] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const { user, token } = useContext(AuthContext) as IContext;
  const navigate = useNavigate();

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const limit = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      if (!hasMore) return;

      setIsLoading(true);

      try {
        const response = await api.get<ProductResponse>(`products?page=${page}&limit=${limit}`);
        const { products: newProducts, totalPage } = response.data;

        // Remove duplicates by _id
        setProducts(prev => {
          const existingIds = new Set(prev.map(p => p._id));
          const uniqueProducts = newProducts.filter(p => !existingIds.has(p._id));
          return [...prev, ...uniqueProducts];
        });

        if (page >= totalPage) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = async (product: Product) => {
    try {
      if (user) {
        await api.post('/cart', { productId: product._id }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
      } else {
        setCartMessage(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(prev => prev.filter(product => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      <Navbar search={search} onSearchChange={setSearch} />
      <Message
        showMessage={cartMessage}
        setShowMessage={setCartMessage}
        message={"Please login to add items to cart!"}
        func={() => navigate('/login')}
        btn={"Login"}
      />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 py-10">
  {filteredProducts.length === 0 && !isLoading ? (
    <p className="col-span-full text-center text-white text-lg">No products found.</p>
  ) : (
    filteredProducts.map(product => (
      <div
        key={product._id}
        className="p-5 bg-gray-700 rounded-2xl flex flex-col justify-between h-[400px] hover:scale-101"
      >
        {/* Product card as before */}
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

        {user?.role === "user" || !user ? (
          <div className="flex justify-center items-center gap-2 mt-3 w-full">
            <button
              onClick={() => addToCart(product)}
              className="bg-green-500 px-3 py-2 rounded-xl text-[10px] md:text-sm cursor-pointer"
            >
              Add to cart
            </button>
            <button className="bg-green-600 px-3 py-2 rounded-xl text-[10px] md:text-sm cursor-pointer">
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
    ))
  )}
</div>


      <div className="flex justify-center items-center mt-4">
        {hasMore && (
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="bg-green-500 px-4 py-2 rounded-lg text-white"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
}
