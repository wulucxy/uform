import React from 'react'
import SchemaForm, {
  Field,
  registerFormField,
  connect,
  createFormActions
} from '../index'
import { render, fireEvent } from 'react-testing-library'

beforeEach(() => {
  registerFormField(
    'mutator',
    connect()(props => (
      <div>
        <button
          onClick={() => {
            props.value[0].aaa = '321'
            props.onChange(props.value)
          }}
        >
          Change Value
        </button>
        {props.value && props.value[0] && props.value[0].aaa}
      </div>
    ))
  )
})

test('update value by ref', async () => {
  const actions = createFormActions()
  const TestComponent = () => (
    <SchemaForm defaultValue={{ mutator: [{ aaa: '123' }] }} actions={actions}>
      <Field name='mutator' type='mutator' />
    </SchemaForm>
  )

  const { queryByText } = render(<TestComponent />)
  await sleep(100)
  expect(queryByText('123')).toBeVisible()
  fireEvent.click(queryByText('Change Value'))
  await sleep(100)
  expect(queryByText('321')).toBeVisible()
})
