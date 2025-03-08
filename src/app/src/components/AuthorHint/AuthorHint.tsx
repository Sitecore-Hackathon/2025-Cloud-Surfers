// import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';
import styles from './author-hint.module.scss';

type AuthorHintProps = React.ComponentPropsWithoutRef<'div'> & {
  hint?: string;
};

const AuthorHint: React.FC<AuthorHintProps> = ({ hint = 'It works!', children, ...rest }) => {
  // const { sitecoreContext } = useSitecoreContext();
  // !sitecoreContext?.pageEditing ? null :
  return (
    <div className={styles.hintBox} {...rest}>
      {!!hint && <p>&#9432; {hint}</p>}
      {children}
    </div>
  );
};

export default AuthorHint;
