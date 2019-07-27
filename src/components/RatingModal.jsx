import React, { Component } from 'react';
import { Modal, Divider, Rate, Button, Tooltip, Icon, Form } from 'antd';
import PropTypes from 'prop-types';
import noLogo from '../img/no-logo.jpg';
import './RatingModal.css';
import Firebase from '../dataSource/fireBase';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';

class RatingModal extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        //Getting information from DB
        const data = await Firebase.database()
          .ref('/rating/' + this.props.selectedStartup.name.replace(/[^a-zA-Z ]/g, ''))
          .once('value')
          .then(snapshot => {
            return snapshot.val();
          });

        // Updating database
        const postData = {
          count: data ? data.count + 1 : 1,
          rateDevelopment: data
            ? (data.rateDevelopment * data.count + values.rateDevelopment) / (data.count + 1)
            : values.rateDevelopment,
          rateIdea: data
            ? (data.rateIdea * data.count + values.rateIdea) / (data.count + 1)
            : values.rateIdea,
          ratePresentation: data
            ? (data.ratePresentation * data.count + values.ratePresentation) / (data.count + 1)
            : values.ratePresentation,
          segmentName: this.props.selectedSegment.name,
        };
        var updates = {};
        updates['/rating/' + this.props.selectedStartup.name.replace(/[^a-zA-Z ]/g, '')] = postData;
        Firebase.database()
          .ref()
          .update(updates);

        this.props.onCancel();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { modalVisible, selectedSegment, selectedStartup, onOk, onCancel } = this.props;
    return (
      <React.Fragment>
        {modalVisible && (
          <Form onSubmit={this.handleSubmit}>
            <Modal
              title={`Segmento: ${selectedSegment.name}`}
              visible={modalVisible}
              footer={[
                <Button key="back" onClick={onCancel}>
                  Cancelar
                </Button>,
                <Button htmlType="submit" key="submit" type="primary" onClick={this.handleSubmit}>
                  Enviar
                </Button>,
              ]}
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
                    onError={e => {
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
                  <Form.Item>
                    {getFieldDecorator('rateIdea', {
                      initialValue: 0,
                    })(<Rate style={{ color: 'black' }} allowHalf />)}
                  </Form.Item>
                  <span className="rating-p">
                    <Tooltip title="A startup soube demonstrar a sua proposta?">
                      <Icon type="question-circle" />
                    </Tooltip>
                    Apresentação / Pitch:
                  </span>
                  <Form.Item>
                    {getFieldDecorator('ratePresentation', {
                      initialValue: 0,
                    })(<Rate style={{ color: 'black' }} allowHalf />)}
                  </Form.Item>
                  <span className="rating-p">
                    <Tooltip title="No estagio atual do produto/serviço, atende bem a proposta?">
                      <Icon type="question-circle" />
                    </Tooltip>
                    Desenvolvimento:
                  </span>
                  <Form.Item>
                    {getFieldDecorator('rateDevelopment', {
                      initialValue: 0,
                    })(<Rate style={{ color: 'black' }} allowHalf />)}
                  </Form.Item>{' '}
                </div>
              </div>
            </Modal>
          </Form>
        )}
      </React.Fragment>
    );
  }
}

const WrappedRatingModal = Form.create()(RatingModal);

export default WrappedRatingModal;

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
