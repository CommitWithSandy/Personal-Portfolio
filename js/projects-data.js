/* ==========================================================================
   PORTFOLIO DATA & MODAL SYSTEM (PROJECTS & TECH MATRIX)
   ========================================================================== */

const PROJECTS_DATA = [
  {
    id: "project-1",
    title: "Gaming E-Commerce Platform",
    category: "fullstack",
    number: "01",
    shortDesc: "Full-stack gaming e-commerce platform with Spring Boot REST API, MySQL database, category browsing, and an admin inventory management dashboard.",
    image: "assets/project1.jpg",
    tags: ["Java", "Spring Boot", "MySQL", "JavaScript", "HTML5/CSS3"],
    metrics: [
      { label: "Architecture", value: "REST API" },
      { label: "Database", value: "MySQL" },
      { label: "Admin Control", value: "Full CRUD" }
    ],
    detailedOverview: "A robust full-stack gaming e-commerce web application featuring user registration, secure authentication, product search by category, shopping cart, and checkout workflows. Includes a dedicated Admin Dashboard to manage products, inventory, and track multi-stage order statuses (Pending, Confirmed, Shipped, Delivered, Canceled).",
    architecture: [
      "Layered MVC & RESTful architecture using Java Spring Boot and MySQL persistence.",
      "Comprehensive Admin Control Panel for real-time inventory and order lifecycle tracking.",
      "Responsive frontend interface built with semantic HTML5, CSS3, and interactive JavaScript."
    ],
    liveUrl: "https://github.com/CommitWithSandy",
    githubUrl: "https://github.com/CommitWithSandy"
  },
  {
    id: "project-2",
    title: "EcoMind — Sustainable Living Guide",
    category: "webapps",
    number: "02",
    shortDesc: "A web platform promoting sustainable eco-friendly habits with personalized recommendations and an interactive community forum.",
    image: "assets/project2.jpg",
    tags: ["PHP", "JavaScript", "MySQL", "HTML5", "CSS3"],
    metrics: [
      { label: "Personalization", value: "Lifestyle-Based" },
      { label: "Community", value: "Forum Support" },
      { label: "Database", value: "Relational SQL" }
    ],
    detailedOverview: "EcoMind empowers users to adopt sustainable living practices. It features personalized habit recommendations tailored to individual lifestyles and preferences, along with an engaging community forum where members share knowledge, hold discussions, and advocate for green initiatives.",
    architecture: [
      "Modular PHP backend connected to MySQL database for forum threads and user profile preferences.",
      "Custom recommendation engine mapping user lifestyle parameters to eco-friendly habits.",
      "Interactive AJAX-enabled forum UI for seamless community discussions."
    ],
    liveUrl: "https://github.com/CommitWithSandy",
    githubUrl: "https://github.com/CommitWithSandy"
  },
  {
    id: "project-3",
    title: "Data Analytics & Forensic Dashboard",
    category: "analytics",
    number: "03",
    shortDesc: "Deloitte Australia Data Analytics Job Simulation on Forage — forensic technology analysis, interactive Tableau dashboards, and Excel modeling.",
    image: "assets/project3.jpg",
    tags: ["Tableau", "Excel", "Data Analytics", "Forensic Tech"],
    metrics: [
      { label: "Simulation", value: "Deloitte AU" },
      { label: "Platform", value: "Forage" },
      { label: "Visualization", value: "Tableau" }
    ],
    detailedOverview: "Completed Deloitte Australia's Data Analytics Job Simulation on Forage. Performed in-depth forensic technology analysis, built dynamic visualization dashboards in Tableau, and utilized advanced Excel modeling to classify complex data sets and derive strategic business conclusions.",
    architecture: [
      "Forensic data extraction, cleaning, and classification in Microsoft Excel.",
      "Interactive visual analytics dashboard built with Tableau to communicate key metrics.",
      "Data-driven business decision framework presented in structured simulation reports."
    ],
    liveUrl: "https://github.com/CommitWithSandy",
    githubUrl: "https://github.com/CommitWithSandy"
  },
  {
    id: "project-4",
    title: "MERN Stack E-Commerce & Web Applications",
    category: "fullstack",
    number: "04",
    shortDesc: "Modern full-stack web applications built using MongoDB, Express.js, React.js, and Node.js with JWT authentication and RESTful APIs.",
    image: "assets/project4.jpg",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
    metrics: [
      { label: "Frontend", value: "React SPAs" },
      { label: "Backend", value: "Node/Express" },
      { label: "NoSQL DB", value: "MongoDB" }
    ],
    detailedOverview: "Scalable MERN stack web application implementations leveraging React for dynamic user interfaces, Node.js & Express for non-blocking asynchronous REST APIs, and MongoDB for flexible document storage.",
    architecture: [
      "Component-based modular UI architecture built with React functional components and Hooks.",
      "Express REST API middleware featuring secure JWT token verification and password hashing.",
      "MongoDB Mongoose schemas designed for optimal query performance and relational references."
    ],
    liveUrl: "https://github.com/CommitWithSandy",
    githubUrl: "https://github.com/CommitWithSandy"
  },
  {
    id: "project-5",
    title: "PulseSphere — Weather & Atmosphere Hub",
    category: "webapps",
    number: "05",
    shortDesc: "Real-time weather and atmospheric intelligence hub built with Vanilla JS (ES6+), CSS3 Glassmorphism, and Open-Meteo REST APIs.",
    image: "assets/pulsesphere.png",
    tags: ["JavaScript (ES6+)", "HTML5", "CSS3 Glassmorphism", "Open-Meteo API", "REST APIs"],
    metrics: [
      { label: "APIs Integrated", value: "3 Public APIs" },
      { label: "Architecture", value: "Vanilla ES6+" },
      { label: "Performance", value: "< 200ms Load" }
    ],
    detailedOverview: "PulseSphere is a production-grade atmospheric intelligence hub built for Elite Tech Internship Task 1. Connects to Open-Meteo Forecast, Air Quality, and Geocoding APIs to deliver real-time meteorological metrics, condition-adaptive cosmic glow themes, 6 atmospheric gauges (UV, AQI PM2.5/PM10, wind compass, pressure, sun arc), 24-hour SVG bezier curves, and offline caching.",
    architecture: [
      "Modular Vanilla JavaScript ES6+ Service and UI Controller patterns with zero npm framework dependencies.",
      "Multi-endpoint asynchronous orchestration connecting Open-Meteo Forecast, Air Quality, and Geocoding APIs.",
      "Dynamic CSS custom properties for ambient weather glow morphing and reactive SVG vector gauge animations."
    ],
    liveUrl: "https://github.com/CommitWithSandy/ELiteTEch-Intern.git",
    githubUrl: "https://github.com/CommitWithSandy/ELiteTEch-Intern.git"
  }
];

