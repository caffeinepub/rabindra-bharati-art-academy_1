import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Artwork } from '../backend';

export function useGetPublicArtworks() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Artwork[]>({
    queryKey: ['publicArtworks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublicArtworks();
    },
    enabled: !!actor && !actorFetching,
  });
}
