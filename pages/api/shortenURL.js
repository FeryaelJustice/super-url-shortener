export default async function handler(req, res) {
  const { url } = req.body;
  const shortURL = Math.random().toString(36).substr(2, 5);
  res.status(200).send({ url, shortURL })
}
