import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { StudentView } from '../backend';

export function useSearchStudents(searchTerm: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<StudentView[]>({
    queryKey: ['students', searchTerm],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchStudentsByName(searchTerm);
    },
    enabled: !!actor && !actorFetching,
  });
}
