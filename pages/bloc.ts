import { BlacReact, Cubit } from "blac";
import { NextRouter } from "next/router";
import { ApiResponse } from "../models/api.model";
import User from "../models/user.model";

interface LoginState { username: string, password: string, message?: string, loading?: boolean }
export class LoginBloc extends Cubit<LoginState> {
	constructor(state: LoginState) { super(state) }
	setUsername = (username: string) => {
		this.emit({ ...this.state, username })
	}
	setPassword = (password: string) => {
		this.emit({ ...this.state, password })
	}
	setLoading = () => this.emit({ ...this.state, loading: true })
	setIdle = () => this.emit({ ...this.state, loading: false })

	login = async (router: NextRouter, fn: (user: User) => void) => {
		this.emit({ ...this.state, message: undefined })
		this.setLoading()
		const res = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify(this.state),
		})
		const body: ApiResponse<User> = await res.json()
		if (!body.status) {
			this.emit({ ...this.state, message: "ERROR OCCURED" })
			return
		}
		fn(body.data!)
		router.push('/dashboard')
		setTimeout(this.setIdle, 2000)
	}
}

export const { useBloc: useLoginBloc } = new BlacReact([new LoginBloc({ username: '', password: '' })])