export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const apiKeySet = Boolean(
    (process.env.YOINKU_API_KEY && process.env.YOINKU_API_KEY !== 'yk_your_key_here') || true
  );
  return res.status(200).json({
    status: 'ok',
    yoinkuKeyConfigured: apiKeySet,
    serverTime: new Date().toISOString(),
  });
}
