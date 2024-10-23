import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';
import classNames from 'classnames';
import Lottie from 'react-lottie';
import Image from 'next/image';
import Countdown from 'react-countdown';
import { addSeconds } from 'date-fns';
import SubmitButton from '~/features/forms/components/SubmitButton';
import FormError from '~/features/forms/components/FormError';
import usePersonalDetailsForm from './steps/usePersonalDetailsForm';
import FadeIn from '~/features/shared/components/FadeIn';
import useUser from '~/contexts/User/useUser';
import FormWrapper from '~/features/forms/components/FormWrapper';
import FormValidationErrors from '~/features/forms/components/FormValidationErrors';
import PersonalDetailsForm from './steps/PersonalDetailsForm';
import useReferralSourceForm from './steps/useReferralSourceForm';
import ReferralSourceForm from './steps/ReferralSourceForm';
import useSituationForm from './steps/useSituationForm';
import SituationForm from './steps/SituationForm';
import useUpdateUser from '../../hooks/useUpdateInvoices';
import * as completeTickAnimation from './animations/complete-tick.json';

type AccountSetupFormProps = {
  onCompleted: () => void;
};

type Step = {
  name: string;
  onSubmit: (formData: any) => void;
  form?: any;
  loading?: boolean;
  isRequired?: (name: string) => boolean;
  saving?: boolean;
  error?: any;
};

function AccountSetupForm({ onCompleted }: AccountSetupFormProps): JSX.Element {
  const { t } = useTranslation('users');
  const { id: userId } = useUser();

  const [completed, setCompleted] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);

  const { updateUser } = useUpdateUser({ onCompleted });

  const prevStep = useCallback(() => {
    setCurrentStep((x) => x - 1);
  }, [setCurrentStep]);

  const nextStep = useCallback(() => {
    setCurrentStep((x) => x + 1);
  }, [setCurrentStep]);

  const completeAccountSetup = useCallback(() => {
    setCompleted(true);
  }, []);

  const steps: Step[] = [
    { name: 'situation', ...useSituationForm(userId, { onCompleted: nextStep }) },
    { name: 'profile', ...usePersonalDetailsForm(userId, { onCompleted: nextStep }) },
    { name: 'referral', ...useReferralSourceForm(userId, { onCompleted: nextStep }) },
    { name: 'welcome', onSubmit: nextStep }
  ];

  const progress = ((currentStep + 1) / (steps.length - 1)) * 100;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep >= steps.length - 1;

  const step = steps[currentStep];

  const countdownButtonRenderer = ({ seconds }: { seconds: number }) => (
    <SubmitButton
      title={t('accountSetup.buttons.completeSetup', { seconds })}
      onClick={completeAccountSetup}
      saving={false}
    />
  );

  if (step.loading) return <div className="loading" />;

  return (
    <FadeIn>
      {!completed && step.form ? (
        <FormWrapper form={step.form} onSubmit={step.onSubmit}>
          <div className="card form-card m-0">
            <div className="card-body p-5 pb-2">
              <div className="text-center pb-3">
                <h2>{t(`accountSetup.steps.${step.name}.title`)}</h2>
                <p className="fs-4">{t(`accountSetup.steps.${step.name}.subtitle`)}</p>
              </div>
              {currentStep === 0 && <SituationForm isRequired={step.isRequired!} />}
              {currentStep === 1 && <PersonalDetailsForm isRequired={step.isRequired!} />}
              {currentStep === 2 && <ReferralSourceForm isRequired={step.isRequired!} />}
              <div className="my-3">
                <div>{t('accountSetup.stepOf', { count: currentStep + 1, max: steps.length - 1 })}</div>
                <div className="progress">
                  <div className="progress-bar" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
            <div className="card-footer">
              {step.error && <FormError message={step.error.message} />} <FormValidationErrors />
              <div className="actions my-2">
                <button
                  type="button"
                  onClick={prevStep}
                  className={classNames('btn btn-secondary', { invisible: isFirstStep })}
                >
                  {t('accountSetup.buttons.previous')}
                </button>

                <SubmitButton
                  className="float-end"
                  title={
                    isLastStep ? t('accountSetup.buttons.completeSetup') : t('accountSetup.buttons.next')
                  }
                  saving={step.saving!}
                />
              </div>
            </div>
          </div>
        </FormWrapper>
      ) : (
        <div className="card continue-card m-0">
          {!completed && currentStep === 3 && (
            <div className="card-body text-center">
              <div className="image-wrapper text-center p-3">
                <Image src="/images/fainting-happy.gif" width={300} height={170} />
              </div>
              <h2>{t('accountSetup.steps.welcome.title')}</h2>
              <p className="fs-4">{t(`accountSetup.steps.welcome.subtitle`)}</p>
              <div className="text-center mb-2 mt-5">
                <Countdown
                  date={addSeconds(new Date(), 10)}
                  renderer={countdownButtonRenderer}
                  onComplete={completeAccountSetup}
                />
              </div>
            </div>
          )}
          {completed && (
            <div className="card-body text-center">
              <Lottie
                options={{
                  loop: false,
                  autoplay: true,
                  animationData: completeTickAnimation,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                  }
                }}
                height={400}
                width={400}
                isStopped={!completed}
                isPaused={completed}
                eventListeners={[
                  {
                    eventName: 'complete',
                    callback: () => updateUser(userId, { accountSetupComplete: true })
                  }
                ]}
              />
              <p className="fs-3 fw-bold">{t('accountSetup.complete')}</p>
            </div>
          )}
        </div>
      )}
      <style jsx>{`
        .form-card,
        .loading {
          min-height: 600px;
        }
        .continue-card :global(.btn) {
          width: 200px;
        }
      `}</style>
    </FadeIn>
  );
}

export default AccountSetupForm;
