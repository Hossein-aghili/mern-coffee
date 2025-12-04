# MERN-Coffee — Backend (Ready for Frontend Integration) ☕️🚀

> **MERN-Coffee** is a clean, minimal backend for a coffee shop full-stack app.  
> This repository contains the **Express + MongoDB (Mongoose)** API with OTP authentication, password login, admin/user roles, and CRUD operations for products, categories, sliders, blogs, and users.  
> The frontend will be added later — this README is written with that in mind.

---

## 📌 Table of Contents
1. Introduction  
2. Features  
3. Tech Stack  
4. Project Structure  
5. Installation  
6. Environment Variables  
7. API Overview  
8. Authentication Flow  
9. Models  
10. Middlewares  
11. Swagger Docs  
12. Frontend Integration Tips  
13. Testing  
14. Deployment  
15. Security  
16. Contributing  
17. License  
18. Contact  

---

# 1. 🚀 Introduction
This repository hosts the backend for a MERN coffee shop application.  
It provides REST APIs for managing users, authentication, products, categories, sliders, and blogs.  
It is fully prepared for frontend integration (React / Next.js / React Native).

---

# 2. ✨ Features
- OTP authentication (via SMS)
- Password authentication (admin + users)
- JWT session system
- User roles: **user**, **admin**
- CRUD for:
  - Products  
  - Categories  
  - Sliders  
  - Blogs  
  - Users  
- Pagination + filtering + sorting (ApiFeatures)
- Swagger UI documentation
- Clean and scalable project architecture

---

# 3. 🧰 Tech Stack
- Node.js + Express  
- MongoDB + Mongoose  
- JWT  
- bcryptjs  
- Morgan  
- CORS  
- Swagger (swagger-jsdoc + swagger-ui-express)  
- vanta-api utilities  

---

# 4. 📁 Project Structure
```
/ (root)
├─ controllers/
├─ routes/
├─ models/
├─ middlewares/
├─ utils/
├─ Swagger/
├─ app.js
├─ server.js
├─ config.env
├─ package.json
```

---

# 5. ⚡ Installation
```bash
git clone <repo-url>
cd mern-coffee
npm install
```

Run development server:
```bash
npm run dev
```

Visit:
- API: `http://localhost:<PORT>/api`
- Swagger: `http://localhost:<PORT>/api-docs`

---

# 6. 🔐 Environment Variables
Create `config.env` or `.env`:

```env
PORT=5000
DATA_BASE=mongodb://...
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
SMS_PROVIDER_API_KEY=xxxx
SMS_PROVIDER_SENDER=Coffee
```

---

# 7. 🛣️ API Overview

### Auth
- `POST /api/auth` — request OTP  
- `POST /api/auth/otp` — verify OTP + login/register  
- `POST /api/auth/checkPassword` — login with password  
- `POST /api/auth/forgetPassword` — reset password  
- `POST /api/auth/resendCode` — resend OTP  
- `POST /api/auth/adminLogin` — admin login  

### Users
- `GET /api/user`  
- `GET /api/user/:id`  
- `PATCH /api/user/:id`  

### Products
- `POST /api/product`  
- `GET /api/product`  
- `GET /api/product/:id`  
- `PATCH /api/product/:id`  
- `DELETE /api/product/:id`  

### Categories
- `POST /api/category`  
- `GET /api/category`  
- `GET /api/category/:id`  
- `PATCH /api/category/:id`  
- `DELETE /api/category/:id`  

### Blogs
- CRUD endpoints similar to products

### Sliders
- CRUD endpoints similar to products

---

# 8. 🔑 Authentication Flow

### OTP Login  
1. Client sends phone number  
2. Server sends OTP (`sendAuthCode`)  
3. Client verifies OTP with `/api/auth/otp`  
4. Server creates account or logs in  
5. JWT token issued  

### Password Login  
- Admin & users with passwords can login via `/api/auth/checkPassword`  

**Authorization Header**:
```
Authorization: Bearer <token>
```

---

# 9. 📦 Models (Summary)

### User
- fullName  
- username  
- phoneNumber  
- password (hashed)  
- role (user/admin)  

### Product
- name  
- description  
- images []  
- price  
- categoryId  

### Category
- title  
- images  
- parentCategory  

### Blog
- title  
- description  
- images  
- categoryId  
- author  

### Slider
- name  
- images  

---

# 10. 🧾 Middlewares
- `isLogin` — checks JWT  
- `isAdmin` — admin-only access  
- Unified error handling (vanta-api utilities)  

---

# 11. 📚 Swagger API Docs
When the server is running:

```
http://localhost:<PORT>/api-docs
```

---

# 12. 🧩 Frontend Integration Tips

- Store base URL in `.env`:
  - `REACT_APP_API_URL=http://localhost:5000/api`
- On successful login → store JWT securely
- Add `Authorization` header for protected routes
- Use Swagger docs to auto-generate API endpoints
- Frontend should upload images to a storage provider and send URLs to backend

---

# 13. 🐞 Testing
- Use Postman or Swagger  
- Example OTP request:
```bash
curl -X POST http://localhost:5000/api/auth \
-H "Content-Type: application/json" \
-d '{"phoneNumber": "09123456789"}'
```

---

# 14. ☁️ Deployment
- Use Mongo Atlas or production Mongo server  
- Use PM2 or Docker  
- Enable HTTPS  
- Add rate limiting for OTP endpoints  
- Secure `.env` and secrets  

---

# 15. 🔒 Security Notes
- Don't commit `.env`  
- Use `helmet` in production  
- Hash passwords with bcrypt (already implemented)  
- Add rate limiting on sensitive routes  

---

# 16. 🤝 Contributing
1. Fork repo  
2. Create branch: `feat/<feature>`  
3. Commit  
4. Pull request  

---

# 17. 📜 License
MIT License  

---

# 18. ✉️ Contact
Feel free to open issues or DM the maintainer.  
Project is under active development — frontend will join soon.

