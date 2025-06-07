Project Title:
    Go Cart

Description:
    Go Cart is a full-stack e-commerce web application where users can browse products, add them to the cart, and place orders.

Demo:

Features:

Tech Stack:

    backend:
        NodeJS + TypeScript
        ExpressJS
        
    frontend:
        React + vite + TypeScript
        TailwindCSS

    Authentication:
        JWT + bcrypt
    
    Database:
        MongoDB

Installation:

    npm install --save-dev typescript
    npm install --save-dev @types/node @types/react @types/react-dom
    npx tsc --init

API End Points:

Folder Structure:

    |-  backend
    |-  fronend
    |-  .gitignore
    |-  README.nd

    backend:
        |-  config/
            |-  db.ts
        |-  controllers/
            |-  cartController.ts
            |-  productController.ts
            |-  userController.ts
        |-  middleware/
            |-  authMiddleware.ts
        |-  models/
            |-  Cart.ts
            |-  Product.ts
            |-  User.ts
        |-  routes/
            |-  cartRoutes.ts
            |-  productRoutes.ts
            |-  userRoutes.ts
        |-  .env
        |-  index.ts

frontend:

Contributing:

Contributions are welcome! Please fork the repo and submit a pull request.