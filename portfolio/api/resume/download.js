export default function handler(req, res) {
  if (req.method && !['GET', 'HEAD'].includes(req.method.toUpperCase())) {
    res.setHeader('Allow', 'GET, HEAD');
    res.status(405).end();
    return;
  }

  res.setHeader('Location', '/resume.pdf');
  res.status(302).end();
}
