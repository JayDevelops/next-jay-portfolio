const modalVariants = {
    hidden: {
        y: '-100vh',
    },
    visible: {
        y: 0,
        transition: {
            type: 'tween', // Set transition type to 'tween'
            duration: 0.3, // Specify duration
        },
    },
    exit: {
        y: '-100vh',
        transition: {
            type: 'tween',
            duration: 0.3,
            delay: 0.3,
        },
    },
}

const linkItemVariants = {
    hidden: { opacity: 0, y: '50%' },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut" // Add ease-out easing function

        },
    },
    exit: {
        opacity: 0,
        y: '50%',
        transition: {
            duration: 0.1,
            ease: "easeOut" // Add ease-out easing function
        }
    },
};


const navLinksVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
    exit: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
}

export {modalVariants, linkItemVariants, navLinksVariants}