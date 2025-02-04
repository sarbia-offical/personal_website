export const perspective = {
    init: {
        scale: 1,
        y: 0,
    },
    enter: {
        scale: 1,
        y: 0,
    },
    exit: {
        scale: 0.2,
        opacity: 0.5,
        transition: {
            duration: 0.6,
            ease: 'linear',
        },
    },
};

export const slide = {
    initial: {
        y: '100vh',
        opacity: 0,
    },
    enter: {
        y: '100vh',
        opacity: 1,
    },
    exit: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
        },
    },
};

export const opacity = {
    initial: {
        opacity: 0,
    },
    enter: {
        opacity: 1,
        transition: {
            duration: 0.7,
            ease: 'linear',
        },
    },
    exit: {
        opacity: 1,
    },
};
