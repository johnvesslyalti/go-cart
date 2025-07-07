import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { User } from "../types/types";

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
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, token } = useContext(AuthContext) as IContext;
  const navigate = useNavigate();

  const limit = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      if (!hasMore) return;
      setIsLoading(true);

      try {
        const response = await api.get<ProductResponse>(`products?page=${page}&limit=${limit}`);
        const { products: newProducts, totalPage } = response.data;

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
      setPage(prev => prev + 1);
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
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 md:px-10 py-6">
      <Navbar search={search} onSearchChange={setSearch} />
      <Message
        showMessage={cartMessage}
        setShowMessage={setCartMessage}
        message="Please login to add items to cart!"
        func={() => navigate('/login')}
        btn="Login"
      />

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-t-green-400 border-gray-600 rounded-full animate-spin" />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-8">
        {filteredProducts.length === 0 && !isLoading ? (
          <p className="col-span-full text-center text-gray-300 text-lg">No products found.</p>
        ) : (
          filteredProducts.map(product => (
            <div
              key={product._id}
              className="bg-gray-800 hover:shadow-lg transition-all p-4 rounded-2xl flex flex-col justify-between h-[420px] hover:scale-[1.02]"
            >
              <div className="flex flex-col h-full justify-between">
                <Link to={`/${product._id}`}>
                  <div className="h-44 overflow-hidden rounded-xl bg-white p-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="mt-3">
                    <h2 className="font-semibold text-lg line-clamp-2">{product.name}</h2>
                    <p className="text-green-400 mt-1 font-medium">₹{product.price}</p>
                  </div>
                </Link>

                {user?.role === "user" || !user ? (
                  <div className="flex justify-between gap-2 mt-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-green-500 hover:bg-green-600 transition-colors px-3 py-2 rounded-xl text-xs md:text-sm"
                    >
                      Add to cart
                    </button>
                    <button className="flex-1 bg-green-600 hover:bg-green-700 transition-colors px-3 py-2 rounded-xl text-xs md:text-sm">
                      Buy now
                    </button>
                  </div>
                ) : user?.role === "admin" ? (
                  <div className="flex justify-between gap-2 mt-2">
                    <Link
                      to={`/edit/${product._id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-xl text-xs text-center"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-xl text-xs"
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center mt-6">
        {hasMore && (
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-xl transition-colors disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
}
