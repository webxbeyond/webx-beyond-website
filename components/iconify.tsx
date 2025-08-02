'use client';

import type { IconProps } from '@iconify/react';
import { forwardRef } from 'react';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

export type IconifyProps = React.ComponentProps<typeof Icon> & IconProps;

export const Iconify = forwardRef<SVGSVGElement, IconifyProps>((props, ref) => {
  const { className, width = 20, ...other } = props;

  const baseStyles = {
    width,
    height: width,
    flexShrink: 0,
    display: 'inline-flex',
  };

  return (
    <Icon
      ref={ref}
      className={['iconify__root', className].filter(Boolean).join(' ')}
      style={baseStyles}
      {...other}
    />
  );
});

Iconify.displayName = 'Iconify';
