const { mapArtwork, mapArtworks } = require('../src/utils/artworkMappers.ts')
const { aicArtworksResponse, aicArtworkResponse, vaArtworksResponse, vaArtworkResponse } = require('../test-data')

describe('mapArtworks', () => {
    it('should take two api responses and return an array of the combined artwork data from each', () => {

        const { data: aicData, config: aicConfig } = aicArtworksResponse
        const { records: vaData, info: vaInfo } = vaArtworksResponse

        const aicArtworks = aicData.map((artwork) => mapArtworks(artwork, 'aic', aicConfig))
        const vaArtworks = vaData.map((artwork) => mapArtworks(artwork, 'v&a', vaInfo))
        const artworks = [...aicArtworks, ...vaArtworks]

        expect(artworks.length).toBe(40)
        expect(typeof artworks).toBe("object")
        artworks.forEach((artwork) => {
            expect(artwork).toHaveProperty('id')
            expect(artwork).toHaveProperty('title')
            expect(artwork).toHaveProperty('artist')
            expect(artwork).toHaveProperty('medium')
            expect(artwork).toHaveProperty('date')
            expect(artwork).toHaveProperty('images')
            expect(artwork).toHaveProperty('images.iiif_url')
            expect(artwork).toHaveProperty('is_on_view')
            expect(artwork).toHaveProperty('gallery')
            expect(artwork).toHaveProperty('api')
        })
    })
    it('should not return null values for specified fields on artworks', () => {
        const { data: aicData, config: aicConfig } = aicArtworksResponse
        const { records: vaData, info: vaInfo } = vaArtworksResponse

        const aicArtworks = aicData.map((artwork) => mapArtworks(artwork, 'aic', aicConfig))
        const vaArtworks = vaData.map((artwork) => mapArtworks(artwork, 'v&a', vaInfo))
        const artworks = [...aicArtworks, ...vaArtworks]

        artworks.forEach((artwork) => {
            expect(artwork.id).not.toBe(null)
            expect(artwork.title).not.toBe(null)
            expect(artwork.artist).not.toBe(null)
            expect(artwork.medium).not.toBe(null)
            expect(artwork.date).not.toBe(null)
            expect(artwork.images.iiif_url).not.toBe(null)
            expect(artwork.images.alt_text).not.toBe(null)
            expect(artwork.is_on_view).not.toBe(null)
            expect(artwork.api === 'aic' || artwork.api === 'v&a').toBe(true)
        })
    });
});

describe('mapArtwork', () => {
  it('should return a formatted artwork object when passed an api response from AIC', () => {
    const artwork = mapArtwork(aicArtworkResponse, 'aic')

    expect(artwork).toHaveProperty('id')
    expect(artwork).toHaveProperty('title')
    expect(artwork).toHaveProperty('artist')
    expect(artwork).toHaveProperty('medium')
    expect(artwork).toHaveProperty('date')
    expect(artwork).toHaveProperty('images')
    expect(artwork).toHaveProperty('description')
    expect(artwork).toHaveProperty('place_of_origin')
    expect(artwork).toHaveProperty('dimensions')
    expect(artwork).toHaveProperty('is_on_view')
    expect(artwork).toHaveProperty('gallery')
    expect(artwork).toHaveProperty('location')
    expect(artwork).toHaveProperty('categories')
    expect(artwork).toHaveProperty('api')
    expect(artwork).toHaveProperty('images.alt_text')
    expect(artwork).toHaveProperty('images.iiif_url')
    expect(artwork).toHaveProperty('images.copyright')

    expect(typeof artwork).toBe('object')
  });
  it('should return a formatted artwork object when passed an api response from V&A api', () => {
    const artwork = mapArtwork(vaArtworkResponse, 'v&a')
    
    expect(artwork).toHaveProperty('id')
    expect(artwork).toHaveProperty('title')
    expect(artwork).toHaveProperty('artist')
    expect(artwork).toHaveProperty('medium')
    expect(artwork).toHaveProperty('date')
    expect(artwork).toHaveProperty('images')
    expect(artwork).toHaveProperty('description')
    expect(artwork).toHaveProperty('place_of_origin')
    expect(artwork).toHaveProperty('dimensions')
    expect(artwork).toHaveProperty('is_on_view')
    expect(artwork).toHaveProperty('location')
    expect(artwork).toHaveProperty('categories')
    expect(artwork).toHaveProperty('api')
    expect(artwork).toHaveProperty('images.alt_text')
    expect(artwork).toHaveProperty('images.iiif_url')
    expect(artwork).toHaveProperty('images.copyright')
  });

  it('should not return null values for specified fields', () => {
    const aicArtwork = mapArtwork(aicArtworkResponse, 'aic')

    expect(aicArtwork.id).not.toBe(null)
    expect(aicArtwork.title).not.toBe(null)
    expect(aicArtwork.medium).not.toBe(null)
    expect(aicArtwork.date).not.toBe(null)
    expect(aicArtwork.images).not.toBe(null)
    expect(aicArtwork.images.iiif_url).not.toBe(null)
    expect(aicArtwork.images.alt_text).not.toBe(null)
    expect(aicArtwork.place_of_origin).not.toBe(null)
    expect(aicArtwork.is_on_view).not.toBe(null)
    expect(aicArtwork.categories).not.toBe(null)
    expect(aicArtwork.api).not.toBe(null)

    const vaArtwork = mapArtwork(vaArtworkResponse, 'v&a')

    expect(vaArtwork.id).not.toBe(null)
    expect(vaArtwork.title).not.toBe(null)
    expect(vaArtwork.medium).not.toBe(null)
    expect(vaArtwork.date).not.toBe(null)
    expect(vaArtwork.images).not.toBe(null)
    expect(vaArtwork.images.iiif_url).not.toBe(null)
    expect(vaArtwork.images.alt_text).not.toBe(null)
    expect(vaArtwork.images.copyright).not.toBe(null)
    expect(vaArtwork.is_on_view).not.toBe(null)
    expect(vaArtwork.categories).not.toBe(null)
    expect(vaArtwork.api).not.toBe(null)
  });
});

