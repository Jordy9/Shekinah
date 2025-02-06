import { AppRouter } from './router/AppRouter'
import { ThemeApp } from './theme'
import { GoogleOAuthProvider } from '@react-oauth/google';

export const Shekinah = () => {
  return (
    <ThemeApp>
      <GoogleOAuthProvider clientId="311808518824-d7js6jm8vi5umjt7ooo23dc245dctber.apps.googleusercontent.com">
        <AppRouter />
      </GoogleOAuthProvider>
    </ThemeApp>
  )
}
