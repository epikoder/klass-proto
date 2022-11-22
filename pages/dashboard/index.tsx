import { CircularProgress } from "@mui/joy"
import { useEffect } from "react"
import { AuthBloc, useAuthBloc } from "../../bloc/auth.bloc"
import DashboardLayout from "../../layout/dashboard.layout"
import { DashboardBloc, useDashboardBloc } from "../../bloc/dashboard.bloc"

const Dashboard = () => {
	const [{ subjects, selected }, { load, addSelected, removeSelected }] = useDashboardBloc(DashboardBloc)
	const [{ user, authenticated }] = useAuthBloc(AuthBloc)

	useEffect(() => {
		if (authenticated) load(user!)
	}, [user, authenticated])

	return <DashboardLayout>
		{({ user }) => <div className="bg-gray-100 md:h-full w-full overflow-scroll">
			<div className="flex justify-between rounded-md bg-white shadow-sm m-2 p-4">
				<div>
					{`${new Date().getFullYear() - 1}/${new Date().getFullYear()} Session exam`}
				</div>
				<div>
					Duration <span className="text-blue-500">60min</span>
				</div>
			</div>
			<div className="rounded-md bg-white shadow-md p-4 m-2">
				<div>
					NOTICE
				</div>
				<div>
					<ol>
						<li>
							No information provided
						</li>
					</ol>
				</div>
			</div>
			<div className="rounded-md bg-white shadow-md p-4 m-2">
				<div>
					SUBJECTS (Select any four subjects)
				</div>
				<div className="p-4 flex justify-center">
					{subjects !== undefined ? <div className="flex flex-wrap">
						{subjects.map((e => <div
							key={e.id}
							className={`shadow-md m-1 p-2 bg-gray-100 ${selected?.includes(e) ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-200 rounded-md ${selected!.length < 4 && !selected!.includes(e) ? 'cursor-pointer' : 'cursor-not-allowed'}`}
							onClick={!selected!.includes(e) ? () => addSelected(e) : undefined}>
							{e.name}
						</div>))
						}
					</div> : <CircularProgress size="lg" />}
				</div>
				<div>
					SELECTED SUBJECTS
				</div>
				<div className="p-4 flex flex-wrap">
					{selected!.map((e => <div
						key={e.id}
						className="shadow-md m-1 p-2 bg-green-500 rounded text-white cursor-pointer"
						onClick={() => removeSelected(e)}>
						{e.name}
					</div>))
					}
				</div>
			</div>
			<div className="rounded-md bg-white shadow-md p-4 m-2">
				<div>
					RULES
				</div>
			</div>
		</div>}
	</DashboardLayout>
}

export default Dashboard