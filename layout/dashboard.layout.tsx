import { useRouter } from "next/router";
import { FC, ReactNode, useEffect } from "react";
import { AuthBloc, AuthState, useAuthBloc } from "../bloc/auth.bloc";
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
		<DashboardHeader />
		{auth.authenticated && props.children(auth)}
	</LayoutApp>
}

export default DashboardLayout