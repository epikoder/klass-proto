import { FC } from "react"
import User from "../../models/user.model"

const DashboardUserComponent: FC<User> = (props) => {
	const { username, fname, lname } = props
	return <>
		<div>
			{fname}
		</div>
		<div>
			{lname}
		</div>
		<div>
			{username}
		</div>
	</>
}

export default DashboardUserComponent