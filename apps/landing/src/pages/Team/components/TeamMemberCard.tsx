import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

import { Avatar } from '@/components/Avatar';
import type { User } from '@/data/users';
import { cn } from '@/lib/utils';
import { getFullName, getSlug } from '@/utils/users';

const departmentColors: Record<string, { bg: string; text: string }> = {
  business: { bg: 'bg-brand-yellow/20', text: 'text-brand-black' },
  marketing: { bg: 'bg-brand-pink/30', text: 'text-brand-black' },
  operations: { bg: 'bg-brand-green/20', text: 'text-white' },
  tech: { bg: 'bg-brand-blue/20', text: 'text-brand-blue' },
};

interface TeamMemberCardProps {
  user: User;
  index?: number;
}

function TeamMemberCard({ user, index = 0 }: TeamMemberCardProps) {
  const slug = getSlug(user);
  const colors = user.department ? departmentColors[user.department] : departmentColors.business;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ margin: '-50px', once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Link
        className="group relative flex h-[220px] w-[160px] flex-col items-center rounded-2xl border-2 border-transparent bg-white p-3 shadow-lg transition-all duration-300 hover:border-brand-yellow hover:shadow-xl"
        params={{ slug }}
        to="/team/$slug"
      >
        <motion.div
          className="relative mb-2"
          transition={{ stiffness: 300, type: 'spring' }}
          whileHover={{ rotate: 2, scale: 1.08 }}
        >
          <Avatar
            alt={getFullName(user)}
            className="h-16 w-16 border-4 border-brand-yellow shadow-md"
            src={user.avatar}
          />
          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-brand-green" />
        </motion.div>

        <h3 className="mb-1 text-center font-serif text-base font-bold leading-tight text-brand-black">
          {getFullName(user)}
        </h3>

        <p className="mb-2 line-clamp-2 h-8 text-center text-xs leading-tight text-slate-500">{user.role}</p>

        {user.department && (
          <span
            className={cn('rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider', colors.bg, colors.text)}
          >
            {user.department}
          </span>
        )}

        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-t from-brand-yellow/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
          layoutId={`card-bg-${slug}`}
        />
      </Link>
    </motion.div>
  );
}

export { TeamMemberCard };
