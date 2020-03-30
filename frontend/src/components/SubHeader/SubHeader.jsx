import React from 'react'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'

const SubHeader = () => (
  <>
    <ListSubheader component="div" id="nested-list-subheader">
      Super Shop
    </ListSubheader>
    <Divider />
  </>
)

export default SubHeader
