
const WHATSAPP_NUMBER = "2349112592122";
// Replace with your WhatsApp number.
// Use country code 234, without + or spaces.

const products = [
  {
    name: "Elegant Statement Dress",
    category: "Clothing",
    price: 28000,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Classic Everyday Outfit",
    category: "Clothing",
    price: 35000,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Stylish Handbag",
    category: "Bags",
    price: 22000,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Classic White Shirt",
    category: "Clothing",
    price: 18000,
    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Fashion Sneakers",
    category: "Shoes",
    price: 32000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Designer Mini Bag",
    category: "Bags",
    price: 26000,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Golden Earrings",
    category: "Accessories",
    price: 8500,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Classic Denim Jeans",
    category: "Clothing",
    price: 24000,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80"
  }
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("productSearch");
const categoryFilter = document.getElementById("categoryFilter");
const resultCount = document.getElementById("resultCount");

function formatPrice(price) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(price);
}

function createWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function displayProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  resultCount.textContent =
    `${filteredProducts.length} product(s) found`;

  if (filteredProducts.length === 0) {
    productGrid.innerHTML =
      '<p class="no-results">No products found. Try another search.</p>';
    return;
  }

  productGrid.innerHTML = filteredProducts.map(product => {
    const message =
      `Hello BellaStyle! I am interested in ${product.name}, priced at ${formatPrice(product.price)}. Is it available?`;

    return `
      <article class="product-card">
        <div class="product-image-wrap">
          <img
            class="product-image"
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
          >
        </div>

        <div class="product-details">
          <span class="product-category">${product.category}</span>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${formatPrice(product.price)}</p>

          <a
            class="product-order"
            href="${createWhatsAppLink(message)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Enquire on WhatsApp</span>
            <span>↗</span>
          </a>
        </div>
      </article>
    `;
  }).join("");
}

searchInput.addEventListener("input", displayProducts);
categoryFilter.addEventListener("change", displayProducts);

document.getElementById("contactWhatsApp").href =
  createWhatsAppLink(
    "Hello BellaStyle! I would like to ask about your collection."
  );

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Display products when the website opens.
displayProducts();
