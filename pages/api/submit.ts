import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from '../../models/api.model';
import { QuestionWithAnswerInterface } from '../../models/question.model';
import User from '../../models/user.model';
import { query } from '../../utils/db'
import logger from '../../utils/logger';

export default async function submit(req: NextApiRequest,
    res: NextApiResponse<ApiResponse>) {
    try {
        let body: { [key: string]: string }[]
        try {
            body = JSON.parse(req.body)
        } catch (error) {
            body = req.body
        }
        const ids = body.map(e => parseInt(Object.keys(e)[0]))

        let result = await query()('SELECT * FROM questions WHERE id IN (?)', [ids]) as Array<QuestionWithAnswerInterface>

        let score = 0
        result.forEach(q => {
            body.forEach(a => {
                const key = Object.keys(a)[0]
                if (q.id.toString() === Object.keys(a)[0]) {
                    logger(q.question, q.short_answer)
                    score += a[key] === q.short_answer ? 1 : 0
                }
            })
        })
        res.send({
            status: true,
            data: score
        })
    } catch (e) {
        logger(e)
        res.statusCode = 500
        return res.send({
            status: false,
        })
    }
}