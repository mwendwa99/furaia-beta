import { getPremiseCode, getTableNumber } from "../utils/helper";

export function GetPremiseId(data) {
  const premiseCode = getPremiseCode(data);
  return premiseCode;
}

export function GetTableNumber(data) {
  const tableNumber = getTableNumber(data);
  return tableNumber;
}
