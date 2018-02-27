import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      rotation: 0
    };
  }

  calcImageSize() {
    const {galleryWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({
      size
    });
  }

  componentDidMount() {
    this.calcImageSize();
    window.addEventListener('resize', this.calcImageSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calcImageSize);
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  delete(id){
    this.props.delete(this.props.dto.id);
  }

  rotate(){
    this.setState({rotation: (this.state.rotation + 90)%360});
  }

  render() {
    return (
      <div
        className="image-root"
        style={{
          width: this.state.size + 'px',
          height: this.state.size + 'px',
          position: 'relative',
          overflow: 'hidden'
        }}
        >
          <div
          className="image-background"
          style={{
          position: 'absolute',
          zIndex: '-1',
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          visibility: 'visible',
          WebkitTransform: 'rotate(' + this.state.rotation +'deg)',
          transform: 'rotate(' + this.state.rotation +'deg)'}} />
        <div>
          <FontAwesome className="image-icon" name="sync-alt" title="rotate"
          onClick={this.rotate.bind(this)}/>
          <FontAwesome className="image-icon" name="trash-alt" title="delete"
          onClick = {this.delete.bind(this)}/>
          <FontAwesome className="image-icon" name="expand" title="expand"/>
        </div>
      </div>
    );
  }
}

export default Image;
