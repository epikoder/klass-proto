import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from '../../models/api.model';
import { QuestionInterface } from '../../models/question.model';
import { query } from '../../utils/db'
import logger from '../../utils/logger';

export default async function exam(req: NextApiRequest,
    res: NextApiResponse<ApiResponse<QuestionInterface[]>>) {
    let ids: number[]
    try {
        ids = JSON.parse(req.body)
    } catch (error) {
        ids = req.body as number[]
    }
    let result: QuestionInterface[] = []
    for (let i = 0; i < ids.length; i++) {
        try {
            let r = await query()(`SELECT * FROM questions 
            WHERE subject_id = ? 
                AND question != ''
                AND option_1 != ''
                AND option_2 != ''
                AND option_3 != ''
                AND option_4 != ''
                AND short_answer IS NOT NULL
                 ORDER BY RAND() LIMIT 20`, [ids[i]]) as QuestionInterface[]
            result = result.concat(r)
        } catch (e) {
            logger(e)
        }
    }
    res.send({
        status: true,
        data: result
    })
}