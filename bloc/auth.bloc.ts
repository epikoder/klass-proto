import { BlacReact, Cubit } from "blac";
import User from "../models/user.model";

interface AuthStateInterface { user?: User, authenticated: boolean }
export class AuthState {
	constructor(state: AuthStateInterface) {
		this.user = state.user
		this.authenticated = state.authenticated
	}
	user?: User
	authenticated: boolean
}

export class AuthBloc extends Cubit<AuthState>{
	constructor() {
		super(new AuthState({ authenticated: false }))
	}
	setLogin = (user: User) => this.emit({ user, authenticated: true })

	logout = () => {
		this.emit(new AuthState({ authenticated: false }))
	}
}

export const AuthBlocProvider = new BlacReact([new AuthBloc()])
export const { useBloc: useAuthBloc } = AuthBlocProvider