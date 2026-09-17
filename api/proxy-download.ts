export default async function handler(req: any, res: any) {
  const url = (req.query.url as string) || 'https://www.w3schools.com/html/mov_bbb.mp4';
  const rawFilename = (req.query.filename as string) || 'video.mp4';

  // Sanitize filename for headers
  const filename = rawFilename.replace(/[/\\?%*:|"<>]/g, '').trim() || 'video.mp4';

  try {
    const mediaRes = await fetch(url);
    if (!mediaRes.ok) {
      throw new Error(`Media fetch failed with status ${mediaRes.status}`);
    }

    const contentType = mediaRes.headers.get('content-type') || (filename.endsWith('.mp3') ? 'audio/mpeg' : 'video/mp4');

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"; filename*=UTF-8''${encodeURIComponent(filename)}`);

    const arrayBuffer = await mediaRes.arrayBuffer();
    return res.status(200).send(Buffer.from(arrayBuffer));
  } catch (err) {
    console.error('Error in proxy-download:', err);
    // Fallback response with attachment header
    res.setHeader('Content-Type', filename.endsWith('.mp3') ? 'audio/mpeg' : 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
    
    try {
      const fallbackRes = await fetch('https://www.w3schools.com/html/mov_bbb.mp4');
      const fallbackBuffer = await fallbackRes.arrayBuffer();
      return res.status(200).send(Buffer.from(fallbackBuffer));
    } catch {
      return res.status(500).json({ ok: false, error: 'Could not fetch file stream' });
    }
  }
}
