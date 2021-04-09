import React from 'react';
import {
  Modal, Button, Icon, Header, ButtonProps,
} from 'semantic-ui-react';

type btnClick = (event: React.MouseEvent, data: ButtonProps) => void;

export const ModalWindow = (
  status: boolean,
  title: string,
  text: string,
  onCancel: btnClick,
  onOk: btnClick,
  saveButton: string,
  cancelButton : string,
): JSX.Element => (
  <Modal
    open={status}
  >
    <Header icon="archive" content={title} />
    <Modal.Content>
      <p>
        {text}
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button
        onClick={onCancel}
        color="grey"
      >
        <Icon name="remove" />
        {' '}
        {cancelButton}
      </Button>
      <Button
        color="blue"
        onClick={onOk}
      >
        <Icon name="checkmark" />
        {' '}
        {saveButton}
      </Button>
    </Modal.Actions>
  </Modal>
);