import { AuthBloc, AuthBlocProvider, useAuthBloc } from "../../bloc/auth.bloc"
import DashboardUserComponent from "../../components/dashboard/user.component"
import DashboardLayout from "../../layout/dashboard.layout"

const Dashboard = () => {
	const [{ authenticated, user }] = useAuthBloc(AuthBloc)
	return <DashboardLayout>
		{({ user }) => <div>
			{user !== undefined && <DashboardUserComponent {...user} />}
		</div>}
	</DashboardLayout>
}

export default Dashboard