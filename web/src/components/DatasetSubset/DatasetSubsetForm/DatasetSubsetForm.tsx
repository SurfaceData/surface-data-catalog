import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'



const DatasetSubsetForm = (props) => {
  const onSubmit = (data) => {











    props.onSave(data, props?.datasetSubset?.id)
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
          name="language"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Language
        </Label>

        <TextField
          name="language"
          defaultValue={props.datasetSubset?.language}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />


        <FieldError name="language" className="rw-field-error" />

        <Label
          name="path"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Path
        </Label>

        <TextField
          name="path"
          defaultValue={props.datasetSubset?.path}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />


        <FieldError name="path" className="rw-field-error" />

        <Label
          name="datasetId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Dataset id
        </Label>

        <TextField
          name="datasetId"
          defaultValue={props.datasetSubset?.datasetId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />


        <FieldError name="datasetId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default DatasetSubsetForm
