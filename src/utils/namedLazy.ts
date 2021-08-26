import { lazy } from 'react';

export const namedLazy = (resolver: any, name = 'default') => {
  return lazy(async () => {
    const resolved = await resolver();
    return { default: resolved[name] };
  });
};
