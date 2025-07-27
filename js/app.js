// TrustCart - Main Application JavaScript

// Global Variables
let currentLanguage = 'en';
let inventory = [];
let filteredSuppliers = [...suppliersData];

// DOM Elements
const languageToggle = document.getElementById('languageToggle');
const currentLang = document.getElementById('currentLang');
const darkModeToggle = document.getElementById('darkModeToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadInventory();
    renderSuppliers();
    updateAnalytics();
    setupEventListeners();
});

// Initialize Application
function initializeApp() {
    // Load saved preferences
    currentLanguage = localStorage.getItem('trustcart_language') || 'en';
    applyDarkModeFromStorage();
    
    // Apply saved preferences
    applyLanguage(currentLanguage);
    
    // Show home section by default
    showSection('home');
}

// Setup Event Listeners
function setupEventListeners() {
    // Language Toggle
    languageToggle.addEventListener('click', toggleLanguage);
    
    // Dark Mode Toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Mobile Menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Navigation Links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('href').substring(1);
            showSection(section);
            updateNavigation(this);
        });
    });
    
    // Add Item Form
    const addItemForm = document.getElementById('addItemForm');
    if (addItemForm) {
        addItemForm.addEventListener('submit', addInventoryItem);
    }
    
    // Edit Item Form
    const editItemForm = document.getElementById('editItemForm');
    if (editItemForm) {
        editItemForm.addEventListener('submit', updateInventoryItem);
    }
    
    // Supplier Search and Filters
    const supplierSearch = document.getElementById('supplierSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const clearFilters = document.getElementById('clearFilters');
    
    if (supplierSearch) {
        supplierSearch.addEventListener('input', filterSuppliers);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterSuppliers);
    }
    if (clearFilters) {
        clearFilters.addEventListener('click', clearSupplierFilters);
    }
}

// Language Management
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    applyLanguage(currentLanguage);
    localStorage.setItem('trustcart_language', currentLanguage);
}

function applyLanguage(lang) {
    currentLanguage = lang;
    
    // Update language display
    const langElements = document.querySelectorAll('[data-en][data-hi]');
    langElements.forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
    
    // Update current language indicator
    if (currentLang) {
        currentLang.textContent = currentLang.getAttribute(`data-${lang}`);
    }
    
    // Re-render dynamic content
    renderInventoryTable();
    renderSuppliers();
    updateAnalytics();
}

// Dark Mode Management
function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('trustcart_darkMode', isDark);
    updateDarkModeIcon(isDark);
}

function applyDarkModeFromStorage() {
    const isDark = localStorage.getItem('trustcart_darkMode') === 'true';
    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    updateDarkModeIcon(isDark);
}

function updateDarkModeIcon(isDark) {
    if (darkModeToggle) {
        darkModeToggle.innerHTML = isDark
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }
}

// Mobile Menu
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
}

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
    
    // Update navigation
    updateNavigation(document.querySelector(`[href="#${sectionId}"]`));
    
    // Close mobile menu
    mobileMenu.classList.add('hidden');
}

function updateNavigation(activeLink) {
    // Remove active class from all links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Inventory Management
function getCurrentUserEmail() {
    return localStorage.getItem('trustcart_userEmail') || '';
}

function getInventoryKey() {
    const email = getCurrentUserEmail();
    return email ? `trustcart_inventory_${email}` : 'trustcart_inventory';
}

function loadInventory() {
    const key = getInventoryKey();
    const saved = localStorage.getItem(key);
    inventory = saved ? JSON.parse(saved) : [];
}

function saveInventory() {
    const key = getInventoryKey();
    localStorage.setItem(key, JSON.stringify(inventory));
    updateAnalytics();
    checkLowStock();
}

function addInventoryItem(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const item = {
        id: Date.now(),
        name: formData.get('itemName') || document.getElementById('itemName').value,
        quantity: parseFloat(formData.get('itemQuantity') || document.getElementById('itemQuantity').value),
        unit: formData.get('itemUnit') || document.getElementById('itemUnit').value,
        price: parseFloat(formData.get('itemPrice') || document.getElementById('itemPrice').value),
        dateAdded: new Date().toISOString()
    };
    
    inventory.push(item);
    saveInventory();
    renderInventoryTable();
    
    // Reset form
    e.target.reset();
    
    showToast('success', currentLanguage === 'en' ? 'Item added successfully!' : 'आइटम सफलतापूर्वक जोड़ा गया!');
}

function updateInventoryItem(e) {
    e.preventDefault();
    
    const itemId = parseInt(document.getElementById('editItemId').value);
    const itemIndex = inventory.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        inventory[itemIndex] = {
            ...inventory[itemIndex],
            name: document.getElementById('editItemName').value,
            quantity: parseFloat(document.getElementById('editItemQuantity').value),
            unit: document.getElementById('editItemUnit').value,
            price: parseFloat(document.getElementById('editItemPrice').value)
        };
        
        saveInventory();
        renderInventoryTable();
        closeEditModal();
        
        showToast('success', currentLanguage === 'en' ? 'Item updated successfully!' : 'आइटम सफलतापूर्वक अपडेट किया गया!');
    }
}

