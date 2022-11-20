import { BlacReact, Cubit } from "blac";
import { ApiResponse } from "../models/api.model";
import User from "../models/user.model";
import logger from "../utils/logger";

interface LoginState {
	username: string
	password: string
	message?: string
	loading?: boolean
}

export class LoginBloc extends Cubit<LoginState> {
	setUsername = (username: string) => {
		this.emit({ ...this.state, username })
	}
	setPassword = (password: string) => {
		this.emit({ ...this.state, password })
	}
	setLoading = () => this.emit({ ...this.state, loading: true })
	setIdle = () => this.emit({ ...this.state, loading: false })

	login = async (fn: (user: User) => void) => {
		this.emit({ ...this.state, message: undefined })
		this.setLoading()
		let res: Response
		try {
			res = await fetch('/api/login', {
				method: 'POST',
				body: JSON.stringify({
					username: this.state.username,
					password: this.state.password
				}),
				headers: {
					['Content-Type']: 'application/json'
				}
			})
		} catch (error) {
			logger(error)
			return
		}
		const body: ApiResponse<User> = await res.json()
		if (!body.status) {
			this.emit({ ...this.state, message: "ERROR OCCURED" })
			return
		}
		fn(body.data!)
		setTimeout(this.setIdle, 2000)
	}
}

export const { useBloc: useLoginBloc } = new BlacReact([new LoginBloc({ username: '', password: '' })])