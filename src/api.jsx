const API_URL = import.meta.env.VITE_API_URL || "https://m67kummn2c.execute-api.eu-west-2.amazonaws.com/test1/"; //Development Gateway
// const API_URL = import.meta.env.VITE_API_URL || "https://isz1kwk4y1.execute-api.eu-west-2.amazonaws.com"; //Production Gateway

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


