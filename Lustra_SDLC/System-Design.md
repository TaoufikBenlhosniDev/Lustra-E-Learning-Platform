# **System Design Document for Lustra E-Learning Platform**

---

## **1. Introduction**
### **1.1 Purpose**
This document outlines the architecture, technology stack, and database design for the Lustra e-learning platform. It serves as a blueprint for the development team to ensure a scalable, secure, and efficient system.

### **1.2 Scope**
The system will be a web-based application providing users with courses and blog content. It must support high concurrency, secure user authentication, and seamless integrations with third-party services.

---

## **2. System Architecture**
### **2.1 High-Level Architecture**
Lustra follows a **Monolithic Architecture** with an **HTML, CSS, and JavaScript frontend**, a **Node.js backend**, and **MySQL and MongoDB for data storage**. The system is hosted on **Hostinger** with **Docker-based containerization** and CI/CD pipelines for deployment.

### **2.2 Component Breakdown**
- **Frontend (Client-side)**: HTML, CSS, JavaScript (Vanilla JS)
- **Backend (Server-side)**: Node.js with Express.js
- **Database**: MySQL (Relational DB), MongoDB (for NoSQL content storage)
- **Authentication**: OAuth 2.0, JWT-based authentication
- **Storage**: Hostinger cloud storage for media files (videos, images)
- **Messaging & Notifications**: WebSockets for real-time chat, Firebase Push Notifications
- **Logging & Monitoring**: ELK Stack (Elasticsearch, Logstash, Kibana), Prometheus for metrics
- **Security & Compliance**: SSL/TLS encryption, GDPR & CCPA compliance, Secure API Gateway

---

## **3. Technology Stack**

| **Layer**              | **Technology**  |
|-----------------------|----------------|
| **Frontend**         | HTML, CSS, JavaScript  |
| **Backend**          | Node.js, Express.js  |
| **Database**         | MySQL, MongoDB  |
| **Authentication**   | OAuth 2.0, JWT  |
| **Storage**          | Hostinger Cloud Storage  |
| **Messaging**        | WebSockets, Firebase  |
| **CI/CD**           | GitHub Actions, Docker, Kubernetes  |
| **Monitoring**      | ELK Stack, Prometheus  |
| **Security**       | SSL/TLS, API Gateway, GDPR Compliance  |

---

## **4. Database Design**

### **4.1 ER Diagram (Entity-Relationship Model)**
The database follows a **relational structure with MySQL**, ensuring data integrity and scalability. MongoDB is used for storing unstructured content like blog posts.

**Key Entities:**
- **Users (Readers, Admins)**
- **Courses**
- **Blog Posts**

### **4.2 Database Schema (Simplified Version)**

#### **Users Table (MySQL)**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password_hash TEXT,
    role ENUM('reader', 'admin'),
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### **Courses Table (MySQL)**
```sql
CREATE TABLE courses (
    id UUID PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### **Blog Posts Collection (MongoDB)**
```json
{
    "_id": "ObjectId",
    "title": "Sample Blog Post",
    "content": "This is a blog post content.",
    "created_at": "2025-02-23T12:00:00Z"
}
```

---

## **5. API Design (High-Level Overview)**
The backend exposes **RESTful APIs** with the following endpoints:

| **Endpoint**          | **Method** | **Description**  |
|----------------------|-----------|----------------|
| `/api/auth/signup`  | POST      | User registration  |
| `/api/auth/login`   | POST      | User authentication (JWT)  |
| `/api/courses`      | GET       | Fetch all courses  |
| `/api/courses/:id`  | GET       | Get course details  |
| `/api/blogs`        | GET       | Fetch all blog posts  |
| `/api/blogs/:id`    | GET       | Get blog post details  |

---

## **6. Security Considerations**
- **Data Encryption:** All user data is encrypted both in transit (TLS 1.2/1.3) and at rest.
- **Authentication & Authorization:** Role-based access control (RBAC) with JWT.
- **API Security:** API Gateway with rate limiting to prevent DDoS attacks.
- **Input Validation & Sanitization:** Prevents SQL Injection & XSS attacks.
- **Logging & Monitoring:** Tracks API requests, failed logins, and suspicious activity.

---

## **7. Deployment Strategy**
### **7.1 Infrastructure & Hosting**
- **Cloud Provider:** Hostinger
- **Containerization:** Docker with Kubernetes for orchestration
- **CI/CD:** GitHub Actions + Kubernetes for automated deployments
- **Load Balancing:** Hostinger Load Balancer

### **7.2 Deployment Pipeline**
1. Code pushed to GitHub triggers CI/CD pipeline.
2. Code is built and tested automatically.
3. Docker containers are built and pushed to a registry.
4. Kubernetes deploys the updated containers to Hostinger.
5. Monitoring and logging ensure stability post-deployment.

---

## **8. Conclusion**
The Lustra e-learning platform is designed with scalability, security, and performance in mind. By using a modern cloud-based monolithic architecture, simple frontend technologies, and best security practices, it ensures a seamless and interactive learning experience for users. Future iterations may include AI-driven content recommendations.

---

