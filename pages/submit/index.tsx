import { Button } from '@mui/joy'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import LayoutApp from '../../layout/app.layout'

const Submit: FC = () => {
    const [{ user, score }, setResult] = useState<{
        score?: number, user?: string
    }>({})
    const router = useRouter()

    useEffect(() => {
        if (router.isReady) {
            const { score, user } = router.query
            setResult({
                score: score as unknown as number,
                user: user as string
            })
        }
    }, [router.isReady])

    return <LayoutApp>
        <div className='h-full w-full flex flex-col justify-center items-center text-center space-y-6'>
            <div>
                <div>
                    SESSION HAS ENDED
                </div>
                <div className='text-sm text-gray-700'>
                    Congratulations on completing your exam
                </div>
            </div>
            <div className='text-left text-sm'>
                <div>
                    Username: {user}
                </div>
                <div>
                    Score: {score}
                </div>
            </div>
            <Button onClick={() => {
                router.replace('/')
            }}>
                END
            </Button>
        </div>
    </LayoutApp>
}

export default Submit