const SKILL_SNIPPETS = {
  frontend: `// MERN Stack - React Component & State Management
import React, { useState, useEffect } from 'react';

export function ProductCatalog({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`/api/products?category=\${category}\`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, [category]);

  if (loading) return <div className="spinner">Loading Products...</div>;

  return (
    <div className="product-grid">
      {products.map(item => (
        <div key={item._id} className="product-card">
          <h3>{item.title}</h3>
          <p>₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}`,
  backend: `// Java Spring Boot REST Controller - Gaming E-Commerce
package com.sandesh.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @PostMapping("/admin/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.saveProduct(product));
    }
}`,
  ai: `-- SQL Database Schema & Analytics Query
SELECT 
    p.category_name,
    COUNT(o.order_id) AS total_orders,
    SUM(o.total_amount) AS revenue
FROM orders o
JOIN products p ON o.product_id = p.product_id
WHERE o.status = 'DELIVERED'
GROUP BY p.category_name
ORDER BY revenue DESC;`
};

// Function to open project modal
function openProjectModal(projectId) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;

  const modalBackdrop = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-dynamic-content');

  if (!modalBackdrop || !modalContent) return;

  modalContent.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-glass); padding-bottom: 16px;">
        <span class="project-num">${project.number} / CASE STUDY</span>
        <div class="project-tags">
          ${project.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>

      <h2 class="heading-lg gradient-text">${project.title}</h2>
      
      <div style="border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-glow); max-height: 380px;">
        <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;">
        ${project.metrics.map(m => `
          <div style="background: rgba(255,255,255,0.04); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
            <div style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--accent-secondary);">${m.value}</div>
            <div style="font-size: 0.8rem; color: var(--text-dim);">${m.label}</div>
          </div>
        `).join('')}
      </div>

      <div>
        <h4 style="color: var(--text-main); font-size: 1.1rem; margin-bottom: 8px;">Project Overview</h4>
        <p style="color: var(--text-muted); line-height: 1.7; font-size: 0.95rem;">${project.detailedOverview}</p>
      </div>

      <div>
        <h4 style="color: var(--text-main); font-size: 1.1rem; margin-bottom: 12px;">Architecture & Key Features</h4>
        <ul style="display: flex; flex-direction: column; gap: 10px; padding-left: 20px; color: var(--text-muted); font-size: 0.92rem;">
          ${project.architecture.map(a => `<li>${a}</li>`).join('')}
        </ul>
      </div>

      <div style="display: flex; gap: 16px; margin-top: 10px;">
        <a href="${project.githubUrl}" target="_blank" class="btn-pill-primary">
          <i data-lucide="github" style="width: 16px;"></i> View on GitHub
        </a>
      </div>
    </div>
  `;

  modalBackdrop.classList.add('active');
  if (window.lucide) window.lucide.createIcons();
}

function closeProjectModal() {
  const modalBackdrop = document.getElementById('project-modal');
  if (modalBackdrop) modalBackdrop.classList.remove('active');
}

