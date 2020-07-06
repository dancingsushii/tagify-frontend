import React, { ReactNode } from 'react';

import { Button, ButtonProps } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';

interface ProgressButtonProps extends ButtonProps {
  children: ReactNode;
  style?: CSSProperties;
  progress: number;
  onProgress: (number) => string;
  onSuccess: ReactNode;
  primary: string;
  secondary: string;
  fadeWidth: number;
}

export function ProgressButton({
  children,
  style,
  progress,
  onProgress,
  onSuccess,
  primary,
  secondary,
  fadeWidth,
  ...rest
}: ProgressButtonProps) {
  return (
    <Button
      style={{
        background: `linear-gradient(90deg, ${secondary} ${
          progress - fadeWidth + (fadeWidth * progress) / 100
        }%, ${primary} ${progress + (fadeWidth * progress) / 100}%)`,
        ...style,
      }}
      {...rest}
    >
      {(() => {
        if (progress === 0) {
          return children;
        } else if (progress === 100) {
          return onSuccess;
        } else {
          return onProgress(progress);
        }
      })()}
    </Button>
  );
}
