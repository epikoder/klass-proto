import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from '../../models/api.model';
import { SubjectInterface } from '../../models/subject.model';
import  { query } from '../../utils/db'
import logger from '../../utils/logger';
import { DashboardState } from '../../bloc/dashboard.bloc';

export default async function dashboard(req: NextApiRequest,
	res: NextApiResponse<ApiResponse<DashboardState>>) {
	try {
		let result = await query()('SELECT * FROM subjects',) as SubjectInterface[]
		res.send({
			status: true,
			data: {
				subjects: result
			}
		}) 
	} catch (e) {
		logger(e)
		res.statusCode = 500
		return res.send({
			status: false,
		})
	}
}