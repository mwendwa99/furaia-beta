import axios from "axios";
import handleError from "./error";
import { prod } from "../env";

export const GetAllBillsApi = async (token) => {
  try {
    const response = await axios.get(prod.URL + `/api/bills`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// export const GetAllBillsApi = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(bill);
//     }, 2000);
//   });
// };

const bill = [
  {
    premise_name: "Vanguard",
    receipt_no: "123456",
    till_no: "213421",
    waiter_name: "John Doe",
    table_no: "1",
    bill_status: "active",
    amount_paid: "2000",
    total_amount: "3000",
    created_at: "2021-08-02",
  },
  {
    premise_name: "Java",
    receipt_no: "123457",
    till_no: "213422",
    waiter_name: "Jane Doe",
    table_no: "2",
    bill_status: "active",
    amount_paid: "2000",
    total_amount: "3000",
    created_at: "2021-08-02",
  },
  {
    premise_name: "Kukito",
    receipt_no: "123458",
    till_no: "213423",
    waiter_name: "John Doe",
    table_no: "3",
    bill_status: "active",
    amount_paid: "2000",
    total_amount: "3000",
    created_at: "2021-08-02",
  },
  {
    premise_name: "Vanguard",
    receipt_no: "123459",
    till_no: "213424",
    waiter_name: "Jane Doe",
    table_no: "4",
    bill_status: "active",
    amount_paid: "2000",
    total_amount: "3000",
    created_at: "2021-08-02",
  },
  {
    premise_name: "Java",
    receipt_no: "123460",
    till_no: "213425",
    waiter_name: "John Doe",
    table_no: "5",
    bill_status: "active",
    amount_paid: "2000",
    total_amount: "3000",
    created_at: "2021-08-02",
  },
  {
    premise_name: "Kukito",
    receipt_no: "123461",
    till_no: "213426",
    waiter_name: "Jane Doe",
    table_no: "6",
    bill_status: "active",
    amount_paid: "2000",
    total_amount: "3000",
    created_at: "2021-08-02",
  },
  {
    premise_name: "Vanguard",
    receipt_no: "123462",
    till_no: "213427",
    waiter_name: "John Doe",
    table_no: "7",
    bill_status: "active",
    amount_paid: "2000",
    total_amount: "3000",
    created_at: "2021-08-02",
  },
  {
    premise_name: "Java",
    receipt_no: "123463",
    till_no: "213428",
    waiter_name: "Jane Doe",
    table_no: "8",
    bill_status: "active",
    amount_paid: "2000",
    total_amount: "3000",
    created_at: "2021-08-02",
  },
];
