import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'semantic-ui-react'
import {CopyToClipboard} from 'react-copy-to-clipboard'

class SearchPage extends Component {
  
  getTableRows = () => {
    return this.props.listData.map((d, index) => {
      return (
        <Table.Row
          key={d.id}
        >
          <Table.Cell collapsing>
              {index + 1}
          </Table.Cell>
          <Table.Cell>{d.content}</Table.Cell>
          <Table.Cell>
          <CopyToClipboard text={d.content}>
            <Button
              inverted
              color='red'
            >Copy
            </Button>
          </CopyToClipboard>
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  render () {
    return (
      <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>Results</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              this.getTableRows()
            }
          </Table.Body>
        </Table>
    )
  }
}

const mapStateToProps = (state) => ({
  listData: state.search.listData,
  listFetching: state.search.listFetching
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
