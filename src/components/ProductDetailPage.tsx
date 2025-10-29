import { ArrowLeft, ShoppingCart, User, LogOut, Star, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product, User as UserType } from '../App';

type ProductDetailPageProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
  onNavigateToCart: () => void;
  onBack: () => void;
  user: UserType | null;
  cartCount: number;
  onLogout: () => void;
};

export function ProductDetailPage({
  product,
  onAddToCart,
  onNavigateToCart,
  onBack,
  user,
  cartCount,
  onLogout,
}: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h3>Product Details</h3>
            </div>
            
            <div className="flex items-center gap-3">
              {user && (
                <>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={onLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
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
        </div>
      </header>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            {product.discount && (
              <Badge className="absolute top-4 right-4 bg-red-500 text-lg px-4 py-2">
                {product.discount}% OFF
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span>{product.rating} Rating</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-green-600">₹{product.price}</span>
              {product.discount && (
                <span className="text-gray-400 line-through">
                  ₹{Math.round(product.price / (1 - product.discount / 100))}
                </span>
              )}
              {product.discount && (
                <Badge variant="secondary">Save {product.discount}%</Badge>
              )}
            </div>

            <div className="mb-6">
              <h3 className="mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="mb-2">Nutritional Information</h3>
              <p className="text-gray-700">{product.nutritionalInfo}</p>
            </div>

            <div className="mb-6">
              <h3 className="mb-2">Category</h3>
              <Badge variant="outline">{product.category}</Badge>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="mb-2">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-3">
              <Button 
                className="flex-1"
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={onNavigateToCart}
              >
                View Cart
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Free delivery on orders above ₹500</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Fresh products guaranteed</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Easy returns within 24 hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
