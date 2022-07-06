import {
  Form,
  FormError,
  FieldError,
  Label,
  TextAreaField,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { Input } from 'rsuite'

const DatasetForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.dataset?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.dataset?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="task"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Task
        </Label>

        <TextField
          name="task"
          defaultValue={props.dataset?.task}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="task" className="rw-field-error" />

        <Label
          name="license"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          License
        </Label>

        <TextField
          name="license"
          defaultValue={props.dataset?.license}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="license" className="rw-field-error" />

        <Label
          name="readme"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          README
        </Label>

        <TextAreaField
          name="readme"
          defaultValue={props.dataset?.readme}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default DatasetForm
