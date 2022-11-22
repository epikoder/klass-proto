import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useRef } from "react";
import { AuthBloc, AuthState, useAuthBloc } from "../bloc/auth.bloc";
import DashboardUserComponent from "../components/dashboard/user.component";
import DashboardHeader from "../components/header.component";
import LayoutApp from "./app.layout";

const DashboardLayout: FC<{ children: (props: AuthState & {}) => ReactNode }> = (props) => {
	const [auth] = useAuthBloc(AuthBloc)
	const router = useRouter()
	const timer_ = useRef<ReturnType<typeof setTimeout>>()

	useEffect(() => {
		if (!auth.authenticated) {
			timer_.current = setTimeout(() => {
				if (auth.authenticated) return clearTimeout(timer_.current)
				router.replace('/')
			}, 1000)
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