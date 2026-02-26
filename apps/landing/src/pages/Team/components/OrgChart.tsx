import { motion, useMotionValue } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { User, UserNode } from '@/data/users';
import { buildHierarchy } from '@/utils/users';
import { TeamMemberCard } from './TeamMemberCard';

interface OrgChartProps {
  users: User[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const CARD_WIDTH = 160;
const GAP = 12;

function getSubtreeWidth(node: UserNode): number {
  if (node.children.length === 0) {
    return CARD_WIDTH;
  }
  const childrenWidth = node.children.reduce((sum, child) => sum + getSubtreeWidth(child), 0);
  const gaps = (node.children.length - 1) * GAP;
  return Math.max(CARD_WIDTH, childrenWidth + gaps);
}

function OrgChartNode({ node, index }: { node: UserNode; index: number }) {
  const hasChildren = node.children.length > 0;
  const subtreeWidth = getSubtreeWidth(node);

  const childWidths = node.children.map(child => getSubtreeWidth(child));
  const totalChildrenWidth = hasChildren
    ? childWidths.reduce((sum, w) => sum + w, 0) + (node.children.length - 1) * GAP
    : 0;

  return (
    <div className="flex flex-col items-center" style={{ width: subtreeWidth }}>
      <TeamMemberCard index={index} user={node} />

      {hasChildren && (
        <div className="flex flex-col items-center w-full">
          <div className="h-5 w-0.5 bg-slate-300" />

          <div className="relative" style={{ width: totalChildrenWidth }}>
            {node.children.length > 1 && (
              <div
                className="absolute top-0 h-0.5 bg-slate-300"
                style={{
                  left: childWidths[0] / 2,
                  right: childWidths[childWidths.length - 1] / 2,
                }}
              />
            )}

            <div className="flex items-start" style={{ gap: GAP }}>
              {node.children.map((child, childIndex) => (
                <div className="flex flex-col items-center" key={child.id} style={{ width: childWidths[childIndex] }}>
                  <div className="h-5 w-0.5 bg-slate-300" />
                  <OrgChartNode index={childIndex} node={child} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OrgChart({ users }: OrgChartProps) {
  const hierarchy = buildHierarchy(users);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [fitScale, setFitScale] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const contentWidth = contentRef.current.scrollWidth;
      const contentHeight = contentRef.current.scrollHeight;

      const scaleX = (container.width - 32) / contentWidth;
      const scaleY = (container.height - 32) / contentHeight;
      const calculatedFitScale = Math.min(scaleX, scaleY) * 0.95;

      setFitScale(calculatedFitScale);
      setZoomLevel(1);

      const offsetX = (container.width - contentWidth * calculatedFitScale) / 2;
      const offsetY = (container.height - contentHeight * calculatedFitScale) / 2;
      x.set(offsetX);
      y.set(offsetY);
    }
  }, [users, x, y]);

  const actualScale = fitScale * zoomLevel;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setZoomLevel(prev => Math.min(Math.max(prev * delta, 1), 3));
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const resetView = useCallback(() => {
    if (containerRef.current && contentRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const contentWidth = contentRef.current.scrollWidth;
      const contentHeight = contentRef.current.scrollHeight;

      setZoomLevel(1);

      const offsetX = (container.width - contentWidth * fitScale) / 2;
      const offsetY = (container.height - contentHeight * fitScale) / 2;
      x.set(offsetX);
      y.set(offsetY);
    }
  }, [fitScale, x, y]);

  return (
    <div className="relative">
      <div className="absolute -left-20 top-20 h-40 w-40 rounded-full bg-brand-yellow/10 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-40 w-40 rounded-full bg-brand-pink/10 blur-3xl" />

      <div
        className="relative h-[70vh] min-h-[500px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm touch-none"
        ref={containerRef}
      >
        <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md transition-all hover:bg-slate-50 hover:shadow-lg"
            onClick={() => setZoomLevel(prev => Math.min(prev * 1.2, 3))}
            type="button"
          >
            <span className="text-xl font-bold text-slate-600">+</span>
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md transition-all hover:bg-slate-50 hover:shadow-lg"
            onClick={() => setZoomLevel(prev => Math.max(prev * 0.8, 1))}
            type="button"
          >
            <span className="text-xl font-bold text-slate-600">−</span>
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-md transition-all hover:bg-slate-50 hover:shadow-lg"
            onClick={resetView}
            type="button"
          >
            <span className="text-xs font-bold text-slate-600">FIT</span>
          </button>
        </div>

        <div className="absolute bottom-4 left-4 z-20 rounded-lg bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
          {Math.round(zoomLevel * 100)}%
        </div>

        <motion.div
          className="absolute cursor-grab active:cursor-grabbing"
          drag
          dragMomentum={false}
          ref={contentRef}
          style={{
            scale: actualScale,
            transformOrigin: 'top left',
            x,
            y,
          }}
        >
          <div className="p-8">
            <motion.div
              animate="visible"
              className="flex items-start justify-center"
              initial="hidden"
              variants={containerVariants}
            >
              {hierarchy.map((node, index) => (
                <OrgChartNode index={index} key={node.id} node={node} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <p className="mt-3 text-center text-sm text-slate-400">
        <span className="md:hidden">Glissez pour naviguer • Pincez ou boutons pour zoomer</span>
        <span className="hidden md:inline">Glissez pour naviguer • Scroll ou boutons pour zoomer</span>
      </p>
    </div>
  );
}

export { OrgChart };
