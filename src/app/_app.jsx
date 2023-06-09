import { store } from '@/stores';
import { Provider } from 'react-redux';
import './globals.css'

export default function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />;
        </Provider>
    );
}
