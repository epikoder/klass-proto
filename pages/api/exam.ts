import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from '../../models/api.model';
import { QuestionInterface } from '../../models/question.model';
import { query } from '../../utils/db'
import List from '../../utils/list';
import logger from '../../utils/logger';

export default async function exam(req: NextApiRequest,
    res: NextApiResponse<ApiResponse<{ [key: string]: QuestionInterface[] }>>) {
    let ids: number[]
    try {
        ids = JSON.parse(req.body)
    } catch (error) {
        ids = req.body as number[]
    }
    const max = parseInt(process.env.QUESTION_COUNT ?? "60")
    const floor = Math.floor(max / ids.length)

    const paperTypes: { [key: string]: QuestionInterface[] } = {};
    let types = ['A', 'B', 'C', 'D']
    for (let j = 0; j < types.length; j++) {
        let result: QuestionInterface[] = []
        for (let i = 0; i < ids.length; i++) {
            try {
                let r = await query()(`SELECT * FROM questions 
            WHERE topic_id = ? 
                AND question != ''
                AND option_1 != ''
                AND option_2 != ''
                AND option_3 != ''
                AND option_4 != ''
                AND short_answer IS NOT NULL
                 ORDER BY RAND() LIMIT ?`, [ids[i], floor]) as QuestionInterface[]
                result = result.concat(r)
            } catch (e) {
                logger(e)
            }
        }
        try {
            let r = await query()(`SELECT * FROM questions 
        WHERE topic_id IN (?) 
            AND question != ''
            AND option_1 != ''
            AND option_2 != ''
            AND option_3 != ''
            AND option_4 != ''
            AND short_answer IS NOT NULL
             ORDER BY RAND() LIMIT ?`, [ids, (max - floor * ids.length)]) as QuestionInterface[]
            result = result.concat(r)
        } catch (e) {
            logger(e)
        }
        if (result.length < max) {
            try {
                let r = await query()(`SELECT * FROM questions 
            WHERE topic_id IN (?) 
                AND question != ''
                AND option_1 != ''
                AND option_2 != ''
                AND option_3 != ''
                AND option_4 != ''
                AND short_answer IS NOT NULL
                 ORDER BY RAND() LIMIT ?`, [ids, (max - result.length)]) as QuestionInterface[]
                result = result.concat(r)
            } catch (e) {
                logger(e)
            }
        }
        paperTypes[types[j]] = List.shuffle(result)
    }

    res.send({
        status: true,
        data: paperTypes
    })
}