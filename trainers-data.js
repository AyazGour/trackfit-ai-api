// Trainers Database for TrackFit AI
const trainersData = [
    {
        id: 1,
        name: "Sarah Johnson",
        specialty: "strength",
        rating: 4.9,
        reviews: 156,
        experience: 8,
        price: 75,
        avatar: "trainer-sarah",
        description: "Certified strength and conditioning specialist with 8 years of experience. Specializes in powerlifting and functional strength training.",
        certifications: ["NSCA-CSCS", "ACSM-CPT", "FMS Level 2"],
        languages: ["English", "Spanish"],
        location: "Los Angeles, CA",
        availability: "Mon-Fri: 6am-8pm, Sat: 8am-4pm",
        sessions: 450,
        rating_breakdown: {
            5: 85,
            4: 10,
            3: 3,
            2: 1,
            1: 1
        }
    },
    {
        id: 2,
        name: "Mike Rodriguez",
        specialty: "cardio",
        rating: 4.7,
        reviews: 234,
        experience: 6,
        price: 65,
        avatar: "trainer-mike",
        description: "High-energy cardio specialist focused on HIIT training and weight loss. Former competitive runner with passion for helping clients achieve their fitness goals.",
        certifications: ["ACSM-CPT", "NASM-PES", "Spinning Instructor"],
        languages: ["English"],
        location: "Miami, FL",
        availability: "Mon-Sat: 5am-10pm",
        sessions: 680,
        rating_breakdown: {
            5: 75,
            4: 18,
            3: 5,
            2: 1,
            1: 1
        }
    },
    {
        id: 3,
        name: "Emily Chen",
        specialty: "yoga",
        rating: 4.8,
        reviews: 189,
        experience: 10,
        price: 60,
        avatar: "trainer-emily",
        description: "RYT-500 yoga instructor specializing in Vinyasa and Hatha yoga. Focus on mindfulness, flexibility, and stress reduction through movement.",
        certifications: ["RYT-500", "Yin Yoga Certification", "Meditation Teacher"],
        languages: ["English", "Mandarin"],
        location: "San Francisco, CA",
        availability: "Tue-Sun: 7am-7pm",
        sessions: 320,
        rating_breakdown: {
            5: 88,
            4: 9,
            3: 2,
            2: 1,
            1: 0
        }
    },
    {
        id: 4,
        name: "David Thompson",
        specialty: "crossfit",
        rating: 4.6,
        reviews: 145,
        experience: 7,
        price: 80,
        avatar: "trainer-david",
        description: "CrossFit Level 3 trainer with background in Olympic weightlifting. Helps athletes of all levels improve their functional fitness and competition performance.",
        certifications: ["CrossFit Level 3", "USAW Level 1", "CrossFit Gymnastics"],
        languages: ["English"],
        location: "Austin, TX",
        availability: "Mon-Fri: 5am-9pm, Sat-Sun: 8am-6pm",
        sessions: 380,
        rating_breakdown: {
            5: 70,
            4: 20,
            3: 7,
            2: 2,
            1: 1
        }
    },
    {
        id: 5,
        name: "Jessica Williams",
        specialty: "bodybuilding",
        rating: 4.9,
        reviews: 98,
        experience: 9,
        price: 85,
        avatar: "trainer-jessica",
        description: "IFBB Pro bodybuilder and certified trainer. Specializes in physique development, competition prep, and advanced training techniques.",
        certifications: ["NASM-CPT", "IFBB Pro Card", "Precision Nutrition Level 1"],
        languages: ["English", "Portuguese"],
        location: "Las Vegas, NV",
        availability: "Mon-Sat: 6am-8pm",
        sessions: 275,
        rating_breakdown: {
            5: 92,
            4: 6,
            3: 1,
            2: 1,
            1: 0
        }
    },
    {
        id: 6,
        name: "Carlos Martinez",
        specialty: "strength",
        rating: 4.5,
        reviews: 167,
        experience: 5,
        price: 70,
        avatar: "trainer-carlos",
        description: "Former college football player turned strength coach. Focuses on athletic performance, injury prevention, and functional movement patterns.",
        certifications: ["NSCA-CSCS", "FMS Level 2", "TPI Certified"],
        languages: ["English", "Spanish"],
        location: "Phoenix, AZ",
        availability: "Mon-Fri: 6am-9pm, Sat: 7am-5pm",
        sessions: 290,
        rating_breakdown: {
            5: 65,
            4: 25,
            3: 7,
            2: 2,
            1: 1
        }
    },
    {
        id: 7,
        name: "Amanda Foster",
        specialty: "cardio",
        rating: 4.8,
        reviews: 203,
        experience: 6,
        price: 68,
        avatar: "trainer-amanda",
        description: "Group fitness instructor and personal trainer specializing in dance cardio, HIIT, and metabolic conditioning for weight loss.",
        certifications: ["ACE-CPT", "Group Fitness Instructor", "Zumba Instructor"],
        languages: ["English"],
        location: "Seattle, WA",
        availability: "Mon-Thu: 6am-8pm, Fri-Sun: 7am-6pm",
        sessions: 520,
        rating_breakdown: {
            5: 82,
            4: 13,
            3: 3,
            2: 1,
            1: 1
        }
    },
    {
        id: 8,
        name: "Ryan Park",
        specialty: "yoga",
        rating: 4.7,
        reviews: 134,
        experience: 8,
        price: 65,
        avatar: "trainer-ryan",
        description: "Power yoga and ashtanga specialist. Combines traditional yoga practices with strength building for a challenging yet mindful practice.",
        certifications: ["RYT-500", "Ashtanga Authorization", "Yoga Anatomy"],
        languages: ["English", "Korean"],
        location: "Denver, CO",
        availability: "Tue-Sat: 6am-8pm, Sun: 8am-4pm",
        sessions: 245,
        rating_breakdown: {
            5: 78,
            4: 16,
            3: 4,
            2: 1,
            1: 1
        }
    },
    {
        id: 9,
        name: "Lisa Anderson",
        specialty: "crossfit",
        rating: 4.6,
        reviews: 176,
        experience: 4,
        price: 72,
        avatar: "trainer-lisa",
        description: "Former CrossFit Games regional competitor. Specializes in helping beginners safely enter CrossFit while building confidence and skills.",
        certifications: ["CrossFit Level 2", "CrossFit Kids", "First Aid/CPR"],
        languages: ["English"],
        location: "Portland, OR",
        availability: "Mon-Fri: 5:30am-8:30pm, Sat: 8am-5pm",
        sessions: 195,
        rating_breakdown: {
            5: 68,
            4: 22,
            3: 7,
            2: 2,
            1: 1
        }
    },
    {
        id: 10,
        name: "Marcus Johnson",
        specialty: "bodybuilding",
        rating: 4.8,
        reviews: 112,
        experience: 12,
        price: 90,
        avatar: "trainer-marcus",
        description: "Veteran bodybuilder with 12 years of competitive experience. Specializes in muscle hypertrophy, contest prep, and advanced training periodization.",
        certifications: ["NASM-CPT", "NPC Judge", "Contest Prep Specialist"],
        languages: ["English"],
        location: "Atlanta, GA",
        availability: "Mon-Sat: 5am-9pm",
        sessions: 340,
        rating_breakdown: {
            5: 87,
            4: 9,
            3: 2,
            2: 1,
            1: 1
        }
    },
    {
        id: 11,
        name: "Sophie Turner",
        specialty: "strength",
        rating: 4.7,
        reviews: 145,
        experience: 5,
        price: 73,
        avatar: "trainer-sophie",
        description: "Women's strength training specialist focusing on empowering women through weightlifting. Expertise in powerlifting and strength for everyday life.",
        certifications: ["NSCA-CPT", "Women's Strength Coach", "StrongFirst SFG"],
        languages: ["English", "French"],
        location: "Chicago, IL",
        availability: "Mon-Fri: 6am-8pm, Sat: 8am-3pm",
        sessions: 185,
        rating_breakdown: {
            5: 76,
            4: 18,
            3: 4,
            2: 1,
            1: 1
        }
    },
    {
        id: 12,
        name: "Jake Wilson",
        specialty: "cardio",
        rating: 4.5,
        reviews: 198,
        experience: 3,
        price: 55,
        avatar: "trainer-jake",
        description: "Young and energetic trainer specializing in boot camp style workouts and outdoor fitness. Great for those who want fun, challenging cardio sessions.",
        certifications: ["ACSM-CPT", "TRX Suspension Training", "Bootcamp Instructor"],
        languages: ["English"],
        location: "San Diego, CA",
        availability: "Mon-Sun: 6am-7pm",
        sessions: 125,
        rating_breakdown: {
            5: 62,
            4: 28,
            3: 7,
            2: 2,
            1: 1
        }
    },
    {
        id: 13,
        name: "Maria Gonzalez",
        specialty: "yoga",
        rating: 4.9,
        reviews: 167,
        experience: 11,
        price: 70,
        avatar: "trainer-maria",
        description: "Senior yoga instructor with expertise in therapeutic yoga and injury rehabilitation. Gentle approach perfect for beginners and recovery.",
        certifications: ["E-RYT 500", "Yoga Therapy", "Restorative Yoga"],
        languages: ["English", "Spanish"],
        location: "Houston, TX",
        availability: "Tue-Sat: 7am-6pm, Sun: 9am-4pm",
        sessions: 420,
        rating_breakdown: {
            5: 91,
            4: 7,
            3: 1,
            2: 1,
            1: 0
        }
    },
    {
        id: 14,
        name: "Alex Kim",
        specialty: "crossfit",
        rating: 4.4,
        reviews: 89,
        experience: 3,
        price: 62,
        avatar: "trainer-alex",
        description: "Enthusiastic CrossFit coach with background in martial arts. Focuses on proper form and gradual progression for safe, effective training.",
        certifications: ["CrossFit Level 1", "Martial Arts Black Belt", "First Aid"],
        languages: ["English", "Korean"],
        location: "Boston, MA",
        availability: "Mon-Fri: 6am-9pm, Sat-Sun: 8am-5pm",
        sessions: 95,
        rating_breakdown: {
            5: 58,
            4: 30,
            3: 8,
            2: 3,
            1: 1
        }
    },
    {
        id: 15,
        name: "Nicole Davis",
        specialty: "bodybuilding",
        rating: 4.6,
        reviews: 124,
        experience: 6,
        price: 78,
        avatar: "trainer-nicole",
        description: "Figure competitor and nutrition coach. Combines bodybuilding training with comprehensive nutrition guidance for complete body transformation.",
        certifications: ["ISSA-CPT", "Precision Nutrition", "Figure Competition Coach"],
        languages: ["English"],
        location: "Nashville, TN",
        availability: "Mon-Fri: 5am-8pm, Sat: 7am-4pm",
        sessions: 210,
        rating_breakdown: {
            5: 71,
            4: 19,
            3: 6,
            2: 3,
            1: 1
        }
    }
];

// Specialty categories
const specialties = [
    { value: "all", label: "All Specialties" },
    { value: "strength", label: "Strength Training" },
    { value: "cardio", label: "Cardio" },
    { value: "yoga", label: "Yoga" },
    { value: "crossfit", label: "CrossFit" },
    { value: "bodybuilding", label: "Bodybuilding" }
];

// Helper functions
const getTrainersBySpecialty = (specialty) => {
    if (specialty === 'all') return trainersData;
    return trainersData.filter(trainer => trainer.specialty === specialty);
};

const getTrainersByRating = (minRating) => {
    return trainersData.filter(trainer => trainer.rating >= minRating);
};

const getTopRatedTrainers = (limit = 5) => {
    return trainersData
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
};

const getTrainerById = (id) => {
    return trainersData.find(trainer => trainer.id === id);
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        trainersData, 
        specialties, 
        getTrainersBySpecialty, 
        getTrainersByRating, 
        getTopRatedTrainers, 
        getTrainerById 
    };
} 