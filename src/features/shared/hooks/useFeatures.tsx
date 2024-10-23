import { useCallback } from 'react';
import useUser from '~/contexts/User/useUser';

export default function useFeatures() {
  const { features } = useUser();

  const isEnabled = useCallback((key: string) => features[key] === true, [features]);
  const getValue = useCallback((key: string) => features[key], [features]);

  return {
    isEnabled,
    getValue
  };
}
