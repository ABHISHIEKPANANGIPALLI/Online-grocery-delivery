import { ShoppingCart, User, LogOut, Search, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product, User as UserType } from '../App';

type HomePageProps = {
  onNavigateToCategory: (category: string) => void;
  onNavigateToProduct: (product: Product) => void;
  onNavigateToCart: () => void;
  onNavigateToLogin: () => void;
  onNavigateToSupport: () => void;
  onNavigateToAdmin: () => void;
  user: UserType | null;
  cartCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLogout: () => void;
};

const categories = [
  { name: 'Fruits', icon: '🍎', color: 'bg-red-100' },
  { name: 'Vegetables', icon: '🥕', color: 'bg-green-100' },
  { name: 'Dairy', icon: '🥛', color: 'bg-blue-100' },
  { name: 'Snacks', icon: '🍿', color: 'bg-yellow-100' },
];

const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Fresh Apples',
    price: 120,
    image: 'https://images.unsplash.com/photo-1623815242959-fb20354f9b8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGFwcGxlJTIwZnJ1aXR8ZW58MXx8fHwxNzYxNzI5OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fruits',
    description: 'Fresh and crispy red apples',
    nutritionalInfo: 'Calories: 52 per 100g, Vitamin C: 14%',
    rating: 4.5,
    discount: 10,
  },
  {
    id: 2,
    name: 'Fresh Bananas',
    price: 40,
    image: 'https://images.unsplash.com/photo-1573828235229-fb27fdc8da91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJhbmFuYSUyMGZydWl0fGVufDF8fHx8MTc2MTY2MTE0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fruits',
    description: 'Sweet and ripe bananas',
    nutritionalInfo: 'Calories: 89 per 100g, Potassium: 8%',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Fresh Tomatoes',
    price: 30,
    image: 'https://images.unsplash.com/photo-1586640167802-8af12bf651fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHRvbWF0byUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjE2NDA1MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vegetables',
    description: 'Fresh red tomatoes',
    nutritionalInfo: 'Calories: 18 per 100g, Vitamin C: 21%',
    rating: 4.3,
    discount: 15,
  },
  {
    id: 4,
    name: 'Dairy Milk',
    price: 60,
    image: 'https://images.unsplash.com/photo-1635714293982-65445548ac42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBwcm9kdWN0c3xlbnwxfHx8fDE3NjE2NzE0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Dairy',
    description: 'Fresh dairy products',
    nutritionalInfo: 'Calories: 42 per 100ml, Calcium: 12%',
    rating: 4.8,
  },
];

export function HomePage({
  onNavigateToCategory,
  onNavigateToProduct,
  onNavigateToCart,
  onNavigateToLogin,
  onNavigateToSupport,
  onNavigateToAdmin,
  user,
  cartCount,
  searchQuery,
  onSearchChange,
  onLogout,
}: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-8 h-8 text-green-600" />
              <h1 className="text-green-600">FreshMart</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onNavigateToSupport}>
                <Phone className="w-4 h-4 mr-2" />
                Support
              </Button>
              
              {user ? (
                <>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={onLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onNavigateToAdmin}>
                    Admin
                  </Button>
                </>
              ) : (
                <Button variant="default" size="sm" onClick={onNavigateToLogin}>
                  Login
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                className="relative"
                onClick={onNavigateToCart}
              >
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for products, categories, or brands..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative h-80 bg-gradient-to-r from-green-500 to-green-700">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1628627686733-c60e52674282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwZGVsaXZlcnklMjBmcmVzaCUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzYxNzM2MTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Grocery Shopping"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="mb-4">Fresh Groceries Delivered to Your Doorstep</h2>
            <p className="mb-6">Get up to 50% off on your first order!</p>
            <Button size="lg" variant="secondary">
              Shop Now
            </Button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onNavigateToCategory(category.name)}
              className={`${category.color} p-6 rounded-lg hover:shadow-lg transition-shadow`}
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <h3>{category.name}</h3>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-12 bg-gray-50">
        <h2 className="mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
              onClick={() => onNavigateToProduct(product)}
            >
              <div className="relative">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.discount && (
                  <Badge className="absolute top-2 right-2 bg-red-500">
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>
              <div className="p-4">
                <h3>{product.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-green-600">₹{product.price}</span>
                  {product.discount && (
                    <span className="text-gray-400 line-through">
                      ₹{Math.round(product.price / (1 - product.discount / 100))}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-yellow-500">★</span>
                  <span>{product.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offers Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="mb-6">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-8 rounded-lg text-white">
            <h3 className="mb-2">Weekend Special</h3>
            <p className="mb-4">Get 30% off on all fruits and vegetables</p>
            <Button variant="secondary">Shop Now</Button>
          </div>
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-8 rounded-lg text-white">
            <h3 className="mb-2">Free Delivery</h3>
            <p className="mb-4">On orders above ₹500</p>
            <Button variant="secondary">Order Now</Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="mb-4">About FreshMart</h3>
              <p>Your trusted online grocery delivery partner. Fresh products delivered to your doorstep.</p>
            </div>
            <div>
              <h3 className="mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-green-400">About Us</a></li>
                <li><a href="#" className="hover:text-green-400">Contact</a></li>
                <li><a href="#" className="hover:text-green-400">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-green-400">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Contact Us</h3>
              <p>Email: support@freshmart.com</p>
              <p>Phone: 1800-123-4567</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
