import { Product } from '@/components/ProductCard'; 

export const DEMO_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Royal Crown Pet Costume",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=center", // Ảnh chính (default)
    rating: 4.8,
    reviewCount: 124,
    category: "Cosplay Costumes",
    description: "Transform your pet into royalty with this elegant crown costume",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Gold", "Silver", "Rose Gold"],
    inStock: true,
    isNew: true,
    isBestseller: false,
    // New: Variants - key: "SIZE-COLOR", value: URL ảnh variant (Unsplash với params khác để simulate)
    variants: {
      "XS-Gold": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=face&saturation=20", // Crop face, saturation cho Gold
      "S-Silver": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=entropy&brightness=10", // Crop entropy, brightness cho Silver
      "M-Rose Gold": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=center&contrast=20", // Contrast cho Rose Gold
      "L-Gold": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=bottom", // Crop bottom cho size lớn
      // Fallback: Nếu không match, dùng image chính
    }
  },
  {
    id: 2,
    name: "Superhero Cape Set",
    price: 24.99,
    originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&crop=center",
    rating: 4.9,
    reviewCount: 89,
    category: "Cosplay Costumes",
    description: "Let your pet save the day with this amazing superhero cape",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Red", "Blue", "Black"],
    inStock: true,
    isNew: false,
    isBestseller: true,
    variants: {
      "XS-Red": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&crop=face&hue=0", // Hue cho Red
      "S-Blue": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&crop=entropy&hue=200", // Hue cho Blue
      "M-Black": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&crop=center&brightness=-20", // Dark cho Black
      "L-Red": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&crop=top",
      "XL-Blue": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&crop=bottom&saturation=30",
    }
  },
  {
    id: 3,
    name: "Cozy Winter Sweater",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviewCount: 156,
    category: "Casual Wear",
    description: "Keep your pet warm and stylish during cold weather",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Gray", "Navy", "Pink", "Green"],
    inStock: true,
    isNew: false,
    isBestseller: true,
    variants: {
      "XS-Gray": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop&crop=face&brightness=-10",
      "S-Navy": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop&crop=entropy&hue=210",
      "M-Pink": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop&crop=center&hue=330",
      "L-Green": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop&crop=bottom&hue=120",
      "XL-Gray": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop&crop=top&contrast=15",
    }
  },
  {
    id: 4,
    name: "Formal Bow Tie Collar",
    price: 15.99,
    originalPrice: 22.99,
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop&crop=center",
    rating: 4.6,
    reviewCount: 78,
    category: "Premium Theme Collections",
    description: "Perfect for special occasions and formal events",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Navy", "Burgundy"],
    inStock: true,
    isNew: true,
    isBestseller: false,
    variants: {
      "XS-Black": "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop&crop=face&brightness=-30",
      "S-Navy": "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop&crop=entropy&hue=220",
      "M-Burgundy": "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop&crop=center&hue=340",
      "L-Black": "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop&crop=bottom",
    }
  },
  {
    id: 5,
    name: "Rainbow Tutu Dress",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop&crop=center",
    rating: 4.9,
    reviewCount: 203,
    category: "Premium Theme Collections",
    description: "Adorable rainbow tutu that makes every day a celebration",
    sizes: ["XS", "S", "M"],
    colors: ["Rainbow", "Pink", "Purple"],
    inStock: true,
    isNew: false,
    isBestseller: true,
    variants: {
      "XS-Rainbow": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop&crop=face&saturation=50",
      "S-Pink": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop&crop=entropy&hue=330",
      "M-Purple": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop&crop=center&hue=270",
    }
  },
  {
    id: 6,
    name: "Denim Jacket",
    price: 27.99,
    originalPrice: 35.99,
    image: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&h=400&fit=crop&crop=center",
    rating: 4.5,
    reviewCount: 92,
    category: "Casual Wear",
    description: "Classic denim jacket for the coolest pets in town",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black", "White"],
    inStock: false,
    isNew: false,
    isBestseller: false,
    variants: {
      "S-Blue": "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&h=400&fit=crop&crop=face",
      "M-Black": "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&h=400&fit=crop&crop=entropy&brightness=-20",
      "L-White": "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&h=400&fit=crop&crop=center&brightness=20",
      "XL-Blue": "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=400&h=400&fit=crop&crop=bottom",
    }
  },
  {
    id: 7,
    name: "Meme Cat Shirt",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop&crop=center",
    rating: 4.8,
    reviewCount: 167,
    category: "Trending Meme Outfits",
    description: "Internet famous meme design that will make everyone smile",
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Gray", "Yellow"],
    inStock: true,
    isNew: true,
    isBestseller: false,
    variants: {
      "XS-White": "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop&crop=face&brightness=10",
      "S-Gray": "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop&crop=entropy",
      "M-Yellow": "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop&crop=center&hue=50",
      "L-White": "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop&crop=bottom",
    }
  },
  {
    id: 8,
    name: "Handmade Knit Scarf",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop&crop=center",
    rating: 4.7,
    reviewCount: 134,
    category: "Handmade & Custom Design",
    description: "Lovingly handcrafted scarf with unique patterns",
    sizes: ["One Size"], // Chỉ 1 size, variants ít hơn
    colors: ["Red", "Blue", "Green", "Purple"],
    inStock: true,
    isNew: false,
    isBestseller: true,
    variants: {
      "One Size-Red": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop&crop=face&hue=0",
      "One Size-Blue": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop&crop=entropy&hue=200",
      "One Size-Green": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop&crop=center&hue=120",
      "One Size-Purple": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop&crop=bottom&hue=270",
    }
  },