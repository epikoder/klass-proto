import { Avatar, Button, ModalDialog } from "@mui/joy"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
import User from "../../models/user.model"
import { DashboardBloc, useDashboardBloc } from "../../bloc/dashboard.bloc"
import { ExamBloc, ExamTimer, useExamBloc, useExamTimer } from "../../bloc/exam.bloc"
import { AuthBloc, useAuthBloc } from "../../bloc/auth.bloc"

const DashboardUserComponent: FC<User> = (props) => {
	const [{ selected }, { beginExam, clearSelection }] = useDashboardBloc(DashboardBloc)
	const [{ }, { onSubmit, onEndExam }] = useExamBloc(ExamBloc)
	const [time, { endTimer }] = useExamTimer(ExamTimer)
	const router = useRouter()
	const [open, _setOpen] = useState(false)
	const toggleOpen = () => _setOpen(!open)
	const [{ }, { logout }] = useAuthBloc(AuthBloc)

	const { username, fname, lname } = props

	useEffect(() => {
		if (time === 0) {
			endTimer()
			__onSubmit()
		}
	}, [time])

	const _submit = () => {
		toggleOpen()
		endTimer()
		__onSubmit()
	}

	const __onSubmit = async () => {
		const res = await onSubmit(props)
		if (res.status) {
			await router.replace(`/submit?score=${res.data}&user=${username}`)
			onEndExam()
			clearSelection()
			logout()
		}
	}

	return <div className="md:w-[30%] bg-red-50 p-4 space-y-2 flex flex-col justify-between">
		<ModalDialog sx={{
			display: open ? 'block' : 'none',
			zIndex: 100
		}}>
			<div className="text-center">
				END EXAM
			</div>
			<div className="py-4 text-center">
				This action can not reverted
			</div>
			<div className="grid grid-cols-2 gap-3">
				<Button
					fullWidth
					color="danger"
					onClick={toggleOpen}>
					CANCEL
				</Button>
				<Button
					fullWidth
					onClick={_submit}>
					SUBMIT
				</Button>
			</div>
		</ModalDialog>
		<div>
			<Avatar size="lg" sx={{
				width: 100,
				height: 100
			}} />
			<div>
				{fname ?? 'John'}
			</div>
			<div>
				{lname ?? 'Doe'}
			</div>
			<div>
				{username}
			</div>
		</div>
		<div>
			{router.asPath == "/dashboard" && <Button
				fullWidth
				disabled={selected!.length !== 4}
				onClick={() => beginExam(router)}>
				{selected!.length === 4 ? 'BEGIN' : 'PLEASE SELECT (4) SUBJECTS'}
			</Button>}
			{router.asPath == "/exam" && <Button
				fullWidth
				onClick={toggleOpen}>
				SUBMIT
			</Button>}
		</div>
	</div>
}

export default DashboardUserComponent