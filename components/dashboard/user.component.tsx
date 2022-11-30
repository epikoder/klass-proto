import { Avatar, Button, CircularProgress, ModalDialog } from "@mui/joy"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
import User from "../../models/user.model"
import { DashboardBloc, useDashboardBloc } from "../../bloc/dashboard.bloc"
import { ExamBloc, useExamBloc, } from "../../bloc/exam.bloc"
import { AuthBloc, useAuthBloc } from "../../bloc/auth.bloc"
import Printer from "../../utils/printer"
import { getOption } from "../../utils/helper"

const DashboardUserComponent: FC<User> = (props) => {
	const [{ selected, topics }, { beginExam }] = useDashboardBloc(DashboardBloc)
	const [{ questions }, { load }] = useExamBloc(ExamBloc)
	const router = useRouter()
	const [{ }, { logout }] = useAuthBloc(AuthBloc)
	const [loading, setLoading] = useState(false)

	const { username, fname, lname } = props

	const _print = async (o: string) => {
		const q = document.getElementById(o + '-question')
		const a = document.getElementById(o + '-answer')
		if (q === null || a === null) return;
		setLoading(true);
		(new Printer(q, {
			title: 'prep50- Type ' + o,
			fontSize: '12px'
		})).print(() => (new Printer(a, {
			title: `prep50- Type ${o} marking scheme`, fontSize: '12px',
		})).print(() => setLoading(false)))
	}

	return <div className="md:w-[30%] bg-red-50 p-4 space-y-2 flex flex-col justify-between">
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
		<div className="space-y-2">
			<Button
				fullWidth
				disabled={topics === undefined || topics?.length === 0}
				onClick={() => router.asPath === '/dashboard' ? beginExam(router) : load(topics!)}>
				{selected !== undefined && topics?.length! > 0 ? 'GENERATE' : 'PLEASE SELECT SUBJECT AND TOPICS'}
			</Button>

			{(router.asPath == "/exam" && Object.keys(questions ?? {}).length > 0) &&
				Object.keys(questions ?? {}).map((o, i) => <Button
					key={i}
					fullWidth
					disabled={loading}
					onClick={() => _print(o)}>
					PRINT: PaperType {o.toUpperCase()}
				</Button>)}
		</div>
	</div>
}

export default DashboardUserComponent