import React, { useState } from 'react';
import { HomeOutlined, SearchOutlined, PlusSquareOutlined, CompassOutlined, HeartOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import { Layout, Menu, Modal, Form, Input, Upload, Button, message } from 'antd';
import axios from 'axios';

const {  Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
            getItem('Home', '1', <HomeOutlined />),
            getItem('Search', '2', <SearchOutlined />),
            getItem('CreatePost', '3',<PlusSquareOutlined />), 
            getItem('Explore', '4',<CompassOutlined />),
            getItem('Likes', '5', <HeartOutlined />),
            getItem('MyProfile', '6', <UserOutlined />),
];


const Navbar = ({setRefresh}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm(); // Use Ant Design form instance
  
    // Function to handle menu click
    const Create = (item) => {
      if (item.key === '3') {
        setIsModalVisible(true); // Open the dialog box when "Create" is clicked
      }
    };
  
    // Function to handle modal submission
    const handleOk = async () => {
      try {
        const values = await form.validateFields(); // Validate form fields
        const { title, description, location } = values;
  
        // Prepare the request body
        const body = {
          post_title: title,
          description: description,
          location: location,
        };
        console.log(body);
        // Axios POST request
        await axios.post('http://localhost:4000/post/create', body);
        setRefresh(prev => !prev);
        message.success('Post created successfully!');
        
        form.resetFields(); // Reset the form
        setIsModalVisible(false); // Close the modal
      } catch (error) {
        if (error.response) {
          console.error('Server error:', error.response);
          message.error('Failed to create the post.');
        } else {
          console.error('Validation error:', error);
        }
      }
    };
  
    // Function to handle modal cancellation
    const handleCancel = () => {
      form.resetFields(); // Reset form fields when modal is canceled
      setIsModalVisible(false); // Close the modal
    };
  
    return (
      <Sider theme="dark">
        <h3 style={{ color: 'white', paddingLeft: '40px' }}>Auraverse</h3>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={Create}
          // Attach the click handler
        />
  
        {/* Modal for "Create" */}
        <Modal
          title="Create Post"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Submit
            </Button>,
          ]}
          width={500}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please enter a title!' }]}
            >
              <Input placeholder="Enter post title" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ message: 'Please enter a description!' }]}
            >
              <Input placeholder="Enter post description" />
            </Form.Item>
            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: 'Please enter a location!' }]}
            >
              <Input placeholder="Enter post location" />
            </Form.Item>
            <Form.Item label="Upload Image" name="image">
              <Upload beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </Sider>
    );
  };
  export default Navbar;