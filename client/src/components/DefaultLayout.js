import React,{useState,useEffect} from 'react';
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "../resoursces/layout.css";
import { Link,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";

const { Header, Sider, Content } = Layout;


 const DefaultLayout =(props)=>{
  // state = {
  //   collapsed: false,
  // };
  const [collapsed,setCollapsed]=useState(false);
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const navigate=useNavigate()
  useEffect(()=>{
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
    console.log('CI=>',cartItems)

  },[cartItems])

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  
    return (
      <Layout>
      {loading && <div className="spinner">
      <div className="spinner-border"  role="status"
>


      </div>
</div>
}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
              <h3 className='colornew'>{collapsed ?<h4 className='colornew'> JUC </h4>:'JUC Canteen'}</h3>
          </div>
          <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/home" icon={<HomeOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="/cart" icon={<ShoppingCartOutlined />}>
            <Link to="/cart">Cart</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/items">Items</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LoginOutlined />} onClick={()=>{
            localStorage.removeItem('pos-user')
            navigate('/login')
          }}>
            Logout
          </Menu.Item>
        </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 10 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            <div className="cart-count d-flex align-items-center" onClick={()=>navigate('/cart')}>
            <b>
              {" "}
              <p className="mt-3 mr-2">{cartItems.length}</p>
            </b>
            <ShoppingCartOutlined />
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '10px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    );
  
}

export default DefaultLayout

