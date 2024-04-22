export function getPremiseCode(str) {
  // get the second character of the string
  const premiseCode = str[1];
  return premiseCode;
}

export function getTableNumber(str) {
  //get the second last character of the string
  const tableNumber = str[str.length - 2];
  return tableNumber;
}

export function getMenuAttributes(menuData) {
  const attributes = [];

  // Iterate over each category
  Object.values(menuData.data).forEach((category) => {
    // Iterate over each item within the category
    category.forEach((item) => {
      // Iterate over each menu attribute of the item
      item.menu_attributes.forEach((attribute) => {
        // Extract relevant attributes and push them to the array
        const { price, name } = attribute;
        attributes.push({ price, name });
      });
    });
  });

  return attributes;
}

export function getAddons(attribute) {
  const addons = [];

  // Iterate over each menu attribute of the item
  attribute.forEach((attribute) => {
    // Extract relevant attributes and push them to the array
    const { price, name } = attribute;
    const quantity = 1;
    addons.push(`${quantity} ${name} ${price}`);
  });

  return addons;
}

export function formatOrderDate(dateString) {
  const orderDate = new Date(dateString);
  return orderDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// finds orders that have been accepted
export const findAcceptedOrder = (orders) => {
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].order_status === "accepted") {
      return orders[i];
    }
  }
  return null; // If no accepted order found
};
