import { Button, CircularProgress } from '@mui/joy'
import { FC, useEffect, useRef } from 'react'
import DashboardLayout from "../../layout/dashboard.layout"
import { DashboardBloc, useDashboardBloc } from '../../bloc/dashboard.bloc'
import { ExamBloc, useExamBloc } from '../../bloc/exam.bloc'
import { getOption } from '../../utils/helper'


const Exam: FC = () => {
    const [{ topics }] = useDashboardBloc(DashboardBloc)
    const [{ questions, loading }, { load }] = useExamBloc(ExamBloc)

    useEffect(() => {
        if (topics !== undefined && topics.length > 0) {
            load(topics!)
        }
    }, [topics])

    return <DashboardLayout>
        {() => (loading === undefined || !loading) ?
            <div className='w-full p-4  overflow-scroll space-y-10 h-full'>
                {
                    (questions !== undefined) &&
                    <div className='bg-gray-500 p-4 space-y-4 text-black'>
                        {
                            Object.keys(questions).map((e, key) =>
                                <div key={key} className='bg-white py-4 px-2 space-y-4'>
                                    <div id={e + '-question'}>
                                        <div className='text-center'>
                                            <div className='font-bold text-lg'>
                                                Prep50 College
                                            </div>
                                            <div className='flex justify-between'>
                                                <span>
                                                    First Term Examination
                                                </span>
                                                <span className='font-bold'>
                                                    Duration: 2hr 30min
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            Paper Type <span className='font-bold'>{e}</span>
                                        </div>
                                        <ol type='1' className='pt-4 space-y-1'>
                                            {questions[e].question.map((q, i) =>
                                                <li key={i} style={{
                                                    listStyleType: 'decimal',
                                                }}>
                                                    <span dangerouslySetInnerHTML={{ __html: q.question }} />
                                                    <span className='mx-2'>
                                                        [A]<span className='mx-2' dangerouslySetInnerHTML={{ __html: q.option_1 }} />
                                                        [B]<span className='mx-2' dangerouslySetInnerHTML={{ __html: q.option_2 }} />
                                                        [C]<span className='mx-2' dangerouslySetInnerHTML={{ __html: q.option_3 }} />
                                                        [D]<span className='mx-2' dangerouslySetInnerHTML={{ __html: q.option_4 }} />
                                                    </span>
                                                </li>)
                                            }
                                        </ol>
                                    </div>
                                    <hr />
                                    <div id={e + '-answer'}>
                                        <div className='text-center'>
                                            Paper Type <span className='font-bold'>{e}</span> Answers
                                        </div>
                                        <ol type='1' className='space-y-2 pt-4 text-left' style={{
                                            columns: 3
                                        }}>
                                            {questions[e].answer.map((a, i) =>
                                                <li key={i} style={{
                                                    listStyleType: 'decimal',
                                                }}>
                                                    {getOption(a)}
                                                </li>)
                                            }
                                        </ol>
                                    </div>
                                </div>)
                        }
                    </div>
                }
            </div> : <div className='flex flex-col items-center justify-center h-40 w-full'>
                <CircularProgress />
            </div>}
    </DashboardLayout>
}

export default Exam