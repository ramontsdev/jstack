import { useState } from 'react';
import { Modal, Platform, TouchableOpacity } from 'react-native';
import { Button } from '../button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Form, Header, Input, ModalBody, Overlay } from './styles';

type TableModalProps = {
  visible: boolean;
  onClose?(): void;
  onSave(table: string): void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState('');

  function handleSave() {
    setTable('');
    onSave(table);
    onClose?.();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
    >
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight='600'>Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color='#566' />
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              placeholder='Número da mesa'
              placeholderTextColor="#566"
              keyboardType='number-pad'
              onChangeText={setTable}
            />

            <Button onPress={handleSave} disabled={table.length === 0}>
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
