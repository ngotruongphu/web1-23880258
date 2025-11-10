export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { 'g-token': token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Missing token' });
  }

  const secretKey = '6LdD8wcsAAAAAJP1Z1syZo_yR9kKO6tt7y0IDELJ';
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secretKey}&response=${token}`,
  });
  const data = await response.json();

  if (data.success && data.action === 'submit' && data.score >= 0.5) {
    return res.status(200).json(data);
  } else {
    return res.status(401).json(data);
  }
}
