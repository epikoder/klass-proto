import { TopicInterface } from "./topic.model"

export interface SubjectInterface {
    id: number
    name: string
    description: string
    topics?: TopicInterface[]
}

export default class Subject {

}