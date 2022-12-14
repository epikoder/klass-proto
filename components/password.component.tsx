import { Visibility, VisibilityOff } from "@mui/icons-material"
import { TextField, TextFieldProps } from "@mui/joy"
import { FC, useState } from "react"

const PasswordInput: FC<TextFieldProps> = (props) => {
	const [visible, setVisibile] = useState(false)
	const toggleVisibility = () => setVisibile(!visible)
	return <TextField
		{...props}
		type={visible ? 'text' : 'password'}
		endDecorator={<div onClick={toggleVisibility} className='cursor-pointer'>
			{visible ? <Visibility/> : <VisibilityOff/>}
		</div>} />
}

export default PasswordInput