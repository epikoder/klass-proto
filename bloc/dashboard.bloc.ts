import { BlacReact, Cubit } from "blac";
import { NextRouter } from "next/router";
import { ApiResponse } from "../models/api.model";
import { SubjectInterface } from "../models/subject.model";
import { TopicInterface } from "../models/topic.model";
import User from "../models/user.model";
import logger from "../utils/logger";

export interface DashboardState {
	subjects?: SubjectInterface[]
	selected?: SubjectInterface
	topics?: TopicInterface[]
}

export class DashboardBloc extends Cubit<DashboardState> {
	constructor() {
		super({})
	}

	load = async (user: User): Promise<void> => {
		try {
			const res: Response = await fetch('/api/dashboard')
			if (res.status != 200) {
				return this.emit({ ...this.state, subjects: [] })
			}
			this.emit({
				...this.state,
				subjects: (await res.json() as ApiResponse<DashboardState>).data?.subjects
			})
		} catch (error) {
			logger(error)
		}
	}

	toggleSelect = (s: SubjectInterface) => {
		this.emit({ ...this.state, selected: s, topics: [] })
	}

	allSelected = (): boolean => {
		if (this.state.topics === undefined || this.state.selected === undefined || this.state.topics.length === 0) return false
		for (let i = 0; i < this.state.selected?.topics?.length!; i++) {
			if (!this.state.topics.includes(this.state.selected.topics![i])) {
				return false
			}
		}
		return true
	}
	selectAllTopics = () => {
		if (this.allSelected()) return this.emit({ ...this.state, topics: [] })
		this.emit({ ...this.state, topics: this.state.selected?.topics })
	}

	addTopics = (t: TopicInterface) => {
		if (this.state.topics!.includes(t)) return
		const topic = this.state.selected?.topics?.find((e) => e.title === t.title)
		if (topic !== undefined) {
			this.emit({ ...this.state, topics: this.state.topics?.concat(topic) })
		}
	}

	removeTopic = (t: TopicInterface) => {
		let index!: number
		for (let i = 0; i < this.state.topics?.length!; i++) {
			if (this.state.topics![i].title === t.title) {
				index = i;
			}
		}
		if (index !== undefined) {
			this.emit({ ...this.state, topics: this.state.topics!.slice(0, index).concat(this.state.topics!.slice(index + 1)) })
		}
	}

	beginExam = (router: NextRouter) => {
		router.push('/exam')
	}

	clearSelection = () => {
		this.emit({ selected: undefined })
	}
}
export const { useBloc: useDashboardBloc } = new BlacReact([new DashboardBloc()])