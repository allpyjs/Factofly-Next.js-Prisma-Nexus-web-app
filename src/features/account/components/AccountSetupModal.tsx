import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import useUser from '~/contexts/User/useUser';
import AccountSetupForm from './AccountSetupForm';

export default function AccountSetupModal() {
  const { accountSetupComplete, emailVerified } = useUser();

  const showModal = !accountSetupComplete && emailVerified;
  const [isOpen, setIsOpen] = useState(showModal);

  return (
    <div>
      <Modal show={isOpen} size="lg" centered>
        <Modal.Body className="p-0">
          {!accountSetupComplete && <AccountSetupForm onCompleted={() => setIsOpen(false)} />}
        </Modal.Body>
      </Modal>
      <style jsx>{`
        embed {
          margin: auto;
        }
      `}</style>
    </div>
  );
}
