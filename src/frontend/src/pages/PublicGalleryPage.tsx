import { useGetPublicArtworks } from '../hooks/usePublicGallery';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import ArtworkCard from '../components/gallery/ArtworkCard';

export default function PublicGalleryPage() {
  const { data: artworks, isLoading } = useGetPublicArtworks();

  return (
    <div className="w-full py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Student Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the amazing artwork created by our talented students
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          </div>
        ) : !artworks || artworks.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Artworks Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Our gallery is being curated. Check back soon to see amazing artwork from our
              students!
            </p>
            <img
              src="/assets/generated/gallery-placeholder.dim_400x300.png"
              alt="Gallery Placeholder"
              className="w-full max-w-md mx-auto mt-8 rounded-2xl shadow-xl"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
