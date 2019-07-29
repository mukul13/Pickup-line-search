import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Form, Container, Header, Icon, Divider } from 'semantic-ui-react'
import _ from 'lodash'

import SearchActions from '../Redux/SearchRedux'

import SearchResults from './SearchResults'

class SearchPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      term: ''
    }
  }

  componentWillMount () {
    this.props.searchListRequest('')
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ term :value })

    this.props.searchListRequest(value)
  }

  render () {
    return (
      <Container>
      <Header as='h2' icon textAlign='center' style={{marginTop:'25px'}}>
          <Icon name='searchengin' medium circular color='red' />
          <Header.Content>Pickup Line Search for Tinder :P</Header.Content>
      </Header>

      <Divider />

      <Form>
          <Form.Field>
            <Form.Input
              loading={!!this.props.listFetching}
              onChange={_.debounce(this.handleSearchChange, 5000, {
                leading: true,
              })}
              placeholder='Enter keywords'
              value={this.state.term}
            />
          </Form.Field>
        </Form>

        <Divider />

        <SearchResults />
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  listData: state.search.listData,
  listFetching: state.search.listFetching
})

const mapDispatchToProps = (dispatch) => ({
  searchListRequest: (term) =>
    dispatch(SearchActions.searchListRequest(term))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