function deleteInventoryItem(itemId) {
    if (confirm(currentLanguage === 'en' ? 'Are you sure you want to delete this item?' : 'क्या आप वाकई इस आइटम को हटाना चाहते हैं?')) {
        inventory = inventory.filter(item => item.id !== itemId);
        saveInventory();
        renderInventoryTable();
        
        showToast('success', currentLanguage === 'en' ? 'Item deleted successfully!' : 'आइटम सफलतापूर्वक हटा दिया गया!');
    }
}

function editInventoryItem(itemId) {
    const item = inventory.find(item => item.id === itemId);
    if (item) {
        document.getElementById('editItemId').value = item.id;
        document.getElementById('editItemName').value = item.name;
        document.getElementById('editItemQuantity').value = item.quantity;
        document.getElementById('editItemUnit').value = item.unit;
        document.getElementById('editItemPrice').value = item.price;
        
        document.getElementById('editModal').classList.remove('hidden');
    }
}

function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
}

function renderInventoryTable() {
    const tbody = document.getElementById('inventoryTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (inventory.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="table-cell text-center text-gray-500 dark:text-gray-400 py-8">
                    ${currentLanguage === 'en' ? 'No items in inventory. Add your first item above!' : 'इन्वेंटरी में कोई आइटम नहीं। ऊपर अपना पहला आइटम जोड़ें!'}
                </td>
            </tr>
        `;
        return;
    }
    
    inventory.forEach(item => {
        const status = getStockStatus(item.quantity);
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors';
        
        row.innerHTML = `
            <td class="table-cell font-medium">${item.name}</td>
            <td class="table-cell">${item.quantity} ${item.unit}</td>
            <td class="table-cell">${item.unit}</td>
            <td class="table-cell">₹${item.price}</td>
            <td class="table-cell">
                <span class="status-badge status-${status}">
                    ${getStatusText(status)}
                </span>
            </td>
            <td class="table-cell">
                <div class="flex space-x-2">
                    <button onclick="editInventoryItem(${item.id})" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteInventoryItem(${item.id})" class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function getStockStatus(quantity) {
    if (quantity <= 2) return 'low';
    if (quantity <= 5) return 'medium';
    return 'high';
}

function getStatusText(status) {
    const statusMap = {
        high: { en: 'High', hi: 'उच्च' },
        medium: { en: 'Medium', hi: 'मध्यम' },
        low: { en: 'Low', hi: 'कम' }
    };
    return statusMap[status][currentLanguage];
}

function updateAnalytics() {
    const totalItems = inventory.length;
    const lowStockItems = inventory.filter(item => getStockStatus(item.quantity) === 'low').length;
    const estimatedCost = inventory
        .filter(item => getStockStatus(item.quantity) === 'low')
        .reduce((total, item) => total + (item.price * 5), 0);
    
    const totalItemsEl = document.getElementById('totalItems');
    const lowStockItemsEl = document.getElementById('lowStockItems');
    const estimatedCostEl = document.getElementById('estimatedCost');
    
    if (totalItemsEl) totalItemsEl.textContent = totalItems;
    if (lowStockItemsEl) lowStockItemsEl.textContent = lowStockItems;
    if (estimatedCostEl) estimatedCostEl.textContent = `₹${estimatedCost.toFixed(0)}`;
}

function checkLowStock() {
    const lowStockItems = inventory.filter(item => getStockStatus(item.quantity) === 'low');
    
    if (lowStockItems.length > 0) {
        const message = currentLanguage === 'en' 
            ? `You have ${lowStockItems.length} items running low on stock!` 
            : `आपके पास ${lowStockItems.length} आइटम स्टॉक में कम हैं!`;
        
        showToast('warning', message);
    }
}

// Supplier Management
function renderSuppliers() {
    const grid = document.getElementById('suppliersGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    filteredSuppliers.forEach(supplier => {
        const card = createSupplierCard(supplier);
        grid.appendChild(card);
    });
}

