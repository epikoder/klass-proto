import { FC, PropsWithChildren, ReactNode } from "react";

const LayoutApp: FC<PropsWithChildren> = (props) => {
	return <div className="h-full w-full bg-gray-300 flex flex-col justify-center items-center" style={{
		fontFamily: 'Space grotesk'
	}}>
		<div className="h-full w-full bg-white shadow-lg text-black">
			{props.children}
		</div>
	</div>
}
export default LayoutApp