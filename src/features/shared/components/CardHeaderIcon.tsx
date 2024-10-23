import classNames from 'classnames';

type CardHeaderIconProps = {
  icon: string;
};

function CardHeaderIcon({ icon }: CardHeaderIconProps) {
  return (
    <>
      <i className={classNames(icon)} />
      <style jsx>{`
        i { 
            display: inline-block;
            width: 50px;
            height: 50px;
            padding: 10px 14px;
            border-right: 1px solid #dfdfdf;
            margin: 0;
            background: #f9fafd;
            color image-rendering: pixelated;
        }
    `}</style>
    </>
  );
}

export default CardHeaderIcon;
