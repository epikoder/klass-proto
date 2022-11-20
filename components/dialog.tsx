import { ModalDialog } from "@mui/joy"
import { FC, PropsWithChildren } from "react"

const Dialog: FC<PropsWithChildren> = (props) => {
    return <ModalDialog>
        {props.children}
    </ModalDialog>
}

export default Dialog