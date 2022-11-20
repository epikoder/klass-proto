import { ExamBloc, ExamTimer, useExamBloc, useExamTimer } from "../bloc/exam.bloc"

const DashboardHeader = () => {
	const [time] = useExamTimer(ExamTimer)
	const [{ questions }] = useExamBloc(ExamBloc)
	const minute = Math.floor(((time ?? 0) / 60))
	const seconds = ((time ?? 0) % 60).toPrecision()
	return <div className="h-[10%] p-6 shadow-sm sticky flex justify-between" style={{
		position: '-webkit-sticky'
	}}>
		<div>
			PREP 50
		</div>
		<div>
			{questions !== undefined && <div className="w-24 font-bold">
				{minute} : {parseInt(seconds) > 9 ? seconds : `0${seconds}`} sec
			</div>}
		</div>
	</div>
}

export default DashboardHeader