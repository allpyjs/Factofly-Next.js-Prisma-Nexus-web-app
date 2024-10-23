import Link from 'next/link';

type ButtonLinkProps = {
  title: string;
  icon: string | JSX.Element;
  href: string;
};

function ButtonLink({ title, icon, href }: ButtonLinkProps): JSX.Element {
  return (
    <Link href={href}>
      <a className="btn btn-primary">
        {typeof icon === 'string' ? <i className={icon} /> : icon}
        {title}
      </a>
    </Link>
  );
}

export default ButtonLink;
