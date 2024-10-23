import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type DeleteConfirmationModalProps = { onConfirm: Function; show: boolean; onClose: () => void };

export default function DeleteConfirmationModal({
  onConfirm,
  show,
  onClose: handleClose
}: DeleteConfirmationModalProps) {
  const { t } = useTranslation('common');

  const handleConfirm = useCallback(() => {
    onConfirm();
    handleClose();
  }, [onConfirm, handleClose]);

  return (
    <>
      <Modal show={show} onHide={handleClose} className="delete-confirmation-modal" centered>
        <Modal.Header>
          <Modal.Title>{t('headers.deleteConfirmation')}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('buttons.cancel')}
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            {t('buttons.delete')}
          </Button>
        </Modal.Footer>
      </Modal>
      <style jsx>{`
        :global(.delete-confirmation-modal) {
          margin-top: -200px;
        }
        :global(.delete-confirmation-modal) :global(.modal-header),
        :global(.delete-confirmation-modal) :global(.modal-footer) {
          border: none;
        }

        :global(.delete-confirmation-modal) :global(.modal-title.h4) {
          margin: 0;
        }
      `}</style>
    </>
  );
}
