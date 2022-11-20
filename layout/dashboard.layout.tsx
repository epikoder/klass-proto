import { useRouter } from "next/router";
import { FC, ReactNode, useEffect } from "react";
import { AuthBloc, AuthState, useAuthBloc } from "../bloc/auth.bloc";
import DashboardUserComponent from "../components/dashboard/user.component";
import DashboardHeader from "../components/header.component";
import LayoutApp from "./app.layout";

const DashboardLayout: FC<{ children: (props: AuthState & {}) => ReactNode }> = (props) => {
	const [auth] = useAuthBloc(AuthBloc)
	const router = useRouter()

	useEffect(() => {
		if (!auth.authenticated) {
			router.replace('/')
		}
	}, [auth.authenticated])

	return <LayoutApp>
		<div className="md:h-full">
			<DashboardHeader />
			<div className="md:flex bg-gray-100 h-[90%]">
				{(auth.authenticated && auth.user !== undefined) && <DashboardUserComponent {...auth?.user!} />}
				{auth.authenticated && props.children(auth)}
			</div>
		</div>
	</LayoutApp>
}

export default DashboardLayout