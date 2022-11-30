export interface QuestionInterface {
    id: number
    subject_id: number
    topic_id: number
    source_id: number
    question_type_id: number
    question: string
    question_details: string
    question_image: string
    option_1: string
    option_2: string
    option_3: string
    option_4: string
}

export interface QuestionWithAnswerInterface extends QuestionInterface {
    short_answer: string
    full_answer: string
    answer_image: string
    answer_details: string
}

export interface QuestionResult {
    question: QuestionWithAnswerInterface[]
    answer: string[]
}

export default class Question { }