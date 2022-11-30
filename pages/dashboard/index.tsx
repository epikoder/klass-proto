import { Button, Checkbox, CircularProgress } from "@mui/joy"
import { useEffect } from "react"
import { AuthBloc, useAuthBloc } from "../../bloc/auth.bloc"
import DashboardLayout from "../../layout/dashboard.layout"
import { DashboardBloc, useDashboardBloc } from "../../bloc/dashboard.bloc"

const Dashboard = () => {
	const [{ subjects, selected, topics },
		{ load, toggleSelect, addTopics, removeTopic, selectAllTopics, allSelected }] = useDashboardBloc(DashboardBloc)
	const [{ user, authenticated }] = useAuthBloc(AuthBloc)

	useEffect(() => {
		if (authenticated) load(user!)
	}, [user, authenticated])

	return <DashboardLayout>
		{({ user }) => <div className="bg-gray-100 md:h-full w-full overflow-scroll">
			<div className="flex justify-start rounded-md bg-white shadow-sm m-2 p-4">
				<div>
					{`${new Date().getFullYear() - 1}/${new Date().getFullYear()} Session exam`}
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
							className={`shadow-md m-1 p-2 ${selected === e ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-200 rounded-md cursor-pointer`}
							onClick={() => toggleSelect(e)}>
							{e.name}
						</div>))
						}
					</div> : <CircularProgress size="lg" />}
				</div>
				<div>
					SELECTED SUBJECT:
					{selected !== undefined && <span className="mx-3 uppercase text-green-500">
						{selected?.name}
					</span>}
				</div>
				<div>
					{selected !== undefined && <div className="p-4 ml-4 flex flex-col items-start">
						<div className="text-sm text-gray-700 my-4">
							SELECT TOPICS
							<span className="mx-3">
								<span className="text-xs cursor-pointer p-2" >
									SELECT ALL
								</span>
								<Checkbox size="sm" checked={allSelected()} onClick={selectAllTopics} />
							</span>
						</div>
						{selected?.topics?.map((e => <div
							key={e.id}
							className={`shadow-md m-1 text-sm p-2 ${topics?.includes(e) ? 'text-white bg-green-500' : ''} rounded cursor-pointer`}
							onClick={() => !topics?.includes(e) ? addTopics(e) : removeTopic(e)}
						>
							{e.title}
						</div>))
						}
					</div>}
				</div>
			</div>
		</div>}
	</DashboardLayout>
}

export default Dashboard