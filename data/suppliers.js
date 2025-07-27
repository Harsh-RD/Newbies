// Mock Suppliers Data for TrustCart
const suppliersData = [
    {
        id: 1,
        name: "Fresh Valley Vegetables",
        category: "vegetables",
        location: "Mumbai Central",
        rating: 4.8,
        phone: "+91-98765-43210",
        whatsapp: "+91-98765-43210",
        products: ["Tomatoes", "Onions", "Potatoes", "Carrots", "Cabbage"],
        minOrder: "₹500",
        deliveryTime: "2-3 hours",
        image: "🥬",
        description: "Fresh vegetables sourced directly from local farms"
    },
    {
        id: 2,
        name: "Sweet Orchard Fruits",
        category: "fruits",
        location: "Andheri West",
        rating: 4.6,
        phone: "+91-98765-43211",
        whatsapp: "+91-98765-43211",
        products: ["Apples", "Bananas", "Oranges", "Mangoes", "Grapes"],
        minOrder: "₹300",
        deliveryTime: "1-2 hours",
        image: "🍎",
        description: "Premium quality fruits delivered fresh daily"
    },
    {
        id: 3,
        name: "Ocean Fresh Seafood",
        category: "meat",
        location: "Colaba",
        rating: 4.9,
        phone: "+91-98765-43212",
        whatsapp: "+91-98765-43212",
        products: ["Fish", "Prawns", "Crab", "Chicken", "Mutton"],
        minOrder: "₹800",
        deliveryTime: "3-4 hours",
        image: "🐟",
        description: "Fresh seafood and meat from trusted suppliers"
    },
    {
        id: 4,
        name: "Dairy Delights",
        category: "dairy",
        location: "Bandra West",
        rating: 4.7,
        phone: "+91-98765-43213",
        whatsapp: "+91-98765-43213",
        products: ["Milk", "Curd", "Butter", "Cheese", "Paneer"],
        minOrder: "₹200",
        deliveryTime: "1 hour",
        image: "🥛",
        description: "Pure dairy products from local farms"
    },
    {
        id: 5,
        name: "Golden Grains Co.",
        category: "grains",
        location: "Dadar",
        rating: 4.5,
        phone: "+91-98765-43214",
        whatsapp: "+91-98765-43214",
        products: ["Rice", "Wheat", "Pulses", "Flour", "Sugar"],
        minOrder: "₹400",
        deliveryTime: "2-3 hours",
        image: "🌾",
        description: "Quality grains and staples for your kitchen"
    },
    {
        id: 6,
        name: "Spice Paradise",
        category: "spices",
        location: "Grant Road",
        rating: 4.8,
        phone: "+91-98765-43215",
        whatsapp: "+91-98765-43215",
        products: ["Turmeric", "Chili Powder", "Garam Masala", "Cumin", "Coriander"],
        minOrder: "₹150",
        deliveryTime: "1-2 hours",
        image: "🌶️",
        description: "Authentic spices for authentic taste"
    },
    {
        id: 7,
        name: "Green Basket",
        category: "vegetables",
        location: "Vile Parle",
        rating: 4.4,
        phone: "+91-98765-43216",
        whatsapp: "+91-98765-43216",
        products: ["Spinach", "Lettuce", "Cucumber", "Bell Peppers", "Broccoli"],
        minOrder: "₹350",
        deliveryTime: "2 hours",
        image: "🥬",
        description: "Organic vegetables for health-conscious customers"
    },
    {
        id: 8,
        name: "Tropical Fruits Hub",
        category: "fruits",
        location: "Juhu",
        rating: 4.6,
        phone: "+91-98765-43217",
        whatsapp: "+91-98765-43217",
        products: ["Pineapple", "Papaya", "Guava", "Watermelon", "Muskmelon"],
        minOrder: "₹250",
        deliveryTime: "1-2 hours",
        image: "🍍",
        description: "Exotic and seasonal fruits available"
    },
    {
        id: 9,
        name: "Premium Poultry",
        category: "meat",
        location: "Kurla",
        rating: 4.7,
        phone: "+91-98765-43218",
        whatsapp: "+91-98765-43218",
        products: ["Chicken", "Eggs", "Turkey", "Duck", "Quail"],
        minOrder: "₹600",
        deliveryTime: "2-3 hours",
        image: "🐔",
        description: "Fresh poultry products from certified farms"
    },
    {
        id: 10,
        name: "Artisan Dairy",
        category: "dairy",
        location: "Worli",
        rating: 4.9,
        phone: "+91-98765-43219",
        whatsapp: "+91-98765-43219",
        products: ["Ghee", "Cream", "Yogurt", "Buttermilk", "Cottage Cheese"],
        minOrder: "₹300",
        deliveryTime: "1 hour",
        image: "🧈",
        description: "Traditional dairy products made with care"
    },
    {
        id: 11,
        name: "Organic Grains",
        category: "grains",
        location: "Thane",
        rating: 4.6,
        phone: "+91-98765-43220",
        whatsapp: "+91-98765-43220",
        products: ["Brown Rice", "Quinoa", "Oats", "Millets", "Organic Wheat"],
        minOrder: "₹500",
        deliveryTime: "3-4 hours",
        image: "🌾",
        description: "Organic and healthy grain options"
    },
    {
        id: 12,
        name: "Royal Spices",
        category: "spices",
        location: "Byculla",
        rating: 4.8,
        phone: "+91-98765-43221",
        whatsapp: "+91-98765-43221",
        products: ["Saffron", "Cardamom", "Cinnamon", "Nutmeg", "Black Pepper"],
        minOrder: "₹200",
        deliveryTime: "1-2 hours",
        image: "🧂",
        description: "Premium spices for gourmet cooking"
    }
];

// Category mappings for display
const categoryInfo = {
    vegetables: {
        name: { en: "Vegetables", hi: "सब्जियां" },
        icon: "🥬",
        color: "green"
    },
    fruits: {
        name: { en: "Fruits", hi: "फल" },
        icon: "🍎",
        color: "orange"
    },
    meat: {
        name: { en: "Meat & Fish", hi: "मांस और मछली" },
        icon: "🐟",
        color: "red"
    },
    dairy: {
        name: { en: "Dairy", hi: "डेयरी" },
        icon: "🥛",
        color: "blue"
    },
    grains: {
        name: { en: "Grains", hi: "अनाज" },
        icon: "🌾",
        color: "yellow"
    },
    spices: {
        name: { en: "Spices", hi: "मसाले" },
        icon: "🌶️",
        color: "purple"
    }
}; 