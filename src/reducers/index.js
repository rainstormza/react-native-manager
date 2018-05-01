import { combineReducers } from 'redux'
import LibraryRecuder from './LibraryReducer'
import SelectionReducer from './SelectionReducer'
import AuthReducer from './AuthReducer'
import EmployeeFormReducer from './EmployeeFormReducer'
import EmployeeReducer from './EmployeeReducer'

export default combineReducers({
  libraries: LibraryRecuder,
  selectedLibraryId: SelectionReducer,
  auth: AuthReducer,
  employeeForm: EmployeeFormReducer,
  employees: EmployeeReducer
})
