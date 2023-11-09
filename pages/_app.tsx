import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import createEmotionCache from '../utility/createEmotionCache';
import Head from 'next/head';
import { Noto_Sans } from 'next/font/google';

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
    auth: boolean;
}

const clientSideEmotionCache = createEmotionCache();
const notoSans = Noto_Sans({
    subsets: ['latin'],
    weight: ['400', '600'],
});

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    return (
        <>
            <Head>
                <title>Index</title>
                <meta name='description' content='Index' />
                <link rel='icon' href={'/favicon.ico'} />
            </Head>
            <CacheProvider value={emotionCache}>
                <CssBaseline />
                <main className={notoSans.className}>
                    <Component {...pageProps} />
                </main>
            </CacheProvider>
        </>
    );
};

export default MyApp;
