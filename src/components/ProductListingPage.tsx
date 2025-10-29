import { ArrowLeft, ShoppingCart, User, LogOut, Filter } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product, User as UserType } from '../App';

type ProductListingPageProps = {
  category: string;
  onNavigateToProduct: (product: Product) => void;
  onNavigateToCart: () => void;
  onAddToCart: (product: Product) => void;
  user: UserType | null;
  cartCount: number;
  onBack: () => void;
  onLogout: () => void;
};

const allProducts: Product[] = [
  // Fruits
  {
    id: 1,
    name: 'Fresh Apples',
    price: 120,
    image: 'https://images.unsplash.com/photo-1623815242959-fb20354f9b8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGFwcGxlJTIwZnJ1aXR8ZW58MXx8fHwxNzYxNzI5OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fruits',
    description: 'Fresh and crispy red apples from Himachal',
    nutritionalInfo: 'Calories: 52 per 100g, Vitamin C: 14%, Fiber: 2.4g',
    rating: 4.5,
    discount: 10,
  },
  {
    id: 2,
    name: 'Fresh Bananas',
    price: 40,
    image: 'https://images.unsplash.com/photo-1573828235229-fb27fdc8da91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJhbmFuYSUyMGZydWl0fGVufDF8fHx8MTc2MTY2MTE0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fruits',
    description: 'Sweet and ripe bananas, rich in potassium',
    nutritionalInfo: 'Calories: 89 per 100g, Potassium: 8%, Vitamin B6: 20%',
    rating: 4.7,
  },
  {
    id: 5,
    name: 'Fresh Oranges',
    price: 80,
    image: 'https://images.unsplash.com/photo-1613334728649-d3d2bcde2d29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yYW5nZSUyMGZydWl0fGVufDF8fHx8MTc2MTcxNjM5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fruits',
    description: 'Juicy oranges packed with Vitamin C',
    nutritionalInfo: 'Calories: 47 per 100g, Vitamin C: 88%, Fiber: 2.4g',
    rating: 4.6,
    discount: 5,
  },
  {
    id: 6,
    name: 'Fresh Mangoes',
    price: 150,
    image: 'https://images.unsplash.com/photo-1734163075572-8948e799e42c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1hbmdvJTIwZnJ1aXR8ZW58MXx8fHwxNzYxNjM2MTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fruits',
    description: 'Sweet and delicious Alphonso mangoes',
    nutritionalInfo: 'Calories: 60 per 100g, Vitamin A: 21%, Vitamin C: 60%',
    rating: 4.9,
    discount: 20,
  },
  {
    id: 7,
    name: 'Fresh Grapes',
    price: 100,
    image: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGdyYXBlcyUyMGZydWl0fGVufDF8fHx8MTc2MTczNTA0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fruits',
    description: 'Seedless green grapes, sweet and fresh',
    nutritionalInfo: 'Calories: 69 per 100g, Vitamin K: 18%, Potassium: 5%',
    rating: 4.4,
  },
  {
    id: 8,
    name: 'Fresh Strawberries',
    price: 200,
    image: 'https://images.unsplash.com/photo-1616690602454-882bbb363daa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN0cmF3YmVycnklMjBmcnVpdHxlbnwxfHx8fDE3NjE3MzQ3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fruits',
    description: 'Fresh and sweet strawberries',
    nutritionalInfo: 'Calories: 32 per 100g, Vitamin C: 98%, Manganese: 18%',
    rating: 4.8,
    discount: 15,
  },
  {
    id: 15,
    name: 'Fresh Watermelon',
    price: 60,
    image: 'https://images.unsplash.com/photo-1629265824943-b0a19b32c7a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHdhdGVybWVsb24lMjBmcnVpdHxlbnwxfHx8fDE3NjE3MzYxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fruits',
    description: 'Sweet and juicy watermelon, perfect for summer',
    nutritionalInfo: 'Calories: 30 per 100g, Vitamin C: 13%, Water: 92%',
    rating: 4.6,
    discount: 8,
  },
  {
    id: 16,
    name: 'Fresh Pineapple',
    price: 90,
    image: 'https://images.unsplash.com/photo-1632242342964-242876b950c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBpbmVhcHBsZSUyMGZydWl0fGVufDF8fHx8MTc2MTY2NDk1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fruits',
    description: 'Tropical pineapple, rich in enzymes',
    nutritionalInfo: 'Calories: 50 per 100g, Vitamin C: 79%, Manganese: 44%',
    rating: 4.5,
  },
  {
    id: 17,
    name: 'Fresh Kiwi',
    price: 180,
    image: 'https://images.unsplash.com/photo-1610917040803-1fccf9623064?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGtpd2klMjBmcnVpdHxlbnwxfHx8fDE3NjE3MDEyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fruits',
    description: 'Green kiwi fruits, packed with nutrients',
    nutritionalInfo: 'Calories: 61 per 100g, Vitamin C: 154%, Vitamin K: 50%',
    rating: 4.7,
    discount: 12,
  },
  {
    id: 18,
    name: 'Fresh Papaya',
    price: 50,
    image: 'https://images.unsplash.com/photo-1617694467363-039a4a7bb368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBhcGF5YSUyMGZydWl0fGVufDF8fHx8MTc2MTczNjEwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fruits',
    description: 'Sweet papaya, great for digestion',
    nutritionalInfo: 'Calories: 43 per 100g, Vitamin C: 103%, Vitamin A: 31%',
    rating: 4.4,
  },
  {
    id: 19,
    name: 'Fresh Pomegranate',
    price: 140,
    image: 'https://images.unsplash.com/photo-1709605534654-c0ef47902b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBvbWVncmFuYXRlJTIwZnJ1aXR8ZW58MXx8fHwxNzYxNzM2MTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fruits',
    description: 'Ruby red pomegranate seeds, antioxidant-rich',
    nutritionalInfo: 'Calories: 83 per 100g, Vitamin C: 17%, Fiber: 4g',
    rating: 4.8,
    discount: 10,
  },
  
  // Vegetables
  {
    id: 3,
    name: 'Fresh Tomatoes',
    price: 30,
    image: 'https://images.unsplash.com/photo-1586640167802-8af12bf651fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHRvbWF0byUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjE2NDA1MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vegetables',
    description: 'Fresh red tomatoes, perfect for salads',
    nutritionalInfo: 'Calories: 18 per 100g, Vitamin C: 21%, Lycopene: High',
    rating: 4.3,
    discount: 15,
  },
  {
    id: 9,
    name: 'Fresh Potatoes',
    price: 25,
    image: 'https://images.unsplash.com/photo-1683511997653-6be0fc990ec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBvdGF0byUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjE2NDE1Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vegetables',
    description: 'Farm fresh potatoes',
    nutritionalInfo: 'Calories: 77 per 100g, Vitamin C: 32%, Potassium: 10%',
    rating: 4.5,
  },
  {
    id: 10,
    name: 'Fresh Carrots',
    price: 35,
    image: 'https://images.unsplash.com/photo-1603462903957-566630607cc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNhcnJvdCUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjE2NDE1Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vegetables',
    description: 'Crunchy orange carrots, rich in beta-carotene',
    nutritionalInfo: 'Calories: 41 per 100g, Vitamin A: 334%, Fiber: 2.8g',
    rating: 4.6,
  },
  {
    id: 11,
    name: 'Fresh Onions',
    price: 20,
    image: 'https://images.unsplash.com/photo-1628793561336-5e90cb873032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9uaW9uJTIwdmVnZXRhYmxlfGVufDF8fHx8MTc2MTY0MTUzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vegetables',
    description: 'Fresh red onions for your kitchen',
    nutritionalInfo: 'Calories: 40 per 100g, Vitamin C: 12%, Fiber: 1.7g',
    rating: 4.2,
    discount: 10,
  },
  {
    id: 12,
    name: 'Fresh Broccoli',
    price: 60,
    image: 'https://images.unsplash.com/photo-1757332334626-8dadb145540d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJyb2Njb2xpJTIwdmVnZXRhYmxlfGVufDF8fHx8MTc2MTcxNTQzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vegetables',
    description: 'Fresh green broccoli, nutrient-rich',
    nutritionalInfo: 'Calories: 34 per 100g, Vitamin C: 149%, Vitamin K: 127%',
    rating: 4.7,
  },
  {
    id: 13,
    name: 'Fresh Spinach',
    price: 15,
    image: 'https://images.unsplash.com/photo-1634731201932-9bd92839bea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNwaW5hY2glMjB2ZWdldGFibGV8ZW58MXx8fHwxNzYxNjE2NDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vegetables',
    description: 'Fresh leafy spinach',
    nutritionalInfo: 'Calories: 23 per 100g, Iron: 15%, Vitamin A: 56%',
    rating: 4.4,
  },
  {
    id: 20,
    name: 'Fresh Cucumber',
    price: 20,
    image: 'https://images.unsplash.com/photo-1560433802-62c9db426a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGN1Y3VtYmVyJTIwdmVnZXRhYmxlfGVufDF8fHx8MTc2MTczNjEwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vegetables',
    description: 'Cool and refreshing cucumbers',
    nutritionalInfo: 'Calories: 15 per 100g, Vitamin K: 19%, Water: 95%',
    rating: 4.3,
  },
  {
    id: 21,
    name: 'Fresh Bell Peppers',
    price: 55,
    image: 'https://images.unsplash.com/photo-1741515042519-9b52d3ec2eaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJlbGwlMjBwZXBwZXIlMjBjYXBzaWN1bXxlbnwxfHx8fDE3NjE3MzYxMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vegetables',
    description: 'Colorful bell peppers, rich in vitamins',
    nutritionalInfo: 'Calories: 31 per 100g, Vitamin C: 213%, Vitamin A: 63%',
    rating: 4.6,
    discount: 8,
  },
  {
    id: 22,
    name: 'Fresh Cauliflower',
    price: 40,
    image: 'https://images.unsplash.com/photo-1613743983303-b3e89f8a2b80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNhdWxpZmxvd2VyJTIwdmVnZXRhYmxlfGVufDF8fHx8MTc2MTczNjEwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vegetables',
    description: 'White cauliflower, versatile vegetable',
    nutritionalInfo: 'Calories: 25 per 100g, Vitamin C: 77%, Fiber: 2g',
    rating: 4.4,
  },
  {
    id: 23,
    name: 'Fresh Cabbage',
    price: 18,
    image: 'https://images.unsplash.com/photo-1587096677895-52478b441d9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNhYmJhZ2UlMjB2ZWdldGFibGV8ZW58MXx8fHwxNzYxNjQxNTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vegetables',
    description: 'Fresh green cabbage, great for salads',
    nutritionalInfo: 'Calories: 25 per 100g, Vitamin C: 61%, Vitamin K: 85%',
    rating: 4.2,
  },
  {
    id: 24,
    name: 'Fresh Green Peas',
    price: 45,
    image: 'https://images.unsplash.com/photo-1619186687343-d606d9d5f9d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGdyZWVuJTIwcGVhc3xlbnwxfHx8fDE3NjE3MzYxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vegetables',
    description: 'Sweet green peas, protein-rich',
    nutritionalInfo: 'Calories: 81 per 100g, Protein: 5.4g, Fiber: 5.7g',
    rating: 4.5,
    discount: 10,
  },
  {
    id: 25,
    name: 'Fresh Green Beans',
    price: 38,
    image: 'https://images.unsplash.com/photo-1605712775989-26693f8f28f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJlYW5zJTIwdmVnZXRhYmxlfGVufDF8fHx8MTc2MTczNjExMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Vegetables',
    description: 'Crispy green beans, healthy vegetable',
    nutritionalInfo: 'Calories: 31 per 100g, Vitamin C: 21%, Fiber: 2.7g',
    rating: 4.3,
  },
  
  // Dairy
  {
    id: 4,
    name: 'Dairy Milk',
    price: 60,
    image: 'https://images.unsplash.com/photo-1635714293982-65445548ac42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBwcm9kdWN0c3xlbnwxfHx8fDE3NjE2NzE0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Dairy',
    description: 'Fresh full-cream milk',
    nutritionalInfo: 'Calories: 61 per 100ml, Calcium: 12%, Protein: 3.2g',
    rating: 4.8,
  },
  {
    id: 26,
    name: 'Cheddar Cheese',
    price: 200,
    image: 'https://images.unsplash.com/photo-1757857755327-5b38c51a0302?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVlc2UlMjBibG9jayUyMGRhaXJ5fGVufDF8fHx8MTc2MTcwMDc1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Dairy',
    description: 'Premium cheddar cheese block',
    nutritionalInfo: 'Calories: 402 per 100g, Protein: 25g, Calcium: 72%',
    rating: 4.7,
    discount: 15,
  },
  {
    id: 27,
    name: 'Greek Yogurt',
    price: 80,
    image: 'https://images.unsplash.com/photo-1581868164904-77b124b80242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2d1cnQlMjBjdXJkJTIwZGFpcnl8ZW58MXx8fHwxNzYxNzM2MTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Dairy',
    description: 'Thick and creamy Greek yogurt',
    nutritionalInfo: 'Calories: 59 per 100g, Protein: 10g, Calcium: 11%',
    rating: 4.9,
  },
  {
    id: 28,
    name: 'Butter Block',
    price: 120,
    image: 'https://images.unsplash.com/photo-1686998424991-201e0c94f6a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXIlMjBkYWlyeSUyMHByb2R1Y3R8ZW58MXx8fHwxNzYxNzM2MTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Dairy',
    description: 'Pure dairy butter',
    nutritionalInfo: 'Calories: 717 per 100g, Fat: 81g, Vitamin A: 68%',
    rating: 4.6,
    discount: 10,
  },
  {
    id: 29,
    name: 'Fresh Paneer',
    price: 90,
    image: 'https://images.unsplash.com/photo-1733907557463-915a34237e8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lZXIlMjBjb3R0YWdlJTIwY2hlZXNlfGVufDF8fHx8MTc2MTczNjExMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Dairy',
    description: 'Fresh cottage cheese (paneer)',
    nutritionalInfo: 'Calories: 265 per 100g, Protein: 18g, Calcium: 20%',
    rating: 4.8,
  },
  {
    id: 30,
    name: 'Fresh Cream',
    price: 70,
    image: 'https://images.unsplash.com/photo-1633952274330-08186e028447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhbSUyMGRhaXJ5JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjE3MzYxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Dairy',
    description: 'Rich dairy cream for cooking',
    nutritionalInfo: 'Calories: 340 per 100ml, Fat: 37g, Calcium: 8%',
    rating: 4.7,
  },
  
  // Snacks
  {
    id: 14,
    name: 'Potato Chips',
    price: 50,
    image: 'https://images.unsplash.com/photo-1665781040848-ae2a4923d0a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFja3MlMjBjaGlwcyUyMGZvb2R8ZW58MXx8fHwxNzYxNzEyNzEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Snacks',
    description: 'Crispy and delicious potato chips',
    nutritionalInfo: 'Calories: 536 per 100g, Fat: 34g, Carbs: 52g',
    rating: 4.5,
    discount: 12,
  },
  {
    id: 31,
    name: 'Chocolate Cookies',
    price: 45,
    image: 'https://images.unsplash.com/photo-1657021717831-73211ff92daf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raWVzJTIwYmlzY3VpdHMlMjBzbmFja3xlbnwxfHx8fDE3NjE3MzYxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Snacks',
    description: 'Delicious chocolate chip cookies',
    nutritionalInfo: 'Calories: 502 per 100g, Fat: 24g, Sugar: 36g',
    rating: 4.6,
    discount: 8,
  },
  {
    id: 32,
    name: 'Namkeen Mix',
    price: 35,
    image: 'https://images.unsplash.com/photo-1760047550367-3d72fa3053c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYW1rZWVuJTIwaW5kaWFuJTIwc25hY2t8ZW58MXx8fHwxNzYxNzM2MTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Snacks',
    description: 'Traditional Indian savory snack mix',
    nutritionalInfo: 'Calories: 480 per 100g, Fat: 28g, Protein: 12g',
    rating: 4.7,
  },
  {
    id: 33,
    name: 'Butter Popcorn',
    price: 40,
    image: 'https://images.unsplash.com/photo-1631148611744-06fdccf663af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwc25hY2slMjBmb29kfGVufDF8fHx8MTc2MTczNjExM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Snacks',
    description: 'Buttery flavored popcorn',
    nutritionalInfo: 'Calories: 375 per 100g, Fat: 13g, Fiber: 15g',
    rating: 4.4,
    discount: 15,
  },
];

export function ProductListingPage({
  category,
  onNavigateToProduct,
  onNavigateToCart,
  onAddToCart,
  user,
  cartCount,
  onBack,
  onLogout,
}: ProductListingPageProps) {
  const [sortBy, setSortBy] = useState<string>('featured');
  
  const products = allProducts.filter(p => p.category === category);
  
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'discount':
        return (b.discount || 0) - (a.discount || 0);
      default:
        return 0;
    }
  });

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
              <h1>{category}</h1>
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

      {/* Filters and Sort */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>{products.length} Products</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span>Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="discount">Discount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border"
            >
              <div 
                className="cursor-pointer"
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
                  <p className="text-gray-600 mt-1">{product.description}</p>
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
              <div className="px-4 pb-4">
                <Button 
                  className="w-full"
                  onClick={() => {
                    onAddToCart(product);
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
