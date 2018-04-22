import React from 'react'
import { withRouter } from 'react-router-dom'
import StyleToolbar from 'src/components/selectable/StyleToolbar'
import Poem from 'src/components/poem/Poem.jsx'
import { Query } from 'react-apollo'
import GET_SINGLE_POEM from 'src/components/poem/getSinglePoem'

const StyleViewWData = ({ match }) => (
  <Query query={GET_SINGLE_POEM} variables={{ id: Number(match.params.id) }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>
      return <StyleView poem={data.poem} />
    }}
  </Query>
)

class StyleView extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = props.poem
  }
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.poem)
  }

  updateStyle = ({ backgroundId, colorRange }) => {
    backgroundId && this.setState({ backgroundId })
    colorRange && this.setState({ colorRange })
  }

  render() {
    return (
      <div className="close-up-poem-view">
        <h1>Stylize</h1>
        <StyleToolbar
          poem={this.state}
          updateStyle={this.updateStyle}
          colorRange={this.state.colorRange}
          backgroundId={this.state.backgroundId}
        />
        <Poem poem={this.state} />
      </div>
    )
  }
}

export default withRouter(StyleViewWData)