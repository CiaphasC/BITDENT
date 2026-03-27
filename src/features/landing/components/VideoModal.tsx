import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';

import { media } from '@/features/landing/data/content';
import { CloseIcon } from '@/shared/ui/icons';

interface VideoModalProps {
  isOpen: boolean;
  originRef: RefObject<HTMLElement | null>;
  onClose: () => void;
}

const VIDEO_IFRAME_AUTOPLAY = media.videoEmbed.replace('autoplay=0', 'autoplay=1');

export const VideoModal = ({ isOpen, originRef, onClose }: VideoModalProps) => {
  const modalRootRef = useRef<HTMLDivElement | null>(null);
  const modalBackgroundRef = useRef<HTMLDivElement | null>(null);
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const modalCloseRef = useRef<HTMLButtonElement | null>(null);
  const modalCoverRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useLayoutEffect(() => {
    const originNode = originRef.current;
    const modalRoot = modalRootRef.current;
    const modalBackground = modalBackgroundRef.current;
    const modalContent = modalContentRef.current;
    const modalCloseButton = modalCloseRef.current;
    const modalCover = modalCoverRef.current;

    if (
      !originNode ||
      !modalRoot ||
      !modalBackground ||
      !modalContent ||
      !modalCloseButton ||
      !modalCover
    ) {
      return;
    }

    const targetRect = originNode.getBoundingClientRect();
    gsap.killTweensOf([modalRoot, modalBackground, modalContent, modalCloseButton, modalCover]);

    const timeline = gsap.timeline();

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(modalRoot, { display: 'block' });

      gsap.set(modalContent, {
        top: targetRect.top,
        left: targetRect.left,
        width: targetRect.width,
        height: targetRect.height,
        xPercent: 0,
        yPercent: 0,
        opacity: 1,
        borderRadius: 0,
      });
      gsap.set(modalBackground, { opacity: 0 });
      gsap.set(modalCloseButton, { opacity: 0 });
      gsap.set(modalCover, { opacity: 1 });

      timeline
        .to(modalBackground, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
        .to(
          modalContent,
          {
            top: '50%',
            left: '50%',
            xPercent: -50,
            yPercent: -50,
            width: window.innerWidth > 768 ? '80vw' : '95vw',
            height: window.innerWidth > 768 ? '80vh' : '50vh',
            borderRadius: 16,
            duration: 0.7,
            ease: 'power3.inOut',
          },
          0,
        )
        .to(modalCloseButton, { opacity: 1, duration: 0.3 }, '-=0.1')
        .to(modalCover, { opacity: 0, duration: 0.5 }, '-=0.25');
    } else {
      if (modalRoot.style.display === 'none') {
        return;
      }

      timeline
        .to(modalCloseButton, { opacity: 0, duration: 0.2 }, 0)
        .to(modalCover, { opacity: 1, duration: 0.3 }, 0)
        .to(modalBackground, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 0)
        .to(
          modalContent,
          {
            top: targetRect.top,
            left: targetRect.left,
            width: targetRect.width,
            height: targetRect.height,
            xPercent: 0,
            yPercent: 0,
            borderRadius: 0,
            duration: 0.7,
            ease: 'power3.inOut',
            onComplete: () => {
              gsap.set(modalRoot, { display: 'none' });
              document.body.style.overflow = '';
            },
          },
          0,
        );
    }

    return () => {
      timeline.kill();
    };
  }, [isOpen, originRef]);

  useEffect(
    () => () => {
      document.body.style.overflow = '';
    },
    [],
  );

  return (
    <div
      className="fixed inset-0 z-[100]"
      id="video-modal"
      ref={modalRootRef}
      style={{ display: 'none' }}
    >
      <div
        className="absolute inset-0 cursor-pointer bg-midnight-900/90 backdrop-blur-md"
        id="video-modal-bg"
        onClick={onClose}
        ref={modalBackgroundRef}
      />

      <div
        className="absolute overflow-hidden bg-black shadow-2xl"
        id="video-modal-content"
        ref={modalContentRef}
      >
        <button
          className="absolute top-4 right-4 z-50 p-2 text-white/70 transition-colors duration-300 hover:text-white focus:outline-none md:top-6 md:right-6"
          id="video-modal-close"
          onClick={onClose}
          ref={modalCloseRef}
          type="button"
        >
          <CloseIcon className="h-8 w-8" />
        </button>

        <div className="relative h-full w-full" id="video-iframe-container">
          <img
            alt="Doctor dental"
            className="absolute inset-0 z-10 h-full w-full object-cover brightness-[0.55] contrast-[1.15] saturate-[0.4] transition-opacity duration-700"
            id="video-modal-cover"
            ref={modalCoverRef}
            src={media.heroDoctor}
          />

          <iframe
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 z-0 h-full w-full"
            src={isOpen ? VIDEO_IFRAME_AUTOPLAY : media.videoEmbed}
            title="Video explicativo del tratamiento"
          />
        </div>
      </div>
    </div>
  );
};
