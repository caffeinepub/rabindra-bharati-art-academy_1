import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ExamLevel } from '../backend';
import { ExternalBlob } from '../backend';

interface UploadArtworkParams {
  title: string;
  artistId: string;
  level: ExamLevel;
  isPublic: boolean;
  image: ExternalBlob;
}

export function useUploadArtwork() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UploadArtworkParams) => {
      if (!actor) throw new Error('Actor not available');
      return actor.uploadArtwork(
        params.title,
        params.artistId,
        params.level,
        params.isPublic,
        params.image
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publicArtworks'] });
    },
  });
}
