import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from '../../models/api.model';
import { SubjectInterface } from '../../models/subject.model';
import { query } from '../../utils/db'
import logger from '../../utils/logger';
import { DashboardState } from '../../bloc/dashboard.bloc';
import { TopicInterface } from '../../models/topic.model';

export default async function dashboard(req: NextApiRequest,
	res: NextApiResponse<ApiResponse<DashboardState>>) {
	try {
		let subjects: SubjectInterface[] = []
		let results = await query()('SELECT * FROM subjects',) as SubjectInterface[]
		for (let i = 0; i < results.length; i++) {
			let topics = await query()('SELECT * FROM topics WHERE subject_id = ?', [results[i].id]) as TopicInterface[]
			if (topics.length > 0) {
				results[i].topics = topics
				subjects = subjects.concat(results[i])
			}
		}

		res.send({
			status: true,
			data: { subjects }
		})
	} catch (e) {
		logger(e)
		res.statusCode = 500
		return res.send({
			status: false,
		})
	}
}