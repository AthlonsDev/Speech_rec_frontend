// const API_URL = import.meta.env.VITE_API_URL || "http://10.3.0.68:8000";
// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"; //using temp cloudlfare tunnel
// const API_URL = import.meta.env.VITE_API_URL || "https://bwzro20307.execute-api.eu-west-2.amazonaws.com/Stage_01";
const API_URL = import.meta.env.VITE_API_URL || "https://m67kummn2c.execute-api.eu-west-2.amazonaws.com/test1";


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


export async function downloadDocument(filename) {
  const response = await fetch(`${API_URL}/download/${encodeURIComponent(filename)}`);
  return response;
}

export async function getBuckets() {
  const response = await fetch(`${API_URL}/buckets`);
  if (!response.ok) {
    throw new Error('Failed to fetch buckets');
  }
  return await response.json();
}

export async function uploadFile(file, modelType) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('model_type', modelType);

  const response = await fetch(`${API_URL}/speech`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error('File upload failed');
  }

  return await response.text();
}

export async function generateDoc(text) {
  const response = await fetch(`${API_URL}/gendoc/${encodeURIComponent(text)}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text }),});
  if (!response.ok) {
    throw new Error('Document generation failed');
  }
  return await response.text(); }


export async function startServer() {
  const response = await fetch(`${API_URL}/start`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error('Failed to start server');
  }
  return await response.json();
}


