import { useEffect, useState } from 'react';

export default function ClientOnly({ children, ...delegated }: { children: any }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <div {...delegated}>{children}</div>;
}
