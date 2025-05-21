'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {ReactNode} from 'react';

export default function GameGridAnimatedWrapper({children, query}: {
    children: ReactNode;
    query: string;
    page: number;
}) {
    return (
        <AnimatePresence mode="wait">
            {!!query && (
                <motion.div
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="max-w-[800px] w-full overflow-hidden"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}