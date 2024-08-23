import React, { useEffect, useRef } from 'react';
import Footer from '@/components/Footer';
import Logo from '@/assets/logo.svg';
import LoginForm from './form';
import LoginBanner from './banner';
import styles from './style/index.module.less';
import RegisterForm from './registerForm';

function Login() {
  const registerRef = useRef<any>(null);

  useEffect(() => {
    document.body.setAttribute('arco-theme', 'light');
  }, []);

  const handleClickRegister = () => {
    registerRef.current.showModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
        <div className={styles['logo-text']}>Arco Design Pro</div>
      </div>
      <div className={styles.banner}>
        <div className={styles['banner-inner']}>
          <LoginBanner />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles['content-inner']}>
          <LoginForm handleClickRegister={handleClickRegister} />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
      <RegisterForm registerRef={registerRef} />
    </div>
  );
}
Login.displayName = 'LoginPage';

export default Login;
