/* eslint-disable */
// @ts-nocheck
import { addTlsCertificate, deleteTlsCertificate, getTlsCertificates, updateTlsCertificate } from '@/services';
import { PageContainer } from '@ant-design/pro-layout';
import { useRequest } from 'ahooks';
import { Button, Col, Drawer, Form, Modal, Row, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { TriangleAlert, RotateCcw } from 'lucide-react';
import TlsCertificateForm from './components/TlsCertificateForm';

const TlsCertificateList: React.FC = () => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('tlsCertificate.columns.name'),
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: t('tlsCertificate.columns.domains'),
      dataIndex: 'domains',
      key: 'domains',
      ellipsis: true,
    },
    {
      title: t('tlsCertificate.columns.expireAt'),
      dataIndex: 'expireAt',
      key: 'expireAt',
      ellipsis: true,
    },
    {
      title: t('tlsCertificate.columns.action'),
      dataIndex: 'action',
      key: 'action',
      width: 140,
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <a onClick={() => onEditDrawer(record)}>{t('misc.edit')}</a>
          <a onClick={() => onShowModal(record)}>{t('misc.delete')}</a>
        </Space>
      ),
    },
  ];

  const [form] = Form.useForm();
  const formRef = useRef(null);
  const [dataSource, setDataSource] = useState([]);
  const [currentTlsCertificate, setCurrentTlsCertificate] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { loading, run, refresh } = useRequest(getTlsCertificates, {
    manual: true,
    onSuccess: (result = []) => {
      const _dataSource = result || [];
      _dataSource.forEach(i => {
        i.domains && Array.isArray(i.domains) && i.domains.length > 0 && (i.domains = i.domains.join(', '))
      });
      setDataSource(_dataSource);
    },
  });

  useEffect(() => {
    run();
  }, []);

  const onEditDrawer = (cert) => {
    setCurrentTlsCertificate(cert);
    setOpenDrawer(true);
  };

  const onShowDrawer = () => {
    setOpenDrawer(true);
    setCurrentTlsCertificate(null);
  };

  const handleDrawerOK = async () => {
    try {
      const values = formRef.current ? await formRef.current.handleSubmit() : {};
      if (currentTlsCertificate) {
        await updateTlsCertificate({ version: currentTlsCertificate.version, ...values });
      } else {
        await addTlsCertificate(values);
      }

      setOpenDrawer(false);
      formRef.current && formRef.current.reset();
      refresh();
    } catch (errInfo) {
      console.log('Save failed: ', errInfo);
    }
  };

  const handleDrawerCancel = () => {
    setOpenDrawer(false);
    formRef.current && formRef.current.reset();
    setCurrentTlsCertificate(null);
  };

  const onShowModal = (cert) => {
    setCurrentTlsCertificate(cert);
    setOpenModal(true);
  };

  const handleModalOk = async () => {
    setConfirmLoading(true);
    await deleteTlsCertificate(currentTlsCertificate.name);
    setConfirmLoading(false);
    setOpenModal(false);
    setCurrentTlsCertificate(null);
    refresh();
  };

  const handleModalCancel = () => {
    setOpenModal(false);
    setCurrentTlsCertificate(null);
  };

  return (
    <PageContainer>
      <Form
        form={form}
        style={{
          background: '#fff',
          height: 64,
          paddingTop: 16,
          marginBottom: 16,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <Row gutter={24}>
          <Col span={4}>
            <Button
              type="primary"
              onClick={onShowDrawer}
            >
              {t('tlsCertificate.createTlsCertificate')}
            </Button>
          </Col>
          <Col span={20} style={{ textAlign: 'right' }}>
            <Button onClick={refresh}>
              <RotateCcw size={16} />
            </Button>
          </Col>
        </Row>
      </Form>
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
      <Drawer
        title={t(currentTlsCertificate ? 'tlsCertificate.editTlsCertificate' : 'tlsCertificate.createTlsCertificate')}
        placement="right"
        width={660}
        onClose={handleDrawerCancel}
        open={openDrawer}
        extra={{
          }
        }
      >
        {/* @ts-ignore */}
        <TlsCertificateForm ref={formRef} value={currentTlsCertificate} />
      </Drawer>
      <Modal
        title={<div><TriangleAlert style={{ color: '#ffde5c', marginRight: 8 }} size={16} />{t('misc.delete')}</div>}
        open={openModal}
        onOk={handleModalOk}
        confirmLoading={confirmLoading}
        onCancel={handleModalCancel}
        cancelText={t('misc.cancel')}
        okText={t('misc.confirm')}
      >
        <p>
          <Trans t={t} i18nKey="tlsCertificate.deleteConfirmation">
            确定删除 <span style={{ color: '#0070cc' }}>{{ currentTlsCertificateName: (currentTlsCertificate && currentTlsCertificate.name) || '' }}</span> 吗？
          </Trans>
        </p>
      </Modal>
    </PageContainer>
  );
};

export default TlsCertificateList;
