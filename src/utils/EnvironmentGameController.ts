export type EnvironmentInfo = {
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isDesktop: boolean;
  isSafari: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isEdge: boolean;
  isOpera: boolean;
  isTouchDevice: boolean;
  isWebGLSupported: boolean;
  isPortrait: boolean;
  userAgent: string;
};

export function getEnvironmentInfo(): EnvironmentInfo {
  const ua = navigator.userAgent;

  const isMobile = /Android|iPhone|iPad|iPod|Windows Phone|webOS/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isDesktop = !isMobile;

  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isEdge = /Edg/i.test(ua);
  const isChrome = /Chrome/i.test(ua) && !isEdge;
  const isFirefox = /Firefox/i.test(ua);
  const isOpera = /OPR/i.test(ua);

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const isWebGLSupported =
    !!(window.WebGLRenderingContext &&
      document.createElement('canvas').getContext('webgl'));

  const isPortrait = window.innerHeight > window.innerWidth;

  return {
    isMobile,
    isIOS,
    isAndroid,
    isDesktop,
    isSafari,
    isChrome,
    isFirefox,
    isEdge,
    isOpera,
    isTouchDevice,
    isWebGLSupported,
    isPortrait,
    userAgent: ua,
  };
}
