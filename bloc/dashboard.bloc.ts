import { BlacReact, Cubit } from "blac";
import { NextRouter } from "next/router";
import { ApiResponse } from "../models/api.model";
import { SubjectInterface } from "../models/subject.model";
import User from "../models/user.model";
import logger from "../utils/logger";

export interface DashboardState {
	subjects?: SubjectInterface[],
	selected?: SubjectInterface[],
}

export class DashboardBloc extends Cubit<DashboardState> {
	constructor() {
		super({ selected: [] })
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

	addSelected = (s: SubjectInterface) => {
		if (this.state.selected!.length >= 4 || this.state.selected!.includes(s)) return
		const sub = this.state.subjects?.find((e) => e.name == s.name)
		if (sub !== undefined) {
			this.emit({ ...this.state, selected: this.state.selected!.concat(sub) })
		}
	}

	removeSelected = (s: SubjectInterface) => {
		let index!: number
		for (let i = 0; i < this.state.selected!.length; i++) {
			if (this.state.selected![i].name === s.name) {
				index = i;
			}
		}
		if (index !== undefined) {
			this.emit({ ...this.state, selected: this.state.selected!.slice(0, index).concat(this.state.selected!.slice(index + 1)) })
		}
	}

	beginExam = (router: NextRouter) => {
		router.push('/exam')
	}

	clearSelection = () => {
		this.emit({ selected: [] })
	}
}
export const { useBloc: useDashboardBloc } = new BlacReact([new DashboardBloc()])