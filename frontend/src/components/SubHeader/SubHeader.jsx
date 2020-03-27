import React from 'react'
import { ListSubheader, Divider } from '@material-ui/core'

const SubHeader = () => (
  <>
    <ListSubheader component="div" id="nested-list-subheader">
      Super Shop
    </ListSubheader>
    <Divider />
  </>
)

export default SubHeader
