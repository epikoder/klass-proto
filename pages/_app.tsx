import '../styles/globals.css'
import type { AppProps } from 'next/app'
import createEmotionCache from '../utils/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssVarsProvider } from '@mui/joy';
import appTheme from '../utils/theme';
import { } from 'blac'
import { AuthBloc, AuthBlocProvider } from '../bloc/auth.bloc';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}: MyAppProps) {
  return <AuthBlocProvider.BlocProvider<AuthBloc> bloc={new AuthBloc()}>
    <CacheProvider value={emotionCache}>
      <CssVarsProvider theme={appTheme}>
        <Component {...pageProps} />
      </CssVarsProvider>
    </CacheProvider>
  </AuthBlocProvider.BlocProvider>
}
