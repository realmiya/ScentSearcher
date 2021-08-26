import React from 'react';

const withModal = (Component) => {
  class Modal extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        showModal: undefined,
      };

      this.handleShowModalChange = this.handleShowModalChange.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

    handleShowModalChange(newShowModal) {
      this.setState({
        showModal: newShowModal,
      });
    }

    closeModal() {
      this.handleShowModalChange();
    }

    render() {
      const { showModal } = this.state;

      return (
        <Component
          {...this.props}
          showModal={showModal}
          handleShowModalChange={this.handleShowModalChange}
          closeModal={this.closeModal}
        />
      );
    }
  }

  return Modal;
};

export default withModal;
