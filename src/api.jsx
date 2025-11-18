// const API_URL = import.meta.env.VITE_API_URL || "https://kx8x1l-ip-82-3-162-166.tunnelmole.net"; 
const API_URL = import.meta.env.VITE_API_URL || "http://10.3.0.75:8000";

export async function getFiles() {
  fetch(`${API_URL}/speech`)
  .then(res => res.json())
  .then(data => console.log(data.files));
}

export async function getSpeech(features) {
  const response = await fetch(`${API_URL}/speech`, {
    // the response is now plain text
    method: "POST",
    body: features,
  })
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


