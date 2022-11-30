import { ExamBloc, useExamBloc } from "../bloc/exam.bloc"

const DashboardHeader = () => {
	const [{ questions }] = useExamBloc(ExamBloc)
	return <div className="h-[10%] p-6 shadow-sm sticky flex justify-between" style={{
		position: '-webkit-sticky'
	}}>
		<div>
			PREP 50
		</div>
	</div>
}

export default DashboardHeader