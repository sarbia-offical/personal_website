const cubeList = {
    code: 0,
    message: 'success',
    data: {
        setting: [
            {
                id: 0,
                componentId: 'drag-box',
                hide: false,
                size: 'small',
                options: {
                    text: {
                        // "value": 'I have 6 years of front-end development experience. Based in Changsha, from Hunan, China. Tech stack: JavaScript (ES6), TypeScript, React.js, Next.js, Zustand, Nest.js, TypeORM, and more.',
                        value: "Hi, I have 6 years of front-end experience, based in Changsha/CN. I've developed the official websites of Colmo, websites of Midea, and the overseas SaaS of Meituan Peppr. Skilled in web development.",
                        hide: false,
                    },
                },
            },
            {
                id: 1,
                componentId: 'about-me',
                hide: false,
                size: 'middle',
                options: {
                    text: {
                        // "value": 'I have 6 years of front-end development experience. Based in Changsha, from Hunan, China. Tech stack: JavaScript (ES6), TypeScript, React.js, Next.js, Zustand, Nest.js, TypeORM, and more.',
                        value: "Hi, I have 6 years of front-end experience, based in Changsha/CN. I've developed the official websites of [0], websites of [1], and the overseas SaaS of [2]. Skilled in web development.",
                        hide: false,
                    },
                    link: {
                        value: [
                            {
                                label: 'Colmo',
                                value: 'https://www.colmo.com.cn/',
                            },
                            {
                                label: 'littleswan',
                                value: 'https://www.littleswan.com/',
                            },
                            {
                                label: 'Meituan Peppr',
                                value: 'https://pos.peppr.com/',
                            },
                        ],
                        hide: false,
                    },
                },
            },
            {
                id: 2,
                componentId: 'contact-me',
                hide: false,
                size: 'small',
                options: {
                    list: {
                        value: [
                            {
                                iconPath: 'wechat.svg',
                                reverseImg: 'avatar.jpg',
                                type: 'qrcode',
                            },
                            {
                                iconPath: 'gmail.svg',
                                text: 'SEND EMAIL',
                                path: 'zouyusen999@gmail.com',
                                type: 'email',
                            },
                            {
                                iconPath: 'github.svg',
                                text: 'SEE MORE',
                                path: 'https://github.com/sarbia-offical?tab=repositories',
                                type: 'link',
                            },
                        ],
                        hide: false,
                    },
                },
            },
            {
                id: 3,
                componentId: 'music-player',
                hide: false,
                size: 'middle',
            },
            {
                id: 4,
                componentId: 'water-fall',
                hide: false,
                size: 'small',
            },
            {
                id: 5,
                componentId: 'light-text',
                hide: false,
                size: 'small',
            },
        ],
    },
};

export default cubeList;
