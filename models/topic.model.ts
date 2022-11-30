import { QuestionInterface, QuestionWithAnswerInterface } from "./question.model"

export interface TopicInterface {
    id: number
    subject_id: number
    title: string
    details: string
    questions?: QuestionInterface | QuestionWithAnswerInterface
}