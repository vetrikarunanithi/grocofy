# Grocofy – Online Grocery Ordering Platform
![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Framework-Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-black?logo=jsonwebtokens&logoColor=white)
![Stripe](https://img.shields.io/badge/Payments-Stripe-635BFF?logo=stripe&logoColor=white)
![CSS3](https://img.shields.io/badge/Styling-CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?logo=javascript&logoColor=black)

Grocofy is a full-stack web application designed to simplify online grocery shopping.  
It allows users to browse products, manage their cart, save personal details and delivery addresses, and place secure online orders.

**Project Status: In Development**  
This project is currently under active development. Features are being added and improved.  
The complete and final codebase will be updated soon.

---

## Features (Planned & In Progress)

- User authentication (Signup / Login using JWT)
- Product listing with categories and images
- Add to cart and quantity management
- User profile management
- Multiple saved delivery addresses
- Autofill checkout using saved profile data
- Secure payment integration with Stripe
- Order history tracking
- Admin product management (upcoming)

---

## Tech Stack

**Frontend**
- React.js
- CSS

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB

**Authentication**
- JSON Web Tokens (JWT)

**Payments**
- Stripe Checkout

---

## Database Collections

**Users**
- name  
- email  
- password  
- phone  
- addresses[]  
- cartData  

**Products**
- name  
- description  
- price  
- category  
- image  

**Orders**
- userId  
- items[]  
- amount  
- address  
- payment status  
- order status  
- date  

---

## Application Flow

1. User registers or logs in  
2. User browses grocery products  
3. Items are added to cart  
4. User selects a saved address or adds a new one  
5. Payment is processed via Stripe  
6. Order is verified and stored  
7. User can view order history  

---

## Local Setup (Development)

```bash
# Clone the repository
git clone https://github.com/your-username/grocofy.git

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Run backend
npm run server

# Run frontend
npm run dev
```
---
## Author
**Vetriselvan Karunanithi**  
GitHub: [vetrikarunanithi](https://github.com/vetrikarunanithi)  
LinkedIn: [Vetriselvan Karunanithi](https://www.linkedin.com/in/vetriselvank)
