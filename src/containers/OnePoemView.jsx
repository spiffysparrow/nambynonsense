import React from 'react';
import { connect } from 'react-redux';
import { getPoem } from '../actions/index';

class OnePoemView extends React.Component {
  componentWillMount() {
    this.props.getPoem(this.props.id);
  }
  render() {
    const { id, poems } = this.props;
    return (
      <div>
        {poems[id] ? poems[id].passage : 'loading'}
      </div>
    );
  }
}

OnePoemView.propTypes = {
  poems: React.PropTypes.object,
  getPoem: React.PropTypes.func,
  id: React.PropTypes.number,
};

const mapDispatchToProps = {
  getPoem,
};

function mapStateToProps(state) {
  return {
    poems: state.poems,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnePoemView);