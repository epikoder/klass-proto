import { BlacReact, Cubit } from "blac";
import { NextRouter } from "next/router";
import { ApiResponse } from "../models/api.model";
import { QuestionInterface, QuestionResult } from "../models/question.model";
import { SubjectInterface } from "../models/subject.model";
import User from "../models/user.model";
import logger from "../utils/logger";


interface ExamState {
    questions?: QuestionResult[]
    current?: QuestionResult
    current_index?: number
    loading?: boolean
}

interface QuestionSub extends SubjectInterface {
    questions: QuestionResult[]
}

export class ExamBloc extends Cubit<ExamState> {
    constructor() {
        super({})
    }

    setLoading = () => this.emit({ ...this.state, loading: true })
    setIdle = () => this.emit({ ...this.state, loading: false })

    load = async (selected: SubjectInterface[]): Promise<void> => {
        if (this.state.loading === true || (this.state.questions !== undefined && this.state.questions?.length > 0)) return
        this.setLoading()
        try {
            const res = await fetch('/api/exam', {
                method: 'POST',
                body: JSON.stringify(selected.map(e => e.id))
            })
            if (res.status !== 200) {
                return this.emit({ ...this.state, questions: [] })
            }
            const data_ = await res.json() as ApiResponse<QuestionInterface[]>

            let sortedQuestion: QuestionResult[] = []
            const s: QuestionSub[] = []
            selected?.forEach((e, key) => {
                s.push({ ...e, questions: [] })
                console.log(e.name, e.id)
                data_.data?.forEach(q => {
                    if (q.subject_id === e.id) {
                        s[key].questions.push({ question: q, answer: '' })
                    }
                })
            })
            s.forEach(e => {
                sortedQuestion = sortedQuestion.concat(e.questions)
            })
            logger(sortedQuestion, 'SORTED')
            const state: ExamState = { questions: sortedQuestion }
            if (sortedQuestion !== undefined && sortedQuestion.length > 0) {
                state.current = sortedQuestion[0];
                state.current_index = 0
            }
            this.emit({ ...state })
        } catch (error) {
            console.log(error)
        }
        this.setIdle()
    }

    canNext = () => this.state.questions !== undefined ? this.state.questions?.length > this.state.current_index! + 1 : false
    canPrev = () => this.state.questions !== undefined ? this.state.current_index! > 0 : false

    onNext = () => {
        if (this.canNext()) {
            this.state.current_index = this.state.current_index! + 1
            this.state.current = this.state.questions![this.state.current_index]
            this.emit({ ...this.state })
        }
    }

    onPrev = () => {
        if (this.canPrev()) {
            this.state.current_index = this.state.current_index! - 1
            this.state.current = this.state.questions![this.state.current_index]
            this.emit({ ...this.state })
        }
    }

    onSelect = (a: string) => {
        if (this.state.current!.answer === a) {
            this.state.current!.answer = ''
            this.state.questions![this.state.current_index!].answer = ''
            this.emit({ ...this.state })
            return
        }
        this.state.current!.answer = a
        this.state.questions![this.state.current_index!].answer = a
        this.emit({ ...this.state })
    }

    onNavigate = (index: number) => {
        if (this.state.questions?.length! >= index) {
            this.state.current = this.state.questions![index]
            this.state.current_index = index
            this.emit({ ...this.state })
        }
    }

    onSubmit = async (user: User): Promise<ApiResponse<number>> => {
        const answer = this.state.questions!.map(e => ({
            [e.question.id]: e.answer
        }))
        let res
        try {
            res = await fetch('/api/submit', {
                method: 'POST',
                body: JSON.stringify(answer),
                headers: {
                    ['X-USER']: user.username
                }
            })
        } catch (error) {
            return { status: false }
        }
        this.emit({ ...this.state })
        return await res.json()
    }

    onEndExam = () => {
        this.emit({})
    }
}

export class ExamTimer extends Cubit<number> {
    private _timer?: ReturnType<typeof setInterval>

    startTimer = () => {
        if (this.state === undefined || this._timer !== undefined) return
        let state = this.state
        this._timer = setInterval(() => {
            if (state === 0) return this.endTimer()
            state -= 1
            this.emit(state)
        }, 1000)
    }

    endTimer = () => {
        clearInterval(this._timer)
        return this.emit(3600)
    }
}

export const { useBloc: useExamTimer } = new BlacReact([new ExamTimer(3600)])
export const { useBloc: useExamBloc } = new BlacReact([new ExamBloc()])