function createSupplierCard(supplier) {
    const card = document.createElement('div');
    card.className = 'supplier-card';
    
    const category = categoryInfo[supplier.category];
    
    card.innerHTML = `
        <div class="supplier-image">
            <span class="text-6xl">${supplier.image}</span>
        </div>
        <div class="p-6">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">${supplier.name}</h3>
                <span class="text-sm text-gray-500 dark:text-gray-400">⭐ ${supplier.rating}</span>
            </div>
            
            <div class="flex items-center space-x-2 mb-3">
                <span class="category-icon category-${supplier.category}">${category.icon}</span>
                <span class="text-sm text-gray-600 dark:text-gray-300">${category.name[currentLanguage]}</span>
            </div>
            
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">${supplier.description}</p>
            
            <div class="space-y-2 mb-4">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-500 dark:text-gray-400">${currentLanguage === 'en' ? 'Location' : 'स्थान'}:</span>
                    <span class="text-gray-900 dark:text-white">${supplier.location}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-500 dark:text-gray-400">${currentLanguage === 'en' ? 'Min Order' : 'न्यूनतम ऑर्डर'}:</span>
                    <span class="text-gray-900 dark:text-white">${supplier.minOrder}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-500 dark:text-gray-400">${currentLanguage === 'en' ? 'Delivery' : 'डिलीवरी'}:</span>
                    <span class="text-gray-900 dark:text-white">${supplier.deliveryTime}</span>
                </div>
            </div>
            
            <div class="flex space-x-2">
                <button onclick="contactSupplier('${supplier.whatsapp}', 'whatsapp')" class="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                    <i class="fab fa-whatsapp mr-2"></i>
                    ${currentLanguage === 'en' ? 'WhatsApp' : 'व्हाट्सऐप'}
                </button>
                <button onclick="contactSupplier('${supplier.phone}', 'call')" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                    <i class="fas fa-phone mr-2"></i>
                    ${currentLanguage === 'en' ? 'Call' : 'कॉल'}
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function filterSuppliers() {
    const searchTerm = document.getElementById('supplierSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    filteredSuppliers = suppliersData.filter(supplier => {
        const matchesSearch = supplier.name.toLowerCase().includes(searchTerm) ||
                            supplier.location.toLowerCase().includes(searchTerm) ||
                            supplier.products.some(product => product.toLowerCase().includes(searchTerm));
        
        const matchesCategory = !categoryFilter || supplier.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });
    
    renderSuppliers();
}

function clearSupplierFilters() {
    document.getElementById('supplierSearch').value = '';
    document.getElementById('categoryFilter').value = '';
    filteredSuppliers = [...suppliersData];
    renderSuppliers();
}

function contactSupplier(contact, method) {
    if (method === 'whatsapp') {
        const message = currentLanguage === 'en' 
            ? 'Hi! I found you on TrustCart and would like to place an order.' 
            : 'नमस्ते! मैंने आपको ट्रस्टकार्ट पर पाया और मैं ऑर्डर देना चाहता हूं।';
        const url = `https://wa.me/${contact.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    } else {
        window.open(`tel:${contact}`, '_blank');
    }
}

// Voice Input Feature (Optional)
function initializeVoiceInput() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = currentLanguage === 'en' ? 'en-US' : 'hi-IN';
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('itemName').value = transcript;
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
        };
        
        return recognition;
    }
    return null;
}

// Toast Notifications
function showToast(type, message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    
    toast.className = `toast ${type} animate-slide-in`;
    toast.innerHTML = `
        <div class="flex items-center">
            <div class="flex-shrink-0">
                ${getToastIcon(type)}
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium text-gray-900 dark:text-white">${message}</p>
            </div>
            <div class="ml-auto pl-3">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

function getToastIcon(type) {
    const icons = {
        success: '<i class="fas fa-check-circle text-green-500"></i>',
        warning: '<i class="fas fa-exclamation-triangle text-yellow-500"></i>',
        error: '<i class="fas fa-times-circle text-red-500"></i>',
        info: '<i class="fas fa-info-circle text-blue-500"></i>'
    };
    return icons[type] || icons.info;
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString(currentLanguage === 'en' ? 'en-IN' : 'hi-IN');
}

// Export functions for global access
window.showSection = showSection;
window.editInventoryItem = editInventoryItem;
window.deleteInventoryItem = deleteInventoryItem;
window.closeEditModal = closeEditModal;
window.contactSupplier = contactSupplier;
window.filterSuppliers = filterSuppliers;
window.clearSupplierFilters = clearSupplierFilters; 