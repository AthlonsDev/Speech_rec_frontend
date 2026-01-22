const API_URL = import.meta.env.VITE_API_URL || "http://10.3.0.68:8000";

export async function getRoot() {
  const response =  await fetch(`${API_URL}/`);
  return await response.json();
}

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

export async function saveDocument(transcription) {
  const response = await fetch(`${API_URL}/save_document`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcription }),
  });
  return await response.blob();
}





export async function getSearch(features) {
  const response = await fetch(`${API_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features }),
  });
  return await response.json();
}


