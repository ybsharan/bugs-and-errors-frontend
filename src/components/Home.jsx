import React, { useState } from 'react';
import { data } from './Data';
import { Table, Modal, Input, DatePicker, TimePicker, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import moment from 'moment';

const Home = () => {
  const [Data, setData] = useState(data);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    id: null,
    title: '',
    classLevel: '',
    pricing: '',
    classdurationFrom: null,
    classdurationTo: null,
    modeoflearning: '',
    classtime: ['', ''],
    description: '',
  });

  const handleAddModal = () => {
    setNewCourse({
      id: null,
      title: '',
      classLevel: '',
      pricing: '',
      classdurationFrom: null,
      classdurationTo: null,
      modeoflearning: '',
      classtime: ['', ''],
      description: '',
    });
    setAddModalOpen(true);
  };

  const handleSaveNewCourse = () => {
    // Add validation or other logic before saving the new course
    setData((prevData) => [...prevData, newCourse]);
    setAddModalOpen(false);
  };

  const Edit = (record) => {
    setEdit(record);
    setOpen(true);
  };

  const resetEditing = () => {
    setOpen(false);
  };

  const Delete = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this ?',
      onOk: () => {
        setData((pre) => {
          return pre.filter((person) => person.id !== record.id);
        });
      },
    });
  };

  const columns = [
    {
      key: 'id',
      title: 'Serial No.',
      dataIndex: 'serialno',
      width: 100,
    },
    {
      key: 'title',
      title: 'Title',
      dataIndex: 'title',
      width: 321,
    },
    {
      key: 'classLevel',
      title: 'Class Level',
      dataIndex: 'classLevel',
      width: 200,
    },
    {
      key: 'pricing',
      title: 'Pricing',
      dataIndex: 'pricing',
      width: 600,
    },
    {
      key: 'action',
      title: 'Actions',
      render: (record) => {
        return (
          <>
            <div className='flex'>
              <EditOutlined
                style={{ color: 'black', padding: '9px', fontSize: '15px' }}
                onClick={() => Edit(record)}
              />
              <Modal
                title={
                  <h2
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '15px',
                      textAlign: 'center',
                    }}
                  >
                    EDIT PSLE COURSE
                  </h2>
                }
                open={open}
                okText='Save'
                centered
                onCancel={resetEditing}
                width={950}
                bodyStyle={{ height: '350px' }}
                onOk={() => {
                  setData((pre) => {
                    return pre.map((course) => {
                      if (course.id === edit.id) {
                        return edit;
                      } else {
                        return course;
                      }
                    });
                  });
                  resetEditing();
                }}
              >
                <div
                  className='editContainer'
                  style={{ display: 'flex', flexDirection: 'row' }}
                >
                  <div style={{ flex: '1', marginRight: '10px' }}>
                    <Input
                      value={edit?.title}
                      placeholder='Title'
                      onChange={(e) => {
                        setEdit((pre) => {
                          return { ...pre, title: e.target.value };
                        });
                      }}
                      style={{ margin: '5px', padding: '12px' }}
                    />
                    <Input
                      value={edit?.classLevel}
                      placeholder='Class Level'
                      onChange={(e) => {
                        setEdit((pre) => {
                          return { ...pre, classLevel: e.target.value };
                        });
                      }}
                      style={{ margin: '5px', padding: '12px' }}
                    />
                    <Input
                      value={edit?.pricing}
                      placeholder='Pricing'
                      onChange={(e) => {
                        setEdit((pre) => {
                          return { ...pre, pricing: e.target.value };
                        });
                      }}
                      style={{ margin: '5px', padding: '12px' }}
                    />
                    <h4
                      style={{
                        margin: '10px',
                      }}
                    >
                      Class Duration
                    </h4>
                    <DatePicker
                      value={
                        edit?.classdurationFrom
                          ? dayjs(edit.classdurationFrom)
                          : null
                      }
                      placeholder='From'
                      onChange={(date) => {
                        setEdit((pre) => {
                          return { ...pre, classdurationFrom: date };
                        });
                      }}
                      style={{ margin: '5px', padding: '12px', width: '100%' }}
                    />
                    <DatePicker
                      value={
                        edit?.classdurationTo
                          ? dayjs(edit.classdurationTo)
                          : null
                      }
                      placeholder='To'
                      onChange={(date) => {
                        setEdit((pre) => {
                          return { ...pre, classdurationTo: date };
                        });
                      }}
                      style={{ margin: '5px', padding: '12px', width: '100%' }}
                    />
                  </div>
                  <div style={{ flex: '1', marginLeft: '10px' }}>
                    <Input
                      value={edit?.modeoflearning}
                      placeholder='Mode of Learning'
                      onChange={(e) => {
                        setEdit((pre) => {
                          return { ...pre, modeoflearning: e.target.value };
                        });
                      }}
                      style={{ margin: '5px', padding: '12px' }}
                    />

                    <h4 style={{ marginLeft: '9px' }}>Class Time</h4>
                    <Space
                      direction='vertical'
                      style={{ margin: '5px', width: '100%' }}
                    >
                      <TimePicker.RangePicker
                        value={
                          edit?.classtime && edit.classtime.length === 2
                            ? [
                                moment(edit.classtime[0], 'HH:mm'),
                                moment(edit.classtime[1], 'HH:mm'),
                              ]
                            : null
                        }
                        placeholder={['From', 'To']}
                        onChange={(times) => {
                          setEdit((prev) => ({
                            ...prev,
                            classtime: [
                              times[0] ? times[0].format('HH:mm') : '',
                              times[1] ? times[1].format('HH:mm') : '',
                            ],
                          }));
                        }}
                        format='HH:mm'
                        style={{
                          margin: '5px',
                          padding: '12px',
                          width: '100%',
                        }}
                      />
                    </Space>
                    <div
                      className='descriptionInput'
                      style={{ margin: '5px', padding: '12px', width: '100%' }}
                    >
                      <Input.TextArea
                        value={edit?.description}
                        placeholder='Description'
                        onChange={(e) => {
                          setEdit((pre) => ({
                            ...pre,
                            description: e.target.value,
                          }));
                        }}
                        autoSize={{ minRows: 7, maxRows: 6 }}
                      />
                    </div>
                  </div>
                </div>
              </Modal>

              <DeleteOutlined
                style={{ color: 'black', padding: '9px', fontSize: '15px' }}
                onClick={() => Delete(record)}
              />
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className='subheading'>
        <h1>PSLE Course</h1>
        <div className='line'></div>
        <button className='addbtn' onClick={handleAddModal}>
          Add PSLE Course
        </button>
      </div>

      <div className='container'>
        <div className='table'>
          <Table
            dataSource={Data}
            columns={columns}
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
            }}
          />
        </div>
      </div>
      <Modal
        title={
          <h2
            style={{
              fontWeight: 'bold',
              marginBottom: '15px',
              textAlign: 'center',
            }}
          >
            ADD PSLE COURSE
          </h2>
        }
        visible={addModalOpen}
        okText='Save'
        centered
        onCancel={() => setAddModalOpen(false)}
        width={950}
        bodyStyle={{ height: '350px' }}
        onOk={handleSaveNewCourse}
      >
        <div
          className='editContainer'
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <div style={{ flex: '1', marginRight: '10px' }}>
            <Input
              value={edit?.title}
              placeholder='Title'
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, title: e.target.value };
                });
              }}
              style={{ margin: '5px', padding: '12px' }}
            />
            <Input
              value={edit?.classLevel}
              placeholder='Class Level'
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, classLevel: e.target.value };
                });
              }}
              style={{ margin: '5px', padding: '12px' }}
            />
            <Input
              value={edit?.pricing}
              placeholder='Pricing'
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, pricing: e.target.value };
                });
              }}
              style={{ margin: '5px', padding: '12px' }}
            />
            <h4
              style={{
                margin: '10px',
              }}
            >
              Class Duration
            </h4>
            <DatePicker
              value={
                edit?.classdurationFrom ? dayjs(edit.classdurationFrom) : null
              }
              placeholder='From'
              onChange={(date) => {
                setEdit((pre) => {
                  return { ...pre, classdurationFrom: date };
                });
              }}
              style={{ margin: '5px', padding: '12px', width: '100%' }}
            />
            <DatePicker
              value={edit?.classdurationTo ? dayjs(edit.classdurationTo) : null}
              placeholder='To'
              onChange={(date) => {
                setEdit((pre) => {
                  return { ...pre, classdurationTo: date };
                });
              }}
              style={{ margin: '5px', padding: '12px', width: '100%' }}
            />
          </div>
          <div style={{ flex: '1', marginLeft: '10px' }}>
            <Input
              value={edit?.modeoflearning}
              placeholder='Mode of Learning'
              onChange={(e) => {
                setEdit((pre) => {
                  return { ...pre, modeoflearning: e.target.value };
                });
              }}
              style={{ margin: '5px', padding: '12px' }}
            />

            <h4 style={{ marginLeft: '9px' }}>Class Time</h4>
            <Space
              direction='vertical'
              style={{ margin: '5px', width: '100%' }}
            >
              <TimePicker.RangePicker
                value={
                  edit?.classtime && edit.classtime.length === 2
                    ? [
                        moment(edit.classtime[0], 'HH:mm'),
                        moment(edit.classtime[1], 'HH:mm'),
                      ]
                    : null
                }
                placeholder={['From', 'To']}
                onChange={(times) => {
                  setEdit((prev) => ({
                    ...prev,
                    classtime: [
                      times[0] ? times[0].format('HH:mm') : '',
                      times[1] ? times[1].format('HH:mm') : '',
                    ],
                  }));
                }}
                format='HH:mm'
                style={{
                  margin: '5px',
                  padding: '12px',
                  width: '100%',
                }}
              />
            </Space>
            <div
              className='descriptionInput'
              style={{ margin: '5px', padding: '12px', width: '100%' }}
            >
              <Input.TextArea
                value={edit?.description}
                placeholder='Description'
                onChange={(e) => {
                  setEdit((pre) => ({
                    ...pre,
                    description: e.target.value,
                  }));
                }}
                autoSize={{ minRows: 7, maxRows: 7 }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Home;
