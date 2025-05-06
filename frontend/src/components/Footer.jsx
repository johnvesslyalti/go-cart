export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-10 mt-10">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand / Logo */}
          <div>
            <h2 className="text-2xl font-bold mb-2">GoCart</h2>
            <p className="text-sm text-gray-400">
              Your go-to destination for everything you love. Fast, simple, and secure shopping.
            </p>
          </div>
  
          {/* Navigation
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/login" className="hover:text-white">Login</a></li>
              <li><a href="/register" className="hover:text-white">Register</a></li>
              <li><a href="/addproduct" className="hover:text-white">Add Product</a></li>
            </ul>
          </div> */}
  
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-400 text-sm">Email: support@gocart.com</p>
            <p className="text-gray-400 text-sm">Phone: +91 98765 43210</p>
            <p className="text-gray-400 text-sm">Location: India</p>
          </div>
        </div>
  
        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-700 pt-5">
          &copy; {new Date().getFullYear()} GoCart. All rights reserved.
        </div>
      </footer>
    );
  }
  