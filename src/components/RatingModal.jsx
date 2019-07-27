import React from 'react';
import {
  Modal, Divider, Rate, Tooltip, Icon,
} from 'antd';
import PropTypes from 'prop-types';
import noLogo from '../img/no-logo.jpg';
import './RatingModal.css';

export default function RatingModal(props) {
  const {
    modalVisible, selectedSegment, selectedStartup, onOk, onCancel,
  } = props;
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
              <span className="rating-p">
                <Tooltip title="Quanto a ideia/proposta foi impactante?">
                  <Icon type="question-circle" />
                </Tooltip>
                Proposta:
              </span>
              <Rate style={{ color: 'black' }} allowHalf />
              <span className="rating-p">
                <Tooltip title="A startup soube demonstrar a sua proposta?">
                  <Icon type="question-circle" />
                </Tooltip>
                Apresentação / Pitch:
              </span>
              <Rate style={{ color: 'black' }} allowHalf />
              <span className="rating-p">
                <Tooltip title="No estagio atual do produto/serviço, atende bem a proposta?">
                  <Icon type="question-circle" />
                </Tooltip>
                Desenvolvimento:
              </span>
              <Rate style={{ color: 'black' }} allowHalf />
            </div>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
}

RatingModal.defaultProps = {
  modalVisible: {},
  selectedSegment: {},
  selectedStartup: {},
  onOk: {},
  onCancel: {},
};

RatingModal.propTypes = {
  modalVisible: PropTypes.bool,
  selectedSegment: PropTypes.shape({
    name: PropTypes.string,
  }),
  selectedStartup: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};
