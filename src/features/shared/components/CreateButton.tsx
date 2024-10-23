import classNames from 'classnames';
import Link from 'next/link';

type CreateButtonProps = {
  inline?: boolean;
  href: string;
  label: string;
};

export default function CreateButton({ inline = false, href, label }: CreateButtonProps) {
  return (
    <>
      <Link href={href}>
        <a className={classNames('btn btn-primary', { inline })}>
          <i className="uil-plus" />
          {label}
        </a>
      </Link>
      <style jsx>{`
        .btn.inline {
          margin-top: 1.5rem;
          width: 100%;
        }

        @media (max-width: 600px) {
          :global(.col-sm-3) > .btn.inline {
            margin-top: 0;
            margin-bottom: 1.5rem;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
