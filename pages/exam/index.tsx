import { Button, Checkbox, CircularProgress, IconButton } from '@mui/joy'
import { FC, useEffect, useState } from 'react'
import DashboardLayout from "../../layout/dashboard.layout"
import { QuestionResult } from '../../models/question.model'
import { DashboardBloc, useDashboardBloc } from '../../bloc/dashboard.bloc'
import { ExamBloc, ExamTimer, useExamBloc, useExamTimer } from '../../bloc/exam.bloc'
import QuestionSelection from '../../components/exam/questions.selection.component'
import Dialog from '../../components/dialog'
import { ArrowUpward, ArrowUpwardRounded } from '@mui/icons-material'

const Exam: FC = () => {
    const [{ selected }] = useDashboardBloc(DashboardBloc)
    const [{ current, current_index, questions },
        { load, canNext, canPrev, onNext, onPrev, onNavigate, onSelect }
    ] = useExamBloc(ExamBloc)
    const [{ }, { startTimer }] = useExamTimer(ExamTimer)
    const [boxIsOpen, setBoxIsOpen] = useState(false)
    const toggleBox = () => setBoxIsOpen(!boxIsOpen)

    useEffect(() => {
        if (questions === undefined && selected !== undefined) {
            load(selected!)
        }
    }, [questions])

    useEffect(() => {
        if (questions !== undefined) {
            startTimer()
        }
    }, [questions])


    return <DashboardLayout>
        {() => questions !== undefined ?
            <div className='w-full p-4  overflow-scroll space-y-10 h-full'>
                <div className='p-4 md:p-6'>
                    <div>
                        <div className='space-x-2'>
                            <span>{current_index! + 1}. </span>
                            <span dangerouslySetInnerHTML={{ __html: current?.question.question ?? '' }}></span>
                        </div>
                        <div
                            className='space-y-4 py-4'>
                            <div
                                className='flex items-center space-x-2'>
                                <Checkbox
                                    checked={current?.answer === 'option_1'}
                                    onChange={() => onSelect('option_1')} />
                                <span>A</span> <span>{current?.question.option_1} </span>
                            </div>
                            <div
                                className='flex items-center space-x-2'>
                                <Checkbox
                                    checked={current?.answer === 'option_2'}
                                    onChange={() => onSelect('option_2')} />
                                <span>B</span> <span>{current?.question.option_2} </span>
                            </div>
                            <div
                                className='flex items-center space-x-2'>
                                <Checkbox
                                    checked={current?.answer === 'option_3'}
                                    onChange={() => onSelect('option_3')} />
                                <span>C</span> <span>{current?.question.option_3} </span>
                            </div>
                            <div
                                className='flex items-center space-x-2'>
                                <Checkbox
                                    checked={current?.answer === 'option_4'}
                                    onChange={() => onSelect('option_4')} />
                                <span>D</span> <span>{current?.question.option_4} </span>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between px-6'>
                        <Button
                            disabled={!canPrev()}
                            onClick={onPrev}>
                            BACK
                        </Button>
                        <Button
                            disabled={!canNext()}
                            onClick={onNext}>
                            NEXT
                        </Button>
                    </div>
                </div>
                <div className='fixed bottom-5 right-5'>
                    <IconButton size='sm' onClick={toggleBox}>
                        <ArrowUpwardRounded sx={{
                            color: 'white'
                        }} />
                    </IconButton>
                </div>
                <div className='md:block hidden'>
                    <QuestionSelection {...{ current, current_index, questions }} onClick={onNavigate} />
                </div>
                <div className='md:hidden fixed top-0 bottom-0 left-0 right-0 z-10' style={{
                    backgroundColor: '#00000012',
                    display: boxIsOpen ? 'block' : 'none'
                }} onClick={toggleBox}>
                    <div className='p-4 rounded-t-2xl bg-white bottom-0 absolute'>
                        <QuestionSelection {...{ current, current_index, questions }} onClick={(index) => {
                            toggleBox()
                            onNavigate(index)
                        }} />
                    </div>
                </div>
            </div> : <div className='flex flex-col items-center justify-center h-40'>
                <CircularProgress />
            </div>}
    </DashboardLayout>
}

export default Exam