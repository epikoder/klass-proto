import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from '../../models/api.model';
import User from '../../models/user.model';
import { query } from '../../utils/db'

interface LoginData { username: string, password: string }
export default async function login(req: NextApiRequest,
	res: NextApiResponse<ApiResponse>) {
	try {
		const body: LoginData = JSON.parse(req.body)
		let result = await query()('SELECT * FROM users WHERE username = ?', [body.username]) as Array<User>
		if (result.length == 0) {
			await query()(`INSERT INTO users (username, password) VALUES (?,?)`, [body.username, body.password]);
			result.concat(new User({ username: body.username }))
		}
		const r: ApiResponse<User> = {
			status: true,
			data: new User(result[0])
		}
		res.send(r)
	} catch (e) {
		console.error(e)
		return res.send({
			status: false,
		})
	}
}