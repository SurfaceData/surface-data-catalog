import { Label, TextField } from '@redwoodjs/forms'
import styled, { css } from 'styled-components'

const StyledContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	margin-bottom: 1.5rem;
`;

const StyledTextField = styled(TextField)`
	box-sizing: border-box;
	border: 1.6px solid #e6e4e1;
	border-radius: 2px;
	padding: 13px;
	font-size: 16px;
	color: #000;
	background-color: #fff;
`;

const StyledLabel = styled(Label)`
	margin-inline-start: 9px;
	padding: 0 5px;
	position: absolute;
	top: -8px;
	background: #fff;
	font-size: 12px;
	color: #959595;
	z-index: 1;
`;

const SurfaceTextField = (props) => {
	const { name, children, ...rest } = props
	return (
		<StyledContainer>
			<StyledLabel name={name}>{children}</StyledLabel>
			<StyledTextField name={name} {...rest} />
		</StyledContainer>
	)
}

export default SurfaceTextField;
