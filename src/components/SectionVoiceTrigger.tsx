import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useVoiceGuideContext } from './VoiceGuideProvider';

interface Props {
  sectionId: string;
  message: string;
  children: React.ReactNode;
}

const SectionVoiceTrigger = ({ sectionId, message, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  const { playSectionGuide, greetingDone } = useVoiceGuideContext();

  const isInView = useInView(ref, {
    margin: "-30% 0px -30% 0px",
    once: true,
  });

  useEffect(() => {
    if (isInView && greetingDone && !triggered.current) {
      triggered.current = true;
      playSectionGuide(sectionId, message);
    }
  }, [isInView, greetingDone, sectionId, message, playSectionGuide]);

  return <div ref={ref}>{children}</div>;
};

export default SectionVoiceTrigger;
