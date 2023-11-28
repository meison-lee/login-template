export async function validateToken(token) {
  return fetch('http://localhost:4000/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    return data;
  })
  .catch(error => {
    console.error('Error validating token:', error);
    return false;
  });
}
