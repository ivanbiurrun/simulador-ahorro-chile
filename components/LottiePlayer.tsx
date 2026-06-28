'use client';
import { useReducedMotion } from 'framer-motion';
import Lottie from 'lottie-react';

interface LottiePlayerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationData: any;
  loop?: boolean;
  style?: React.CSSProperties;
  className?: string;
  fallback?: React.ReactNode;
}

export default function LottiePlayer({
  animationData,
  loop = true,
  style,
  className,
  fallback,
}: LottiePlayerProps) {
  const reduced = useReducedMotion();
  if (reduced) return <>{fallback ?? null}</>;

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay
      style={style}
      className={className}
      rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
    />
  );
}
