const API_KEY = "AIzaSyCHOeqCmuFf3JaG3cAQMcPNge9e3SoS5bE";

export async function getCoordsFromFunction(address) {
  const urlAddress = encodeURI(address);
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${API_KEY}`
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
