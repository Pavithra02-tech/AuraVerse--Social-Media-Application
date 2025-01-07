import React, { useEffect, useState } from 'react';
import { Breadcrumb, Space, Avatar, Layout, List, theme , Button, message, Popconfirm} from 'antd';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons'


const { Header, Content } = Layout;


const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };


const Home = () => {
    const [refresh, setRefresh] = useState(false);

    const[post,setPost] = useState([]); //state management hook

    useEffect(()=>{
        axios.get('http://localhost:4000/post/getall')
        .then(res=>{
            console.log(res.data);
            const {result} = res.data;
            setPost(result);            
        })
        .catch(err=>{
            console.log(err);
            
        })
    },[refresh])

    const Addlike=(_id,count)=>{
        const body={
        _id,
        dataToBeUpdated:{
        likes: ++count
        }}
        console.log(body);
        axios.put('http://localhost:4000/post/update',body)
            .then(res =>{
                console.log(res.data);
                setRefresh(prev => !prev);
            })
            .catch(err =>{console.log(err);})}
      
    const deletePost=(id)=>{
        axios.delete('http://localhost:4000/post/delete/'+id)
        .then(res => {
          console.log(res.data);
          setRefresh(prev => !prev);
        })
        .catch(err => {
          console.log(err);
        })
    
      }

  
    const {
            token: { colorBgContainer, borderRadiusLG },
          } = theme.useToken();
          
    return (
    
        <Layout
            style={{
            minHeight: '100vh',
            }}
        >
        <Layout>
      
        <NavBar setRefresh={setRefresh}/>
        
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
                }}
        />
        
        <Content
            style={{
                margin: '0 16px',
            }}
        >
        
        <Breadcrumb
            style={{
                margin: '16px 0',
            }}
        >
        
        <Breadcrumb.Item>POSTS</Breadcrumb.Item>
            
        </Breadcrumb>
        
        <div
            style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
           
           <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                    console.log(page);
                    },
                    pageSize: 3,
                }}

                dataSource={post}

                // footer={
                //     <div>
                //         <b>ant design</b> footer part
                //      </div>
                // }

                renderItem={(item) => (

                    <List.Item
                        key={item.title}
                        actions={[
                            <Button color='default' variant='link' onClick={()=>Addlike(item._id,item.likes)}><IconText icon={LikeOutlined} text={item.likes} key="list-vertical-like-o" /></Button>,
                            <Button type='link'><IconText icon={MessageOutlined} text="2" key="list-vertical-message" /></Button>,
                            <Button type="dashed">Edit</Button>,
                            <Popconfirm
                                 title="Delete the post"
                                 description="Are you sure want to delete this task?"
                                 onConfirm={() =>deletePost(item._id)}
                                 onCancel={cancel}
                                 okText="Yes"
                                 cancelText="No"
                             >
                             <Button>Delete</Button>
                            </Popconfirm>
                            
                            
                        ]}

                        extra={
                        <>
                        <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />

                        </>
                        }
                    >
                        
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.post_title}</a>}
                        description={item.description}
                    />

                    {item.content}

                    </List.Item>
                )}

        />

        </div>

    </Content>
 
    </Layout>

    </Layout>
    );
};

export default Home;