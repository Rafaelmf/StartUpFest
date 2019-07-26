import React, { PureComponent } from 'react';
import { Modal, Divider, Rate } from 'antd';
import PropTypes from 'prop-types';
import noLogo from '../img/no-logo.jpg';
import './RatingCard.css';

export default class RatingCard extends PureComponent {
  render() {
    const {
      modalVisible, selectedSegment, selectedStartup, onOk, onCancel,
    } = this.props;
    return (
      <React.Fragment>
        {modalVisible && (
          <Modal
            title={`Segmento: ${selectedSegment.name}`}
            visible={modalVisible}
            onOk={onOk}
            onCancel={onCancel}
          >
            <div className="modal-content">
              <b className="modal-description">{selectedStartup.name}</b>
              <p className="modal-description">{selectedStartup.description}</p>
              <Divider className="modal-description" />
              <div>
                <img
                  alt="exemplo"
                  className="modal-img"
                  src={selectedStartup.imageUrl}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = noLogo;
                  }}
                />
              </div>
              <div>
                <p>Proposta:</p>
                <Rate allowHalf />
                <p>Proposta:</p>
                <Rate allowHalf />
                <p>Proposta:</p>
                <Rate allowHalf />
              </div>
            </div>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

RatingCard.defaultProps = {
  modalVisible: {},
  selectedSegment: {},
  selectedStartup: {},
  onOk: {},
  onCancel: {},
};

RatingCard.propTypes = {
  modalVisible: PropTypes.bool,
  selectedSegment: PropTypes.shape({}),
  selectedStartup: PropTypes.shape({}),
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};
