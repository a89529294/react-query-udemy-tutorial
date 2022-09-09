import { useQuery, useQueryClient } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';

const fallback = [];

export async function getTreatments(): Promise<Treatment[]> {
  await new Promise((r) => setTimeout(r, 2000));
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  const { data = fallback } = useQuery(queryKeys.treatments, getTreatments);
  return data;
}

export function usePrefetchTreaments(): Promise<void> {
  const queryClient = useQueryClient();
  return queryClient.prefetchQuery(queryKeys.treatments, getTreatments);
}
