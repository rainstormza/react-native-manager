import React, { Component } from 'react'
import { Scene, Router, Stack, Actions } from 'react-native-router-flux'
import LoginFormManager from './components/Manager/LoginForm'
import EmployeeList from './components/Manager/EmployeeList'
import EmployeeCreate from './components/Manager/EmployeeCreate'
import EmployeeEdit from './components/Manager/EmployeeEdit'

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar>
        <Stack key="auth">
          <Scene
            key="login"
            component={LoginFormManager}
            title="Please Login"
          />
        </Stack>
        <Stack key="main">
          <Scene
            key="employeeList"
            component={EmployeeList}
            title="Employees"
            backTitle=" "
            rightTitle="Add"
            onRight={() => Actions.employeeCreate()}
          />
          <Scene
            key="employeeCreate"
            component={EmployeeCreate}
            title="Create Employee"
            backTitle=" "
          />
          <Scene
            key="employeeEdit"
            component={EmployeeEdit}
            title="Edit Employee"
            backTitle=" "
          />
        </Stack>
      </Stack>
    </Router>
  )
}

export default RouterComponent
