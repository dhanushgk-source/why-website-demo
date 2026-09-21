/**
 * Converts Google Drive sharing links AND googleusercontent URLs into direct high-performance image URLs
 */
export function formatGoogleDriveUrl(url) {
  if (!url || typeof url !== 'string') return url || '';

  const trimmed = url.trim();

  let fileId = null;
  if (trimmed.includes('drive.google.com') || trimmed.includes('docs.google.com') || trimmed.includes('googleusercontent.com')) {
    const matchD = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    const matchLh3 = trimmed.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
    const matchId = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);

    if (matchD && matchD[1]) {
      fileId = matchD[1];
    } else if (matchLh3 && matchLh3[1]) {
      fileId = matchLh3[1];
    } else if (matchId && matchId[1]) {
      fileId = matchId[1];
    }

    if (fileId) {
      // Use direct stream CDN endpoint which works with referrerPolicy="no-referrer"
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }

  return trimmed;
}

/**
 * Extracts YouTube Video ID and returns clean embed iframe URL
 */
export function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  let videoId = '';
  if (trimmed.includes('youtu.be/')) {
    videoId = trimmed.split('youtu.be/')[1]?.split('?')[0]?.split('&')[0];
  } else if (trimmed.includes('youtube.com/watch')) {
    const searchParams = new URLSearchParams(trimmed.split('?')[1] || '');
    videoId = searchParams.get('v') || trimmed.split('v=')[1]?.split('&')[0];
  } else if (trimmed.includes('youtube.com/embed/')) {
    videoId = trimmed.split('embed/')[1]?.split('?')[0]?.split('&')[0];
  } else if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    videoId = trimmed;
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  }
  return trimmed;
}
