
export interface UserInterface { username: string, fname?: string, lname?: string }
export default class User implements UserInterface {
	constructor(user: UserInterface) {
		this.username = user.username
		this.fname = user.fname
		this.lname = user.lname
	}
	username: string;
	fname?: string | undefined;
	lname?: string;
}
