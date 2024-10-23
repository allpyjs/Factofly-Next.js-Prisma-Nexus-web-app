/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

type FileUploadFieldProps = {
  name: string;
};

export default function FileUploadField({ name }: FileUploadFieldProps) {
  // const [files, setFiles] = useState([]);
  const { t } = useTranslation('common');
  const {
    setValue,
    watch,
    formState: { errors }
  } = useFormContext();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
      'application/pdf': ['.pdf']
    },
    onDrop: (acceptedFiles: any) => {
      setValue(name, acceptedFiles.length > 0 ? acceptedFiles[0] : null);
    }
  });

  const value = watch(name);
  const filePreview = useMemo(
    () =>
      value
        ? Object.assign(value, {
            preview: URL.createObjectURL(value)
          })
        : null,
    [value]
  );

  const isValid = errors[name] === undefined;

  return (
    <div className={classNames('form-group mb-2 ', { 'form-group-invalid': !isValid })}>
      <section>
        <div className="dropzone" {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="dz-message needsclick">
            <i className="h1 text-muted dripicons-cloud-upload" />
            <h3>{t('messages.dropZone')}</h3>
          </div>
        </div>
      </section>
      {errors[name]?.message && <div className="invalid-feedback">{errors[name]?.message}</div>}
      <aside className="mt-3">
        {filePreview && filePreview.type !== 'application/pdf' && (
          <div className="thumbnail-preview">
            <Image
              src={filePreview.preview}
              alt="file-preview"
              width={300}
              height={300}
              onLoad={() => {
                URL.revokeObjectURL(filePreview.preview);
              }}
            />
          </div>
        )}
        {filePreview && filePreview.type === 'application/pdf' && (
          <div className="file-preview">
            <i className="uil uil-adobe" />
            {filePreview.path}
          </div>
        )}
      </aside>
      <style jsx>{`
        :global(.thumbnail-preview) {
          display: inline-block;
          border: 1px solid gray;
          padding: 3px;
          margin: 3px;
        }
        :global(.thumbnail-preview img) {
          object-fit: cover;
          height: 300px;
          width: 300px;
        }
        .invalid-feedback {
          display: block;
        }
        .file-preview {
          font-size: 2rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
