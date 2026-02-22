import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ExamLevel } from '../backend';

export function usePromoteStudent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ studentId, newLevel }: { studentId: string; newLevel: ExamLevel }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.promoteStudent(studentId, newLevel);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['student'] });
    },
  });
}
