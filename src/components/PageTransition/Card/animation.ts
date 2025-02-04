export const cardInnerEnter = {
    initial: {
        right: '0%',
    },
    enter: {
        right: '-100%',
        transition: {
            duration: 0.5,
            ease: 'linear',
        },
    },
    exit: {
        right: '0%',
        width: '100vw',
        transition: {
            duration: 0.5,
            ease: 'linear',
        },
    },
};

export const card = {
    initial: {
        right: '0%',
    },
    enter: {
        right: '-100%',
        transition: {
            delay: 0.5,
            duration: 0.5,
            ease: 'linear',
        },
    },
    exit: {
        right: '0%',
        width: '100vw',
        transition: {
            duration: 0.5,
            ease: 'linear',
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
            delay: 1,
            duration: 1,
        },
    },
    exit: {
        opacity: 1,
    },
};
