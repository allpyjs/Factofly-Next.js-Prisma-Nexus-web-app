import Modal from 'react-bootstrap/Modal';
import EditDeductionForm from '~/features/deductions/components/EditDeductionForm';

type DeductionModalProps = {
  show: boolean;
  onHide: () => void;
  deduction: { id: number; description: string };
};

// eslint-disable-next-line no-empty-pattern
function DeductionModal({ show, onHide, deduction }: DeductionModalProps): JSX.Element {
  return (
    <div>
      <Modal show={show} onHide={onHide} size="xl" centered>
        <Modal.Header closeButton className="py-0">
          <Modal.Title>{deduction.description}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="deduction-modal p-0">
          <EditDeductionForm
            id={deduction.id}
            showStatusForm={false}
            showUpload={false}
            showTitle={false}
            onCompleted={onHide}
          />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
      <style jsx>{`
        embed {
          margin: auto;
        }
        :global(.deduction-modal) :global(.card) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}

export default DeductionModal;
