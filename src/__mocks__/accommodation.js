export const accommodation = {
  id: 1,
  name: 'HOTEL',
  status: 'Available',
  imageUrl: [
    'https://res.cloudinary.com/dkabisw/image/upload/v1574765143/apl2muykitqk5kf6pnjg.jpg',
    'https://res.cloudinary.com/dkabisw/image/upload/v1574961322/xr4b5emlpudqh1l9yrpa.jpg',
    'https://res.cloudinary.com/dkabisw/image/upload/v1574765130/eqjambzo4x2qcyxs3cyi.jpg',
    'https://res.cloudinary.com/dkabisw/image/upload/v1574765136/o7mslrt3aukrgrqrekyz.jpg'
  ],
  amenities: ['Gym', 'Sauna', 'Steam bath', 'Spa', 'Free Wi-fi'],
  locationId: 1,
  description:
    'The space will be entirely yours. It is in a compound of similar apartments where people mind their own business. There is a gateman at the place 24 hours and you can go in and out at any point. You do not share facilities with anyone.',
  services: ['Free breakfast', 'Room Delivery', 'Free parking', 'Smart Rooms'],
  owner: 9,
  mapLocations: {
    lat: -1.9705786,
    lng: 30.10442880000005
  },
  createdAt: '2020-05-30T17:44:08.139Z',
  updatedAt: '2020-05-30T17:44:08.139Z',
  rooms: [
    {
      id: 8,
      name: 'Bret',
      type: '2bedroom',
      accommodationId: 1,
      status: 'Available',
      price: 2000
    },
    {
      id: 7,
      name: 'Crust',
      type: '2bedroom',
      accommodationId: 1,
      status: 'Available',
      price: 2000
    },
    {
      id: 6,
      name: 'Air',
      type: '2bedroom',
      accommodationId: 1,
      status: 'Available',
      price: 2000
    },
    {
      id: 2,
      name: 'Lekki',
      type: '2bedroom',
      accommodationId: 1,
      status: 'Available',
      price: 2000
    }
  ],
  Location: {
    id: 1,
    city: 'Ibadan',
    country: 'Nigeria'
  },
  likes: [
    {
      accommodationId: 1
    }
  ],
  Feedbacks: [
    {
      id: 3,
      userId: 4,
      feedback: 'I loved the fire view',
      accommodationId: 1,
      createdAt: '2020-05-30T17:44:08.507Z',
      updatedAt: '2020-05-30T17:44:08.507Z',
      User: {
        id: 4,
        firstName: 'Daniel',
        lastName: 'Doe',
        userEmail: 'danieldoe@gmail.com',
        userRoles: 'Requester',
        ProfilePicture: null
      }
    }
  ],
  rating: {
    averageRating: 3,
    userRating: null
  }
};
