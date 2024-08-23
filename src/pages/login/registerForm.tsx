'use client';
import React, { useImperativeHandle, useState } from 'react';
import { Button, Form, Input, Message, Modal } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
const FormItem = Form.Item;
import locale from './locale';
import styles from './style/index.module.less';
function RegisterForm({ registerRef }) {
  const [form] = Form.useForm();
  const t = useLocale(locale);
  const [visible, setVisible] = useState(false);

  useImperativeHandle(registerRef, () => ({
    showModal: () => {
      setVisible(true);
    },
  }));

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title={t['login.form.register.title']}
      visible={visible}
      onOk={() => {
        console.log('Register');
      }}
      onCancel={onCancel}
      footer={null}
      className={styles.registerForm}
      //   style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ width: 320 }}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        onValuesChange={(v, vs) => {
          console.log(v, vs);
        }}
        onSubmit={(v) => {
          console.log(v);
          Message.success('success');
        }}
      >
        <FormItem
          label="用户名"
          field="name"
          rules={[{ required: true, message: 'username is required' }]}
        >
          <Input
            placeholder="please enter your username"
            maxLength={12}
            showWordLimit
          />
        </FormItem>
        <FormItem
          label="密码"
          field="password"
          rules={[{ required: true, message: 'password is required' }]}
        >
          <Input.Password
            maxLength={12}
            placeholder="please enter your password"
          />
        </FormItem>
        <FormItem
          label="确认密码"
          field="confirm_password"
          dependencies={['password']}
          rules={[
            {
              validator: (v, cb) => {
                if (!v) {
                  return cb('confirm_password is required');
                } else if (form.getFieldValue('password') !== v) {
                  return cb('confirm_password must be equal with password');
                }
                cb(null);
              },
            },
          ]}
        >
          <Input.Password
            maxLength={12}
            placeholder="please confirm your password"
          />
        </FormItem>
        <FormItem style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" long>
            Register
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
}

export default RegisterForm;
