import axios from "axios";

import handleError from "./error";

import { prod } from "../env";
const headers = {
  "Content-Type": "application/json",
};

// export const GetReservationsApi = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(userReservations);
//     }, 2000);
//   });
// };

export const GetReservationsApi = async (token, userId) => {
  try {
    const { data } = await axios.get(
      prod.URL + `/api/user-reservations/${userId}`
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const CreateReservationApi = async (token, data) => {
  try {
    const { data: response } = await axios.post(
      prod.URL + "/api/reservations",
      data
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
    return response;
  } catch (error) {
    return handleError(error);
  }
};

const userReservations = [
  {
    id: 1,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-14",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description:
      "i have 5 guests for an event today after noon. I wish to book five seats one table",
    is_accepted: false,
  },
  {
    id: 2,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-15",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "yyyyyyyyyyyyyyyyyyo",
    is_accepted: false,
  },
  {
    id: 3,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation description.",
    is_accepted: false,
  },
  {
    id: 4,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation description.",
    is_accepted: false,
  },
  {
    id: 5,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation description.",
    is_accepted: false,
  },
  {
    id: 6,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation description.",
    is_accepted: false,
  },
  {
    id: 7,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation descriptionll.",
    is_accepted: false,
  },
  {
    id: 8,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation descriptionll.",
    is_accepted: false,
  },
  {
    id: 9,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation descriptionll.",
    is_accepted: false,
  },
  {
    id: 10,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation descriptionll.",
    is_accepted: false,
  },
  {
    id: 11,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation .",
    is_accepted: false,
  },
  {
    id: 12,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation .",
    is_accepted: false,
  },
  {
    id: 13,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation .",
    is_accepted: false,
  },
  {
    id: 14,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation .",
    is_accepted: false,
  },
  {
    id: 15,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation .",
    is_accepted: false,
  },
  {
    id: 16,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation .",
    is_accepted: false,
  },
  {
    id: 17,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation .",
    is_accepted: false,
  },
  {
    id: 18,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation .",
    is_accepted: false,
  },
  {
    id: 19,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation .",
    is_accepted: false,
  },
  {
    id: 20,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation .",
    is_accepted: false,
  },
  {
    id: 21,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation .",
    is_accepted: false,
  },
  {
    id: 22,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation .",
    is_accepted: false,
  },
  {
    id: 23,
    user: {
      id: 1,
      mobile: "0700494222",
      first_name: "james",
    },
    check_in_date: "2024-04-12",
    premise: {
      id: 1,
      premise_name: "Vanguard",
    },
    description: "This is a reservation .",
    is_accepted: false,
  },
];
