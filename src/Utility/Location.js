export async function getAddressFromCoords(coords) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${process.env.API_KEY}`
  );
  console.log(process.env.API_KEY);
  if (!response.ok) {
    throw new Error("Failed to fetch address. Please try again!");
  }

  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }

  const address = data.results[0].formatted_address;
  return address;
}

export async function getCoordsFromFunction(address) {
  const urlAddress = encodeURI(address);
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${process.env.API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coordinates. Please try again!");
  }

  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }

  const coordinates = data.results[0].geometry.location;
  return coordinates;
}
