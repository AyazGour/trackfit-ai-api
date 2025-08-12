// Products Database for TrackFit AI Store
const productsData = [
    // Equipment Category
    {
        id: 1,
        name: "Adjustable Dumbbells Set",
        category: "equipment",
        price: 299.99,
        description: "Professional adjustable dumbbells with quick-change system. Weight range: 5-50 lbs per dumbbell.",
        image: "dumbbell-set",
        rating: 4.8,
        reviews: 245,
        seller: "FitGear Pro",
        inStock: true
    },
    {
        id: 2,
        name: "Resistance Bands Kit",
        category: "equipment",
        price: 39.99,
        description: "Complete resistance band set with 5 different resistance levels, door anchor, and exercise guide.",
        image: "resistance-bands",
        rating: 4.6,
        reviews: 189,
        seller: "FlexBand",
        inStock: true
    },
    {
        id: 3,
        name: "Olympic Barbell Set",
        category: "equipment",
        price: 599.99,
        description: "Professional Olympic barbell with 300lbs of weight plates. Perfect for serious strength training.",
        image: "barbell-set",
        rating: 4.9,
        reviews: 67,
        seller: "Iron Master",
        inStock: false
    },
    {
        id: 4,
        name: "Pull-up Bar (Doorway)",
        category: "equipment",
        price: 49.99,
        description: "No-screw doorway pull-up bar. Easy installation and removal. Supports up to 300 lbs.",
        image: "pullup-bar",
        rating: 4.5,
        reviews: 312,
        seller: "HomeGym Solutions",
        inStock: true
    },
    {
        id: 5,
        name: "Kettlebell Set (3-piece)",
        category: "equipment",
        price: 129.99,
        description: "Cast iron kettlebell set with 15lb, 25lb, and 35lb weights. Non-slip grip handles.",
        image: "kettlebell-set",
        rating: 4.7,
        reviews: 156,
        seller: "Strong Fitness",
        inStock: true
    },
    {
        id: 6,
        name: "Suspension Trainer",
        category: "equipment",
        price: 149.99,
        description: "Professional suspension training system for full-body workouts. Includes door anchor and workout guide.",
        image: "suspension-trainer",
        rating: 4.8,
        reviews: 203,
        seller: "TRX Pro",
        inStock: true
    },
    {
        id: 7,
        name: "Foam Roller Premium",
        category: "equipment",
        price: 34.99,
        description: "High-density foam roller for muscle recovery and injury prevention. 36-inch length.",
        image: "foam-roller",
        rating: 4.6,
        reviews: 278,
        seller: "Recovery Plus",
        inStock: true
    },
    
    // Accessories Category
    {
        id: 8,
        name: "Yoga Mat Premium",
        category: "accessories",
        price: 69.99,
        description: "Extra-thick non-slip yoga mat with alignment lines. Eco-friendly TPE material.",
        image: "yoga-mat",
        rating: 4.7,
        reviews: 445,
        seller: "Zen Fitness",
        inStock: true
    },
    {
        id: 9,
        name: "Gym Gloves Pro",
        category: "accessories",
        price: 24.99,
        description: "Breathable workout gloves with wrist support and palm protection. Available in multiple sizes.",
        image: "gym-gloves",
        rating: 4.4,
        reviews: 167,
        seller: "GripMax",
        inStock: true
    },
    {
        id: 10,
        name: "Gym Towel Set",
        category: "accessories",
        price: 19.99,
        description: "Quick-dry microfiber towel set. Antibacterial and odor-resistant. Pack of 3.",
        image: "gym-towels",
        rating: 4.5,
        reviews: 89,
        seller: "FreshGym",
        inStock: true
    },
    {
        id: 11,
        name: "Water Bottle Insulated",
        category: "accessories",
        price: 29.99,
        description: "Stainless steel insulated water bottle. Keeps drinks cold for 24 hours. 32oz capacity.",
        image: "water-bottle",
        rating: 4.8,
        reviews: 234,
        seller: "HydroMax",
        inStock: true
    },
    {
        id: 12,
        name: "Ab Wheel Roller",
        category: "accessories",
        price: 19.99,
        description: "Dual ab wheel roller with comfortable grip handles. Perfect for core strengthening.",
        image: "ab-wheel",
        rating: 4.3,
        reviews: 123,
        seller: "Core Power",
        inStock: true
    },
    {
        id: 13,
        name: "Exercise Ball 65cm",
        category: "accessories",
        price: 24.99,
        description: "Anti-burst exercise ball with pump included. Perfect for core workouts and stretching.",
        image: "exercise-ball",
        rating: 4.6,
        reviews: 198,
        seller: "Balance Pro",
        inStock: true
    },
    {
        id: 14,
        name: "Jump Rope Speed",
        category: "accessories",
        price: 14.99,
        description: "Adjustable speed jump rope with ball bearing system. Perfect for cardio workouts.",
        image: "jump-rope",
        rating: 4.5,
        reviews: 267,
        seller: "CardioMax",
        inStock: true
    },
    
    // Supplements Category
    {
        id: 15,
        name: "Whey Protein Powder",
        category: "supplements",
        price: 49.99,
        description: "Premium whey protein isolate. 25g protein per serving. Chocolate flavor. 2lbs container.",
        image: "protein-powder",
        rating: 4.7,
        reviews: 389,
        seller: "NutriPro",
        inStock: true
    },
    {
        id: 16,
        name: "Pre-Workout Energy",
        category: "supplements",
        price: 34.99,
        description: "Clean energy pre-workout formula with natural caffeine. Fruit punch flavor.",
        image: "pre-workout",
        rating: 4.5,
        reviews: 156,
        seller: "Energy Plus",
        inStock: true
    },
    {
        id: 17,
        name: "BCAA Recovery",
        category: "supplements",
        price: 29.99,
        description: "Branched-chain amino acids for muscle recovery. Lemon-lime flavor. 30 servings.",
        image: "bcaa",
        rating: 4.4,
        reviews: 112,
        seller: "Recovery Pro",
        inStock: false
    },
    {
        id: 18,
        name: "Multivitamin Sport",
        category: "supplements",
        price: 24.99,
        description: "Complete multivitamin designed for active individuals. 60 tablets.",
        image: "multivitamin",
        rating: 4.6,
        reviews: 87,
        seller: "VitaFit",
        inStock: true
    },
    {
        id: 19,
        name: "Creatine Monohydrate",
        category: "supplements",
        price: 19.99,
        description: "Pure creatine monohydrate powder. Unflavored. Supports strength and power.",
        image: "creatine",
        rating: 4.8,
        reviews: 223,
        seller: "Pure Power",
        inStock: true
    },
    
    // Apparel Category
    {
        id: 20,
        name: "Athletic Shorts Men",
        category: "apparel",
        price: 34.99,
        description: "Moisture-wicking athletic shorts with compression liner. Multiple colors available.",
        image: "athletic-shorts",
        rating: 4.5,
        reviews: 178,
        seller: "SportWear Pro",
        inStock: true
    },
    {
        id: 21,
        name: "Sports Bra High Support",
        category: "apparel",
        price: 39.99,
        description: "High-support sports bra with moisture-wicking fabric. Perfect for intense workouts.",
        image: "sports-bra",
        rating: 4.7,
        reviews: 245,
        seller: "FitFemme",
        inStock: true
    },
    {
        id: 22,
        name: "Compression Leggings",
        category: "apparel",
        price: 44.99,
        description: "High-waisted compression leggings with side pocket. Squat-proof fabric.",
        image: "leggings",
        rating: 4.8,
        reviews: 356,
        seller: "FlexFit",
        inStock: true
    },
    {
        id: 23,
        name: "Tank Top Breathable",
        category: "apparel",
        price: 24.99,
        description: "Lightweight breathable tank top. Quick-dry fabric. Unisex design.",
        image: "tank-top",
        rating: 4.4,
        reviews: 134,
        seller: "AirFit",
        inStock: true
    },
    {
        id: 24,
        name: "Training Shoes",
        category: "apparel",
        price: 89.99,
        description: "Cross-training shoes with superior stability and comfort. Multiple sizes available.",
        image: "training-shoes",
        rating: 4.6,
        reviews: 289,
        seller: "FootFit",
        inStock: true
    },
    {
        id: 25,
        name: "Workout Hoodies",
        category: "apparel",
        price: 54.99,
        description: "Comfortable workout hoodie with moisture-wicking technology. Perfect for cool weather training.",
        image: "workout-hoodie",
        rating: 4.5,
        reviews: 167,
        seller: "WarmFit",
        inStock: true
    },
    {
        id: 26,
        name: "Gym Bag Large",
        category: "accessories",
        price: 59.99,
        description: "Spacious gym bag with separate shoe compartment and water bottle holder.",
        image: "gym-bag",
        rating: 4.7,
        reviews: 198,
        seller: "CarryFit",
        inStock: true
    },
    
    // Additional Equipment
    {
        id: 27,
        name: "Battle Ropes 30ft",
        category: "equipment",
        price: 79.99,
        description: "Heavy-duty battle ropes for high-intensity interval training. 30 feet length, 2-inch diameter.",
        image: "battle-ropes",
        rating: 4.6,
        reviews: 134,
        seller: "HIIT Pro",
        inStock: true
    },
    {
        id: 28,
        name: "Medicine Ball 20lbs",
        category: "equipment",
        price: 39.99,
        description: "Textured medicine ball perfect for functional training and core workouts.",
        image: "medicine-ball",
        rating: 4.5,
        reviews: 89,
        seller: "Function Fit",
        inStock: true
    },
    {
        id: 29,
        name: "Agility Ladder",
        category: "equipment",
        price: 19.99,
        description: "12-rung agility ladder for speed and coordination training. Includes carrying bag.",
        image: "agility-ladder",
        rating: 4.4,
        reviews: 156,
        seller: "Speed Training",
        inStock: true
    },
    {
        id: 30,
        name: "Plyo Box Set",
        category: "equipment",
        price: 199.99,
        description: "Stackable plyo boxes in 3 heights: 12\", 18\", 24\". Perfect for plyometric training.",
        image: "plyo-box",
        rating: 4.8,
        reviews: 76,
        seller: "Jump Pro",
        inStock: false
    }
];

