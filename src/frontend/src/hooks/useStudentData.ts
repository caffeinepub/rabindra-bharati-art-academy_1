import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { StudentView } from '../backend';

export function useGetStudent(studentId: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<StudentView | null>({
    queryKey: ['student', studentId],
    queryFn: async () => {
      if (!actor || !studentId) return null;
      return actor.getStudent(studentId);
    },
    enabled: !!actor && !actorFetching && !!studentId,
  });
}
