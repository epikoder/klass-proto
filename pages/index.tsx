import { Button, CircularProgress, TextField } from '@mui/joy'
import { useRouter } from 'next/router'
import { AuthBloc, useAuthBloc } from '../bloc/auth.bloc'
import PasswordInput from '../components/password.component'
import LayoutApp from '../layout/app.layout'
import { LoginBloc, useLoginBloc } from './bloc'

export default function Home() {
  const [{ password, username, loading }, { setPassword, setUsername, login }] = useLoginBloc(LoginBloc)
  const [{ }, { setLogin }] = useAuthBloc(AuthBloc)
  const router = useRouter()

  return <LayoutApp>
    <div className='h-full w-full flex'>
      <div className='w-[60%] h-full bg-yellow-200'>

      </div>
      <div className='w-[40%] flex flex-col justify-center items-center'>
        <div className='space-y-2'>
          <div className='text-center'>
            Login
          </div>
          <TextField
            placeholder='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='flex justify-end'>
            <Button
              disabled={loading || username.length <= 2 || password.length <= 5}
              startDecorator={loading && <CircularProgress size='sm' />}
              onClick={() => login(router, setLogin)}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  </LayoutApp>
}
