import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ExamLevel } from '../backend';
import { ExternalBlob } from '../backend';

interface SubmitAdmissionParams {
  studentName: string;
  guardianName: string;
  level: ExamLevel;
  artwork: ExternalBlob;
}

export function useSubmitAdmission() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (params: SubmitAdmissionParams) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitAdmissionForm(
        params.studentName,
        params.guardianName,
        params.level,
        params.artwork
      );
    },
  });
}
