// const API_URL = import.meta.env.VITE_API_URL || "https://s5fzof-ip-13-40-107-140.tunnelmole.net"; 
const API_URL = import.meta.env.VITE_API_URL || "https://sjuwom5xfc.execute-api.eu-west-2.amazonaws.com/";

export async function getFiles() {
  fetch(`${API_URL}/speech`)
  .then(res => res.json())
  .then(data => console.log(data.files));
}

export async function getSpeech(features) {
  const response = await fetch(`${API_URL}/speech`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof features === 'string' ? features : JSON.stringify(features),
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