// Seller information
const sellersData = {
    "FitGear Pro": {
        rating: 4.8,
        totalProducts: 15,
        joinedDate: "2020-01-15",
        location: "California, USA"
    },
    "FlexBand": {
        rating: 4.6,
        totalProducts: 8,
        joinedDate: "2021-03-22",
        location: "Texas, USA"
    },
    "Iron Master": {
        rating: 4.9,
        totalProducts: 12,
        joinedDate: "2019-08-10",
        location: "New York, USA"
    },
    "HomeGym Solutions": {
        rating: 4.5,
        totalProducts: 20,
        joinedDate: "2020-06-18",
        location: "Florida, USA"
    },
    "Strong Fitness": {
        rating: 4.7,
        totalProducts: 18,
        joinedDate: "2020-11-05",
        location: "Illinois, USA"
    },
    "TRX Pro": {
        rating: 4.8,
        totalProducts: 6,
        joinedDate: "2018-12-01",
        location: "Colorado, USA"
    },
    "Recovery Plus": {
        rating: 4.6,
        totalProducts: 10,
        joinedDate: "2021-01-20",
        location: "Oregon, USA"
    },
    "Zen Fitness": {
        rating: 4.7,
        totalProducts: 14,
        joinedDate: "2020-04-12",
        location: "Washington, USA"
    },
    "GripMax": {
        rating: 4.4,
        totalProducts: 12,
        joinedDate: "2021-07-08",
        location: "Nevada, USA"
    },
    "FreshGym": {
        rating: 4.5,
        totalProducts: 8,
        joinedDate: "2021-09-15",
        location: "Arizona, USA"
    }
};

// Categories for filtering
const categories = [
    { value: "all", label: "All Categories" },
    { value: "equipment", label: "Equipment" },
    { value: "accessories", label: "Accessories" },
    { value: "supplements", label: "Supplements" },
    { value: "apparel", label: "Apparel" }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productsData, sellersData, categories };
} 