export interface InitialState {
  signUp: {
    data?: string;
    error?: string;
  };
  logIn: {
    isLoggedIn: boolean;
    message?: string;
    error?: string;
  };
  verify: {
    data: null;
    error: null;
  };
  reVerify: {
    data: null;
    error: null;
  };
  authorize: {
    user: null;
    error: null;
  };
  errors: {
    status: string | number;
    message?: string;
  };
  resetPassword: {
    message: string;
  };
  admin: {
    userRoles: Array<string>;
    error: null;
  };
  supplier: {
    data: null;
    error: null;
  };
  accommodations: {
    accommodations: Array<string>;
    error: null;
  };
  accommodation: {
    accommodation: string;
    error: null;
  };
  request: {
    status: string;
    locations: string;
    message: string;
    error: string;
  };
  addAccommodation: {
    accommodation: null;
    error: string;
  };
  rating: {
    rate: string;
    error: string;
  };
  like: {
    status: null;
    message: null;
    error: null;
  };
  feedback: {
    status: null;
    message: null;
    error: null;
  };
  profile: {
    status: string;
    data: {
      passportName: string;
      passportNumber: string;
      firstName: string;
      lastName: string;
      birthDate: string;
      department: string;
      phoneNumber: string;
      language: string;
      currency: string;
      gender: string;
      location: string;
      image: string;
      userId: string;
      role: string;
    };
    error: string;
  };
  requests: {
    requests: Array<string>;
    filtered: Array<string>;
    title: string;
    error: null;
  };
  notification: {
    unread: 0;
    notifications: [];
  };
  chats: {
    name: string;
    messages: [];
    users: [];
  };
  dashboard: {
    mostTravelled: {
      destinations: [];
      count: 0;
    };
    tripStats: {
      total: 0;
      trips: [];
    };
  };
  comments: {
    comments: Array<string>;
    error: null;
  };
  booking: {
    data: null;
    error: null;
  };
  rooms: {
    data: [];
    error: null;
  };
  approvals: {
    approvals: Array<string>;
    error: null;
  };
  approveReject: {
    data: null;
    error: null;
  };
  singleRequest: {
    data: null;
    error: null;
  };
}
