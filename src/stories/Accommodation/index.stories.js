import React from 'react';
import { storiesOf } from '@storybook/react';
import Accommodation from '../../components/Accommodation';
import Provider from '../provider';

export default {
  title: 'Accommodation',
  component: Accommodation
};

const accommodations = [
  {
    id: 1,
    name: 'HOTEL',
    status: 'Available',
    imageUrl: [
      'https://res.cloudinary.com/dkabisw/image/upload/v1574765143/apl2muykitqk5kf6pnjg.jpg',
      'https://res.cloudinary.com/dkabisw/image/upload/v1574961322/xr4b5emlpudqh1l9yrpa.jpg',
      'https://res.cloudinary.com/dkabisw/image/upload/v1574765130/eqjambzo4x2qcyxs3cyi.jpg',
      'https://res.cloudinary.com/dkabisw/image/upload/v1574765136/o7mslrt3aukrgrqrekyz.jpg'
    ],
    owner: 9,
    locationId: 1,
    description:
      'The space will be entirely yours. It is in a compound of similar apartments where people mind their own business. There is a gateman at the place 24 hours and you can go in and out at any point. You do not share facilities with anyone.',
    mapLocations: {
      lat: -1.9705786,
      lng: 30.10442880000005
    },
    averageRating: '3.0000000000000000',
    location: 'Ibadan, Nigeria',
    rooms: [
      {
        accommodationId: 1
      },
      {
        accommodationId: 1
      },
      {
        accommodationId: 1
      },
      {
        accommodationId: 1
      }
    ],
    likes: [
      {
        id: 1
      }
    ]
  },
  {
    id: 2,
    name: 'MARIOT',
    status: 'Unavailable',
    imageUrl: [
      'https://res.cloudinary.com/dkabisw/image/upload/v1574765124/aahfyxzukrkpjx8dfqrc.jpg',
      'https://res.cloudinary.com/dkabisw/image/upload/v1574765127/kxuyq9ibpsepriqodzkc.jpg',
      'https://res.cloudinary.com/dkabisw/image/upload/v1574765130/eqjambzo4x2qcyxs3cyi.jpg'
    ],
    owner: 2,
    locationId: 1,
    description:
      'The space, located in a serene compound of similar apartments, will be exclusively yours during the stay. The place is within a 10 min ride to City Centre , 15 minutes form the airport and several international organizations.',
    mapLocations: {
      lat: -1.9705786,
      lng: 30.10442880000005
    },
    averageRating: '5.0000000000000000',
    location: 'Ibadan, Nigeria',
    rooms: [
      {
        accommodationId: 2
      },
      {
        accommodationId: 2
      },
      {
        accommodationId: 2
      },
      {
        accommodationId: 2
      }
    ],
    likes: [
      {
        id: 2
      }
    ]
  },
  {
    id: 3,
    name: 'SHERATON',
    status: 'Available',
    imageUrl: [
      'https://res.cloudinary.com/dkabisw/image/upload/v1574765133/gqnwfhgz9huyybsw6e8y.jpg',
      'https://res.cloudinary.com/dkabisw/image/upload/v1574765136/o7mslrt3aukrgrqrekyz.jpg',
      'https://res.cloudinary.com/dkabisw/image/upload/v1574765140/kbxrxtogb7unzbztkzeu.jpg'
    ],
    owner: 2,
    locationId: 2,
    description:
      'The apartment is well maintained and suitable for solo travellers or couples. ',
    mapLocations: {
      lat: -1.9705786,
      lng: 30.10442880000005
    },
    averageRating: '2.0000000000000000',
    location: 'Sicily, Italy',
    rooms: [
      {
        accommodationId: 3
      },
      {
        accommodationId: 3
      },
      {
        accommodationId: 3
      },
      {
        accommodationId: 3
      }
    ],
    likes: [
      {
        id: 5
      }
    ]
  },
  {
    id: 4,
    name: 'TRANSCORP HILTON',
    status: 'Available',
    imageUrl: [
      'https://res.cloudinary.com/dkabisw/image/upload/v1574765133/gqnwfhgz9huyybsw6e8y.jpg',
      'https://res.cloudinary.com/dkabisw/image/upload/v1574765136/o7mslrt3aukrgrqrekyz.jpg',
      'https://res.cloudinary.com/dkabisw/image/upload/v1574765140/kbxrxtogb7unzbztkzeu.jpg'
    ],
    owner: 2,
    locationId: 2,
    description:
      'Here is your own one cozy and intact studio flat in Lagos, near the US Embassy and just 200 metres from the General Hospital. The apartment is well maintained and suitable for solo travellers or couples.',
    mapLocations: {
      lat: -1.9705786,
      lng: 30.10442800005
    },
    averageRating: '5.0000000000000000',
    location: 'Sicily, Italy',
    rooms: [],
    likes: [
      {
        id: 3
      },
      {
        id: 4
      }
    ]
  }
];

storiesOf('Accommodation', module)
  .addDecorator((story) => <Provider story={story()} />)
  .add('Accommodations', () => (
    <Accommodation accommodation={{ ...accommodations }} />
  ));
