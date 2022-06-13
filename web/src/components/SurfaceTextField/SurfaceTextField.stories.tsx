import { Form } from '@redwoodjs/forms'

import SurfaceTextField from './SurfaceTextField'

export const generated = () => {
	const onSubmit = () => {}
	return (
		<Form>
			<SurfaceTextField name="email">Email</SurfaceTextField>
		</Form>
	)
}

export default { title: 'Components/SurfaceTextField' }
