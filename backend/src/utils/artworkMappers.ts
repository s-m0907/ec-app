export const mapArtworks = (data: any, source: string, config?: any) => {
  switch (source) {
    case 'aic': {
      const { id, title, artist_title, medium_display, date_display, thumbnail, image_id, is_on_view, gallery_title } = data;
      return {
        id,
        title,
        artist: artist_title || 'Unknown',
        medium: medium_display,
        date: date_display,
        images: {
          alt_text: thumbnail?.alt_text || null,
          iiif_url: `${config.iiif_url}/${image_id}/full/843,/0/default.jpg`,
        },
        is_on_view,
        gallery: is_on_view ? 'Art Institute Chicago': null,
        location: gallery_title || null,
        api: 'aic',
      }
    }

    case 'v&a': {
      const { systemNumber, _primaryTitle, _primaryMaker, objectType, _primaryDate, _images, _currentLocation } = data;
      const locations = {"VA": "V&A South Kensington", "WED": "V&A Wedgwood", "YVA": "Young V&A", "dundee": "V&A Dundee"}
      const artist = _primaryMaker?.name || _primaryMaker[0]?.name || 'Unknown'
      
      return {
        id: systemNumber,
        title: _primaryTitle,
        artist: _primaryMaker?.name || _primaryMaker[0]?.name || 'Unknown',
        medium: objectType,
        date: _primaryDate,
        images: {
          alt_text: `An image of ${_primaryTitle || objectType} by ${artist}`,
          iiif_url: `${_images?._iiif_image_base_url}full/full/0/default.jpg` || null,
        },
        is_on_view: _currentLocation.onDisplay,
        gallery: locations[_currentLocation.site],
        location: _currentLocation.displayName,
        api: 'v&a',
      };
    }

    default:
      throw new Error(`Unknown source: ${source}`)
  }
};

export const mapArtwork = (response: any, source: string) => {
  switch (source) {
    case 'aic': {
      const {data, config, info} = response
      const { id, title, artist_title, medium_display, date_display, thumbnail, image_id, description, short_description, place_of_origin, dimensions, is_on_view, gallery_title, category_titles, style_titles, copyright_notice } = data;

      return {
        id,
        title,
        artist: artist_title,
        medium: medium_display,
        date: date_display,
        images: {
          alt_text: thumbnail?.alt_text || null,
          iiif_url: `${config.iiif_url}/${image_id}/full/843,/0/default.jpg`,
          copyright: copyright_notice
        },
        description: description?.replace(/<\/?[^>]+(>|$)/g, "") || short_description?.replace(/<\/?[^>]+(>|$)/g, "") || null,
        place_of_origin,
        dimensions,
        is_on_view,
        gallery: is_on_view ? 'Art Institute Chicago': null,
        location: gallery_title || null,
        categories: [...category_titles, ...style_titles],
        api: 'aic',
      }
    }

    case 'v&a': {
      const {record, meta} = response
      const { systemNumber, titles, artistMakerPerson, artistMakerPeople, artistMakerOrganisations, objectType, productionDates, summaryDescription, physicalDescription, placesOfOrigin, dimensions, galleryLocations, categories } = record
      const title = titles?.[0]?.title || record.title || null
      const artist = artistMakerPerson?.[0]?.name?.text || artistMakerPeople?.[0]?.name?.text || artistMakerOrganisations?.[0]?.name?.text || null
 
      return {
        id: systemNumber,
        title: title,
        artist: artist,
        medium: objectType || null,
        date: productionDates?.[0]?.date?.text || null,
        images: {
          alt_text: `An image of ${title} by ${artist}`,
          iiif_url: `${meta.images?._iiif_image}full/full/0/default.jpg` || null,
          copyright: meta.images._images_meta?.copyright || meta.images._images_meta?.[0].copyright
        },
        description: summaryDescription?.replace(/<\/?[^>]+(>|$)/g, "") || physicalDescription?.replace(/<\/?[^>]+(>|$)/g, "") || null,
        place_of_origin: placesOfOrigin?.[0]?.place?.text || null,
        dimensions: dimensions?.map(dimension => `${dimension.dimension}: ${dimension.value}${dimension.unit}`).join(', ') || null,
        is_on_view: !!galleryLocations?.length || null,
        location: galleryLocations[0].current.text || null,
        gallery: '',
        categories: categories?.map(category => category.text) || null,
        api: 'v&a',
      }
    }

    default:
      throw new Error(`Unknown source: ${source}`)
  }
}