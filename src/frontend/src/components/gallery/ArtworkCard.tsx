import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Artwork } from '../../backend';

interface ArtworkCardProps {
  artwork: Artwork;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const imageUrl = artwork.image.getDirectURL();
  const levelDisplay = artwork.level.replace('Year', 'Year ');

  return (
    <Card className="overflow-hidden border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-xl">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={artwork.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{artwork.title}</h3>
        <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
          {levelDisplay}
        </Badge>
      </CardContent>
    </Card>
  );
}
