import { useRef, useState } from 'react';

import { heroContent, media, mediaAltText } from '@/features/landing/data/content';
import { useHeroKnotScene } from '@/features/landing/hooks/useHeroKnotScene';
import { LuxuryButton } from '@/shared/ui/LuxuryButton';
import { PlayIcon, WhatsAppIcon } from '@/shared/ui/icons';

import { VideoModal } from './VideoModal';

export const HeroSection = () => {
  const threeCanvasRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const openVideoModal = () => {
    setIsVideoOpen(true);
  };

  useHeroKnotScene(threeCanvasRef);

  return (
    <>
      <header
        className="relative isolate flex min-h-screen flex-col pt-24 lg:flex-row lg:pt-0"
        id="hero-section"
      >
        <div className="pointer-events-none absolute inset-0 z-0 w-full overflow-hidden lg:w-1/2">
          <div id="three-canvas-container" ref={threeCanvasRef} />
        </div>

        <div className="relative z-10 flex w-full flex-col justify-center bg-pearl/60 px-8 py-20 backdrop-blur-sm md:px-16 lg:w-[55%] lg:bg-transparent lg:px-24 lg:backdrop-blur-none">
          <div className="mb-6 overflow-hidden">
            <p className="animate-reveal text-[10px] font-display font-medium tracking-[0.4em] text-verde-600 uppercase md:text-xs">
              {heroContent.eyebrow}
            </p>
          </div>

          <h1 className="mb-8 text-4xl leading-[1.2] font-serif font-light text-midnight-900 md:text-5xl lg:text-6xl">
            <span className="block overflow-hidden">
              <span className="animate-reveal block">{heroContent.title.line1}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="animate-reveal block">
                {heroContent.title.line2Prefix}
                <span className="italic text-verde-500">{heroContent.title.line2Highlight}</span>
                {heroContent.title.line2Suffix}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="animate-reveal block">{heroContent.title.line3}</span>
            </span>
          </h1>

          <div className="mb-12 overflow-hidden">
            <p className="animate-reveal max-w-lg text-base leading-relaxed font-light text-stone-500 md:text-lg">
              <strong className="font-semibold text-midnight-900">
                {heroContent.description.strongStart}
              </strong>
              {heroContent.description.textBeforeMiddle}
              <strong className="font-semibold text-midnight-900">
                {heroContent.description.strongMiddle}
              </strong>
              {heroContent.description.textBeforeEnd}
              <strong className="font-semibold text-midnight-900">
                {heroContent.description.strongEnd}
              </strong>
              {heroContent.description.textAfterEnd}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 overflow-hidden">
            <div className="animate-reveal">
              <LuxuryButton
                className="px-8 py-4"
                href={heroContent.ctaPrimaryHref}
                icon={
                  <WhatsAppIcon className="h-5 w-5 text-verde-500 transition-colors duration-500 group-hover:text-white" />
                }
                variant="solid"
              >
                {heroContent.ctaPrimaryLabel}
              </LuxuryButton>
            </div>

            <div className="animate-reveal hidden md:block">
              <button
                className="flex items-center gap-2 border-b border-midnight-900 pb-1 text-xs font-display tracking-widest text-midnight-900 uppercase transition-all hover:border-verde-500 hover:text-verde-500"
                onClick={openVideoModal}
                type="button"
              >
                <PlayIcon className="h-4 w-4" />
                {heroContent.ctaVideoLabel}
              </button>
            </div>
          </div>
        </div>

        <div
          className="editorial-img-wrapper relative h-[60vh] w-full overflow-hidden lg:h-screen lg:w-[45%]"
          id="video"
          ref={videoSectionRef}
        >
          <img
            alt={mediaAltText.heroDoctor}
            className="absolute top-[-20%] left-0 h-[140%] w-full object-cover object-center brightness-[0.55] contrast-[1.15] saturate-[0.4]"
            id="video-parallax"
            src={media.heroDoctor}
          />

          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-midnight-900/90 via-midnight-900/10 to-midnight-900/30 mix-blend-multiply" />

          <button
            className="scroll-reveal group absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center"
            id="play-video-btn"
            onClick={openVideoModal}
            type="button"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2a2d34] shadow-elevated transition-colors duration-300 group-hover:bg-[#2d6a4f] md:h-20 md:w-20">
              <PlayIcon className="ml-1 h-6 w-6 text-white" />
            </span>
            <span className="mt-6 translate-y-2 text-[10px] font-display font-medium tracking-[0.2em] text-white uppercase opacity-0 drop-shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:text-xs">
              {heroContent.videoOverlay.playLabel}
            </span>
          </button>

          <div className="pointer-events-none absolute right-8 bottom-8 left-8 z-20 flex flex-col gap-4">
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full bg-[#2d6a4f]"
                style={{ width: `${heroContent.videoOverlay.progressWidthPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs font-display font-medium tracking-widest text-white uppercase drop-shadow-md">
              <span>{heroContent.videoOverlay.doctorName}</span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />{' '}
                {heroContent.videoOverlay.duration}
              </span>
            </div>
          </div>
        </div>
      </header>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => {
          setIsVideoOpen(false);
        }}
        originRef={videoSectionRef}
      />
    </>
  );
};
