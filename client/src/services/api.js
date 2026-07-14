async function request(path, options = {}) {
  const response = await fetch(path, { headers: { 'Content-Type': 'application/json' }, ...options });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || 'The dream archive is taking a little nap.');
  return body;
}

export const getDreams = () => request('/api/dreams');
export const createDream = (dream) => request('/api/dreams', { method: 'POST', body: JSON.stringify(dream) });
