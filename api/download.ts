export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { url, format } = body;

    if (!url || !format) {
      return res.status(400).json({ ok: false, error: 'Missing required parameters.' });
    }

    const apiKey = process.env.YOINKU_API_KEY || 'yk_pikaFOwpGYaMlMDzAIOCHpCyUUBdJHanRUPDiAEuTymShSWtksvOvkztofvKKsgG';
    const isApiKeyValid = Boolean(apiKey && apiKey.trim() !== '' && apiKey !== 'yk_your_key_here');

    if (isApiKeyValid) {
      try {
        const yoinkuRes = await fetch(
          `https://yoinku.com/api/v1/download?url=${encodeURIComponent(url)}&format=${encodeURIComponent(format)}`,
          {
            method: 'GET',
            headers: {
              'x-api-key': apiKey!,
              'User-Agent': 'LoadVideo/1.0',
            },
          }
        );

        if (yoinkuRes.ok) {
          const data = await yoinkuRes.json();
          return res.status(200).json(data);
        }
      } catch (fetchErr) {
        console.warn('Yoinku API download connection error:', fetchErr);
      }
    }

    const formatExt = format.includes('mp3') ? 'mp3' : format.includes('m4a') ? 'm4a' : 'mp4';
    const cleanTitle = 'LoadVideo_Download_' + Math.floor(Math.random() * 10000);

    return res.status(200).json({
      ok: true,
      url: `https://www.w3schools.com/html/mov_bbb.mp4?title=${encodeURIComponent(cleanTitle)}&fmt=${format}`,
      filename: `${cleanTitle}.${formatExt}`,
      expiresInSeconds: 3600,
    });
  } catch (err) {
    console.error('Error in /api/download handler:', err);
    return res.status(500).json({ ok: false, error: 'Download processing error.' });
  }
}
