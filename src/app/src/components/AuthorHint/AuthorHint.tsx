// import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import React, { useState } from 'react';
import styles from './author-hint.module.scss';

type AuthorHintProps = React.ComponentPropsWithoutRef<'div'> & {
  hint?: string;
};

const AuthorHint: React.FC<AuthorHintProps> = ({ hint = 'It works!', children, ...rest }) => {
    const [counter, setCounter] = useState<number>(0);
  // const { sitecoreContext } = useSitecoreContext();
  // !sitecoreContext?.pageEditing ? null :
  return (
    <div className={styles.hintBox} {...rest}>
      {!!hint && <p>&#9432; {hint}</p>}
      {children}
      <button onClick={() => setCounter(x => x+1)}>Click Me {(counter > 0 ? `(${counter})` : '')}</button>
    </div>
  );
};

export default AuthorHint;
