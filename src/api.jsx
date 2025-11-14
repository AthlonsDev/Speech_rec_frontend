const API_URL = import.meta.env.VITE_API_URL || "http://kx8x1l-ip-82-3-162-166.tunnelmole.net"; 

export async function getSpeech(features) {
  const response = await fetch(`${API_URL}/speech`, {
    // the response is now plain text
    method: "POST",
    body: features,
  });
  return await response.text();

}

export async function getSearch(features) {
  const response = await fetch(`${API_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features }),
  });
  return await response.json();
}


