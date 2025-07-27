# 🛒 TrustCart - Street Food Vendor Management System

A beautiful, modern, and fully deployable web application designed to help street food vendors manage raw material inventory and connect with nearby suppliers easily.

## 🌟 Features

### ✅ Core Features
- **Landing Page**: Modern hero section with TrustCart branding and mission statement
- **Inventory Dashboard**: Add, edit, delete raw material items with real-time tracking
- **Supplier Marketplace**: Connect with verified suppliers in your area
- **Language Toggle**: Switch between English and Hindi seamlessly
- **Dark Mode**: Toggle between light and dark themes
- **Mobile Responsive**: Optimized for all device sizes

### 📊 Inventory Management
- Dynamic table with color-coded quantity status (Green/Yellow/Red)
- Low-stock alerts with toast notifications
- Analytics cards showing total items, low stock count, and estimated restock cost
- Local storage for data persistence
- Real-time updates and calculations

### 🤝 Supplier Marketplace
- 12+ mock suppliers with detailed information
- Filter by category and search functionality
- Direct WhatsApp and phone contact integration
- Supplier ratings and delivery information
- Beautiful supplier cards with category icons

### 🎨 UI/UX Features
- Modern gradient design with smooth animations
- Responsive navigation with mobile menu
- Toast notifications for user feedback
- Hover effects and smooth transitions
- Professional color scheme and typography

## 🚀 Quick Start

### Option 1: Direct File Opening
1. Download all project files
2. Open `index.html` in your web browser
3. Start using TrustCart immediately!

### Option 2: Local Server (Recommended)
1. **Using Python**:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

2. **Using Node.js**:
   ```bash
   # Install a simple server globally
   npm install -g http-server
   
   # Run the server
   http-server -p 8000
   ```

3. Open your browser and navigate to `http://localhost:8000`

### Option 3: Live Server (VS Code)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📁 Project Structure

```
TrustCart/
├── index.html              # Main HTML file
├── styles.css              # Custom CSS styles
├── js/
│   └── app.js             # Main JavaScript application
├── data/
│   └── suppliers.js       # Mock supplier data
└── README.md              # This file
```

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Inter)
- **Storage**: LocalStorage API
- **Animations**: CSS3 Animations & Transitions

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎯 Use Cases

### For Street Food Vendors:
- Track raw material inventory in real-time
- Get alerts when stock is running low
- Find and connect with local suppliers
- Manage costs and plan restocking
- Access from any device, anywhere

### For Suppliers:
- Showcase products and services
- Receive direct inquiries from vendors
- Build trust through ratings and reviews
- Expand customer base through digital presence

## 🔧 Customization

### Adding New Suppliers
Edit `data/suppliers.js` to add new suppliers:
```javascript
{
    id: 13,
    name: "Your Supplier Name",
    category: "vegetables", // vegetables, fruits, meat, dairy, grains, spices
    location: "Your Location",
    rating: 4.5,
    phone: "+91-XXXXXXXXXX",
    whatsapp: "+91-XXXXXXXXXX",
    products: ["Product 1", "Product 2"],
    minOrder: "₹XXX",
    deliveryTime: "X hours",
    image: "🍅",
    description: "Your description"
}
```

### Modifying Categories
Update the `categoryInfo` object in `data/suppliers.js` to add new categories or modify existing ones.

### Styling Changes
- Main styles are in `styles.css`
- Uses Tailwind CSS utility classes
- Dark mode styles are included
- Responsive breakpoints are defined

## 🌐 Deployment Options

### 1. GitHub Pages (Free)
1. Create a new GitHub repository
2. Upload all project files
3. Go to Settings > Pages
4. Select source branch (usually `main`)
5. Your site will be available at `https://username.github.io/repository-name`

### 2. Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Your site will be deployed instantly
4. Get a custom domain option

### 3. Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Deploy automatically on every push
4. Get custom domain and SSL

### 4. Firebase Hosting (Free)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize project: `firebase init hosting`
3. Deploy: `firebase deploy`

## 📊 Sample Data

The application comes with 12 pre-loaded suppliers across 6 categories:
- **Vegetables**: Fresh Valley Vegetables, Green Basket
- **Fruits**: Sweet Orchard Fruits, Tropical Fruits Hub
- **Meat & Fish**: Ocean Fresh Seafood, Premium Poultry
- **Dairy**: Dairy Delights, Artisan Dairy
- **Grains**: Golden Grains Co., Organic Grains
- **Spices**: Spice Paradise, Royal Spices

## 🔒 Privacy & Security

- All data is stored locally in your browser
- No external API calls or data transmission
- No user accounts or personal data collection
- Supplier contact information is mock data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:
1. Check browser console for errors
2. Ensure all files are in the correct directory structure
3. Try using a local server instead of file:// protocol
4. Check browser compatibility

## 🎉 Acknowledgments

- **Tailwind CSS** for the utility-first CSS framework
- **Font Awesome** for the beautiful icons
- **Google Fonts** for the Inter font family
- **Street Food Vendors** for the inspiration and real-world use case

---

**Built with ❤️ for street food heroes everywhere!**

*TrustCart - Simplifying supply for street food heroes* 