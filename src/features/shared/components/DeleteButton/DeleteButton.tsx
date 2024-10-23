import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';

type DeleteButtonProps = { onConfirm: Function };

export default function DeleteButton({ onConfirm }: DeleteButtonProps) {
  const { t } = useTranslation('common');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button type="button" className="btn btn-danger" onClick={handleShow}>
        <i className="uil-trash" /> {t('buttons.delete')}
      </button>
      <DeleteConfirmationModal onConfirm={onConfirm} onClose={handleClose} show={show} />
    </>
  );
}
