export const mapArtwork = (item, source) => {
    if (source === 'aic') {

      return {
        id: item.id,
        title: item.title,
        artist: item.artist_title,
        medium: item.medium_display,
        date: item.date_display,
        images: {
          lqip: item.thumbnail?.lqip || null,
          alt_text: item.thumbnail?.alt_text || null,
        },
        api: 'aic',
      };
    } else if (source === 'v&a') {

      return {
        id: item.systemNumber,
        title: item._primaryTitle,
        artist: item._primaryMaker?.name || null,
        medium: item.objectType,
        date: item._primaryDate,
        images: {
          thumbnail: item._images?._primary_thumbnail || null,
        },
        api: 'v&a',
      };
    }
  
    throw new Error(`Unknown source: ${source}`);
  };