import { AppRouter } from './router/AppRouter'
import { ThemeApp } from './theme'
import { GoogleOAuthProvider } from '@react-oauth/google';

export const Shekinah = () => {
  return (
    <ThemeApp>
      <GoogleOAuthProvider clientId="32338107925-fq85kgsa9jpj5sidj8073b3piua2kru9.apps.googleusercontent.com">
        <AppRouter />
      </GoogleOAuthProvider>
    </ThemeApp>
  )
}
