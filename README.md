# Smart Inventory Forecaster  

A full-stack web application designed to help shop owners **manage inventory**, **forecast demand**, and **optimize restocking decisions** using well-established business algorithms.  
This project demonstrates **frontend state management with Redux**, **backend business logic using FastAPI**, and a clean **end-to-end data flow** from UI to algorithmic computation.

---

## 🎯 Project Objective

The objective of this project is to build a practical, full-stack system that showcases:
- Complex state management on the frontend using Redux Toolkit
- Algorithm implementation on the backend
- Secure API access using JWT authentication
- Clear separation of concerns and clean code structure  

---

## 🧱 Tech Stack

### Frontend
- **React.js**
- **Redux Toolkit** (Global State Management)
- **Axios** (API Communication)
- **Recharts** (Data Visualization)
- **CSS** (Custom styling)

### Backend
- **FastAPI (Python)**
- **SQLAlchemy ORM**
- **JWT Authentication**
- **Pydantic Schemas**

### Tools & Platforms
- Git & GitHub (Version Control)
- Vercel / Netlify (Frontend Deployment – optional)
- Render / Railway (Backend Deployment – optional)

---

## ⚙️ Core Features & Logic

### 1️⃣ Inventory Dashboard (Frontend Focus)

**Purpose:**  
Manage and visualize inventory data efficiently using Redux.

**Key Functionality:**
- Product table displaying:
  - Product Name
  - Current Stock
  - Unit Price
  - Monthly Sales History
- Inventory data is fetched once from the backend and stored in the Redux store
- Client-side filtering using Redux selectors (no API refetch)
- Optimistic UI updates when adding products

---

### 2️⃣ Demand Prediction – Simple Moving Average (SMA)

**Endpoint:**  
`POST /api/predict`

**Input:**  
An array of past monthly sales:
```json
[10, 12, 15, 14]
```

**Algorithm Logic:**  
The prediction is calculated using the **Simple Moving Average (SMA)** of the last three months.

**Formula:**
\[
SMA = \frac{x_{n-2} + x_{n-1} + x_n}{3}
\]

**Example:**
If sales history is:
```
[10, 20, 30]
```
Predicted demand:
```
(10 + 20 + 30) / 3 = 20
```

**Output:**
```json
{
  "predicted_demand": 20
}
```

The frontend displays this value along with a line chart visualization.

---

### 3️⃣ Restock Optimisation – Economic Order Quantity (EOQ)

**Endpoint:**  
`POST /api/eoq`

**Input Parameters:**
- Annual Demand (D)
- Ordering Cost per order (S)
- Holding Cost per unit per year (H)

**EOQ Formula:**
\[
Q = \sqrt{\frac{2DS}{H}}
\]

**Where:**
- \(D\) = Annual Demand
- \(S\) = Setup / Ordering Cost
- \(H\) = Holding Cost

**Output:**
```json
{
  "eoq": 447.21
}
```

The frontend also visualizes:
- Ordering Cost
- Holding Cost
- Total Cost  
against order quantity, with the EOQ marked clearly.

---

## 🔐 Authentication & Authorization (JWT)

The application uses **JWT-based authentication** to secure API endpoints.

### Roles & Credentials

| Role  | Username | Password   | Permissions |
|------|---------|------------|-------------|
| Admin | admin | **admin123** | Add & Delete Products |
| Clerk | clerk | **clerk123** | View Inventory Only |

**Authorization Logic:**
- JWT token is issued on successful login
- Token is attached to all API requests using Axios interceptors
- Backend validates token and checks user role
- Restricted endpoints are accessible only to admin users

> Credentials are provided **only for assignment demonstration purposes**.

---

## 📂 Project Structure

```
smart-inventory-forecaster/
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── auth.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/products/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Setup Instructions (Local)

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at:  
`http://127.0.0.1:8000`

---

### Frontend
```bash
cd frontend
npm install
npm start
```

Frontend runs at:  
`http://localhost:3000`

---

## ⚠️ Challenges Faced

A key challenge was implementing **JWT-based authentication with role-based access control** while keeping the system simple and aligned with assignment requirements. Careful handling of token generation, validation, and role checking was required to ensure that only authorized users could access protected endpoints.

Another challenge was synchronizing frontend behavior with backend authorization, particularly attaching tokens to API requests, managing user roles in the UI, and preventing unauthorized actions while maintaining a smooth user experience.

---

## 🤖 AI Tool Usage Disclosure

AI tools (**ChatGPT**) were used for productivity and guidance, including:
- Understanding and validating EOQ and SMA formulas
- Structuring Redux Toolkit slices
- Clarifying JWT authentication flow

All core logic, backend routes, algorithms, Redux implementation, and UI components were written and integrated manually.

---

## 📧 Submission Details

**Email:** jainkuriakose@arcnetic.com  
**Subject:** Full Stack Intern Assignment – [Your Name]

Please include:
- GitHub repository link
- Live demo links (if deployed)

---
## 👨‍💻 Author
**Binil K Joseph**  
B.Tech – Artificial Intelligence & Data Science  
Muthoot Institute of Technology and Science


