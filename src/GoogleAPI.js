const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}`;
document.head.insertBefore(script, document.head.querySelector("script"));
