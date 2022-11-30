import { BlacReact, Cubit } from "blac";
import { ApiResponse } from "../models/api.model";
import { QuestionInterface, QuestionResult, QuestionWithAnswerInterface } from "../models/question.model";
import { SubjectInterface } from "../models/subject.model";
import { TopicInterface } from "../models/topic.model";
import User from "../models/user.model";
import logger from "../utils/logger";


interface ExamState {
    questions?: { [key: string]: QuestionResult }
    loading?: boolean
}

export class ExamBloc extends Cubit<ExamState> {
    constructor() {
        super({})
    }

    setLoading = () => this.emit({ ...this.state, loading: true })
    setIdle = () => this.emit({ ...this.state, loading: false })

    load = async (selected: TopicInterface[]): Promise<void> => {
        if (this.state.loading === true) return
        this.setLoading()
        try {
            const res = await fetch('/api/exam', {
                method: 'POST',
                body: JSON.stringify(selected.map(e => e.id))
            })
            if (res.status !== 200) {
                return this.emit({ ...this.state, questions: {} })
            }
            const data_ = await res.json() as ApiResponse<{ [key: string]: QuestionWithAnswerInterface[] }>

            const questions: { [key: string]: QuestionResult } = {}
            Object.keys(data_.data!).map(e => {
                const answer = data_.data![e].map(q => q.short_answer)
                let r: QuestionResult = {
                    answer, question: data_.data![e]
                }
                questions[e] = r
            })
            this.emit({
                questions
            })
        } catch (error) {
            console.log(error)
        }
        this.setIdle()
    }
}

class PrintBloc extends Cubit<boolean> {
    constructor() { super(false) }

    setLoading = () => this.emit(true)
    setIdle = () => this.emit(false)
}

export const { useBloc: usePrint } = new BlacReact([new PrintBloc()])
export const { useBloc: useExamBloc } = new BlacReact([new ExamBloc()])