import { ArrowLeft, Minus, Plus, Trash2, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { CartItem, User as UserType } from '../App';

type ShoppingCartProps = {
  cart: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
  user: UserType | null;
  onLogout: () => void;
};

export function ShoppingCart({
  cart,
  onUpdateQuantity,
  onCheckout,
  onContinueShopping,
  user,
  onLogout,
}: ShoppingCartProps) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryCharge;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onContinueShopping}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1>Shopping Cart</h1>
            </div>
            
            {user && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items to get started!</p>
            <Button onClick={onContinueShopping}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white border rounded-lg p-4">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3>{item.name}</h3>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-green-600">₹{item.price}</span>
                      {item.discount && (
                        <span className="text-gray-400 line-through">
                          ₹{Math.round(item.price / (1 - item.discount / 100))}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.id, 0)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-green-600">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border rounded-lg p-6 sticky top-24">
                <h2 className="mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span className={deliveryCharge === 0 ? 'text-green-600' : ''}>
                      {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  {subtotal < 500 && (
                    <p className="text-green-600">
                      Add ₹{500 - subtotal} more for free delivery!
                    </p>
                  )}
                  <div className="border-t pt-3 flex justify-between">
                    <span>Total</span>
                    <span className="text-green-600">₹{total}</span>
                  </div>
                </div>

                <Button 
                  className="w-full"
                  size="lg"
                  onClick={onCheckout}
                >
                  Proceed to Checkout
                </Button>

                <Button 
                  variant="outline"
                  className="w-full mt-3"
                  onClick={onContinueShopping}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
