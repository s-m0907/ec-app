const { mapArtwork, mapArtworks } = require('../src/utils/artworkMappers.ts')
const { aicArtworksResponse, vaArtworksResponse } = require('../test-data')

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
});

