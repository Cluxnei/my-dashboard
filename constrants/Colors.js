export const primaryColor = '#000';

export const getRandomColor = () => '#' + [...Array(6).keys()].reduce(
    c => c + '0123456789ABCDEF'[Math.floor(Math.random() * 16)], ''
);

// export const getGrayScaleRandomColor = () => ['#323232', '#251515', '#5d5d5d', '#989898', '#656565'][Math.round(Math.random() * 4)];