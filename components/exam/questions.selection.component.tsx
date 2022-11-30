import { FC } from "react"
import { QuestionResult } from "../../models/question.model"

interface ExamState {
    questions?: QuestionResult[],
    current?: QuestionResult
    current_index?: number
}

const QuestionSelection: FC<ExamState & { onClick?: (index: number) => void }> = (props) => {
    const { questions, onClick, current, current_index } = props
    return <div className="flex flex-wrap">
        {/* {questions?.map((q, i) => <div
            key={i}
            className={`px-2 py-1 m-1 cursor-pointer hover:opacity-80 duration-300 transition-all ease-in-out rounded text-white ${questions![i].answer !== '' ? 'bg-green-500' : 'bg-gray-400'}`}
            onClick={() => onClick !== undefined ? onClick(i) : {}}>
            {i + 1}
        </div>)} */}
    </div>
}

export default QuestionSelection