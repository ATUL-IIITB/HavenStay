const sampleListings = [
  {
    name: "Luxury Beach Villa",
    Image: {
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&auto=format&fit=crop",
      fileName: "sample-image"
    },
    price: 15000,
    location: "Goa",
    description: "Beautiful beachside villa with private pool and ocean view."
  },

  {
    name: "Mountain Cabin Retreat",
    Image: {
      url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&auto=format&fit=crop",
      fileName: "sample-image"
    },
    price: 8000,
    location: "Manali",
    description: "Cozy wooden cabin surrounded by snowy mountains."
  },

  {
    name: "City Apartment Deluxe",
    Image: {
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&auto=format&fit=crop",
      fileName: "sample-image"
    },
    price: 6000,
    location: "Mumbai",
    description: "Modern apartment in the heart of the city with all amenities."
  },
  {
    name: "Sunset Palm Resort",
    Image: {
      url: "https://picsum.photos/seed/resort1/800/600",
      fileName: "sample-image"
    },
    price: 12500,
    location: "Goa",
    description: "Luxury beachfront resort with infinity pool and sunset views."
  },
  {
    name: "Emerald Valley Cottage",
    Image: {
      url: "https://picsum.photos/seed/cottage1/800/600",
      fileName: "sample-image"
    },
    price: 7200,
    location: "Munnar",
    description: "Cozy cottage surrounded by lush green tea plantations."
  },
  {
    name: "Blue Lagoon Resort",
    Image: {
      url: "https://picsum.photos/seed/resort2/800/600",
      fileName: "sample-image"
    },
    price: 16500,
    location: "Lakshadweep",
    description: "Beach resort offering crystal-clear lagoons and water sports."
  },
  {
    name: "Royal Palace Hotel",
    Image: {
      url: "https://picsum.photos/seed/hotel1/800/600",
      fileName: "sample-image"
    },
    price: 14000,
    location: "Udaipur",
    description: "Heritage palace hotel with traditional Rajasthani hospitality."
  },
  {
    name: "Golden Sands Villa",
    Image: {
      url: "https://picsum.photos/seed/villa1/800/600",
      fileName: "sample-image"
    },
    price: 19500,
    location: "Goa",
    description: "Private villa with beach access and luxurious interiors."
  },
  {
    name: "Green Meadows Farm Stay",
    Image: {
      url: "https://picsum.photos/seed/farm1/800/600",
      fileName: "sample-image"
    },
    price: 5800,
    location: "Nashik",
    description: "Relaxing farmhouse surrounded by vineyards and greenery."
  },
  {
    name: "Snow Crown Chalet",
    Image: {
      url: "https://picsum.photos/seed/chalet1/800/600",
      fileName: "sample-image"
    },
    price: 15500,
    location: "Gulmarg",
    description: "Wooden chalet offering breathtaking snowy mountain views."
  },
  {
    name: "Coral Reef Resort",
    Image: {
      url: "https://picsum.photos/seed/resort3/800/600",
      fileName: "sample-image"
    },
    price: 21000,
    location: "Andaman",
    description: "Luxury island resort with scuba diving experiences."
  },
  {
    name: "Lotus Garden Inn",
    Image: {
      url: "https://picsum.photos/seed/hotel2/800/600",
      fileName: "sample-image"
    },
    price: 6300,
    location: "Mysore",
    description: "Comfortable stay surrounded by peaceful gardens."
  },
  {
    name: "Skyline Executive Suites",
    Image: {
      url: "https://picsum.photos/seed/suite1/800/600",
      fileName: "sample-image"
    },
    price: 13500,
    location: "Hyderabad",
    description: "Modern serviced apartments ideal for business travelers."
  },
  {
    name: "Ocean Breeze Cottage",
    Image: {
      url: "https://picsum.photos/seed/cottage2/800/600",
      fileName: "sample-image"
    },
    price: 8800,
    location: "Pondicherry",
    description: "Beachside cottage with private garden and sea breeze."
  },
  {
    name: "Riverstone Camp",
    Image: {
      url: "https://picsum.photos/seed/camp1/800/600",
      fileName: "sample-image"
    },
    price: 4200,
    location: "Rishikesh",
    description: "Adventure campsite beside the river with bonfire nights."
  },
  {
    name: "Heritage Courtyard Hotel",
    Image: {
      url: "https://picsum.photos/seed/hotel3/800/600",
      fileName: "sample-image"
    },
    price: 9600,
    location: "Jodhpur",
    description: "Traditional architecture combined with modern comforts."
  },
  {
    name: "Crystal Lake Resort",
    Image: {
      url: "https://picsum.photos/seed/resort4/800/600",
      fileName: "sample-image"
    },
    price: 11800,
    location: "Nainital",
    description: "Peaceful resort overlooking a beautiful mountain lake."
  },
  {
    name: "Wild Safari Lodge",
    Image: {
      url: "https://picsum.photos/seed/lodge1/800/600",
      fileName: "sample-image"
    },
    price: 10900,
    location: "Kaziranga",
    description: "Stay close to wildlife with guided safari experiences."
  },
  {
    name: "Cloud Nine Homestay",
    Image: {
      url: "https://picsum.photos/seed/home1/800/600",
      fileName: "sample-image"
    },
    price: 5400,
    location: "Coorg",
    description: "Homestay nestled among coffee plantations and hills."
  },
  {
    name: "Moonlight Desert Camp",
    Image: {
      url: "https://picsum.photos/seed/desert1/800/600",
      fileName: "sample-image"
    },
    price: 6700,
    location: "Jaisalmer",
    description: "Luxury tents with cultural performances under the stars."
  },
  {
    name: "Elite Business Hotel",
    Image: {
      url: "https://picsum.photos/seed/business1/800/600",
      fileName: "sample-image"
    },
    price: 9200,
    location: "Gurugram",
    description: "Premium hotel designed for corporate and business travelers."
  },
  {
    name: "Forest Whisper Retreat",
    Image: {
      url: "https://picsum.photos/seed/forest1/800/600",
      fileName: "sample-image"
    },
    price: 7800,
    location: "Wayanad",
    description: "Eco-friendly retreat surrounded by dense forests."
  },
  {
    name: "Pearl Bay Resort",
    Image: {
      url: "https://picsum.photos/seed/resort5/800/600",
      fileName: "sample-image"
    },
    price: 17200,
    location: "Diu",
    description: "Elegant seaside resort with private beach and luxury amenities."
  }

];

module.exports = { data: sampleListings };