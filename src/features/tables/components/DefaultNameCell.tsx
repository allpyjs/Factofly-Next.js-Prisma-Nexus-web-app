import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export type DefaultNameCellValue = {
  url?: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  avatarText?: string;
};

export type DefaultNameCellProps = {
  value: DefaultNameCellValue;
};

function DefaultNameCell({ value }: DefaultNameCellProps) {
  const content = (
    <>
      {value.imageUrl ? (
        <div className="avatar avatar-circle mr-3">
          <Image className="avatar-img" src={value.imageUrl} alt={value.avatarText ?? value.title} />
        </div>
      ) : (
        <div className="avatar avatar-soft-dark avatar-circle mr-3">
          <span className="avatar-initials">{value.avatarText ?? value.title?.substring(0, 2)}</span>
        </div>
      )}
      <div>
        <span className="d-block h5 text-hover-primary m-0">{value.title}</span>
        {value.subtitle && <span className="d-block font-size-sm text-body">{value.subtitle}</span>}
      </div>
      <style jsx>{`
        div.avatar {
          background: #d9d9d9;
          width: 40px;
          height: 40px;
          border-radius: 50px;
          color: white;
          text-align: center;
          padding-top: 8px;
          font-weight: bold;
          margin-right: 10px;
        }
      `}</style>
    </>
  );

  if (!value.url) {
    return <div className="d-flex">{content}</div>;
  }
  return (
    <Link className="d-flex" href={value.url}>
      <a>{content}</a>
    </Link>
  );
}

export default DefaultNameCell;
