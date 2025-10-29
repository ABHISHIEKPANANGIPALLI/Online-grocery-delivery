import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { ProductListingPage } from './components/ProductListingPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ShoppingCart } from './components/ShoppingCart';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderTracking } from './components/OrderTracking';
import { LoginSignup } from './components/LoginSignup';
import { AdminPanel } from './components/AdminPanel';
import { CustomerSupport } from './components/CustomerSupport';

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  nutritionalInfo: string;
  rating: number;
  discount?: number;
};

export type CartItem = Product & { quantity: number };

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  deliveryAddress: string;
  paymentMethod: string;
  date: Date;
};

export type User = {
  email: string;
  name: string;
  phone: string;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const placeOrder = (deliveryAddress: string, paymentMethod: string) => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 40; // 40 delivery charge
    const order: Order = {
      id: `ORD${Date.now()}`,
      items: [...cart],
      total,
      status: 'pending',
      deliveryAddress,
      paymentMethod,
      date: new Date(),
    };
    setOrders([...orders, order]);
    setCart([]);
    setCurrentPage('orderTracking');
  };

  const handleLogin = (email: string, password: string) => {
    // Mock login
    setUser({ email, name: 'John Doe', phone: '9876543210' });
    setCurrentPage('home');
  };

  const handleSignup = (email: string, password: string, name: string, phone: string) => {
    // Mock signup
    setUser({ email, name, phone });
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setCurrentPage('home');
  };

  const navigateToCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('productListing');
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('productDetail');
  };

  const navigateBack = () => {
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'home' && (
        <HomePage 
          onNavigateToCategory={navigateToCategory}
          onNavigateToProduct={navigateToProduct}
          onNavigateToCart={() => setCurrentPage('cart')}
          onNavigateToLogin={() => setCurrentPage('login')}
          onNavigateToSupport={() => setCurrentPage('support')}
          onNavigateToAdmin={() => setCurrentPage('admin')}
          user={user}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'productListing' && (
        <ProductListingPage 
          category={selectedCategory}
          onNavigateToProduct={navigateToProduct}
          onNavigateToCart={() => setCurrentPage('cart')}
          onAddToCart={addToCart}
          user={user}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          onBack={navigateBack}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'productDetail' && selectedProduct && (
        <ProductDetailPage 
          product={selectedProduct}
          onAddToCart={addToCart}
          onNavigateToCart={() => setCurrentPage('cart')}
          onBack={() => setCurrentPage('productListing')}
          user={user}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'cart' && (
        <ShoppingCart 
          cart={cart}
          onUpdateQuantity={updateCartQuantity}
          onCheckout={() => setCurrentPage('checkout')}
          onContinueShopping={() => setCurrentPage('home')}
          user={user}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'checkout' && (
        <CheckoutPage 
          cart={cart}
          onPlaceOrder={placeOrder}
          onBack={() => setCurrentPage('cart')}
          user={user}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'orderTracking' && (
        <OrderTracking 
          orders={orders}
          onBack={() => setCurrentPage('home')}
          user={user}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'login' && (
        <LoginSignup 
          onLogin={handleLogin}
          onSignup={handleSignup}
          onBack={() => setCurrentPage('home')}
        />
      )}
      
      {currentPage === 'admin' && (
        <AdminPanel 
          orders={orders}
          onBack={() => setCurrentPage('home')}
          user={user}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'support' && (
        <CustomerSupport 
          onBack={() => setCurrentPage('home')}
          user={user}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
