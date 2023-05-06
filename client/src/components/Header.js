import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom'
const Header = () => {

    const history = useNavigate();

    const goError = ()=>{
        history("*")
    }

    const godashboard = ()=>{
        history("/dashboard");
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const logoutuser = async ()=>{
        let token = localStorage.getItem("userdatatoken");
        // console.log("token here", token);
    
        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept : "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        if(data.status == 201){
            console.log("user logout");
            let token = localStorage.removeItem("userdatatoken");
            setLoginData(false)
            history("/login");
        }else{
           console.log("err");
        }
    
    }

  

    const { logindata, setLoginData } = useContext(LoginContext);
    console.log(logindata.ValidUserOne)
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='header_content d-flex justify-content-between align-items-center'>
                        <div className='logo'>
                            <h1>Ecommer<span className='text-primary'>ce.</span></h1>
                        </div>
                        <div className='avatar'>
                            {
                                logindata.ValidUserOne ? <Avatar style={{ backgroundColor: "green" }} onClick={handleClick}>{logindata.ValidUserOne.name[0].toUpperCase()}</Avatar> : <Avatar onClick={handleClick}>H</Avatar>
                            }

                        </div>

                        <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                      {
                        logindata.ValidUserOne ? <div>
                        <MenuItem onClick=
                        {()=>{
                            handleClose()
                            goError()
                        }}
                        >Profile</MenuItem>
                       
                        <MenuItem onClick=
                        {()=>{
                            handleClose()
                            logoutuser()
                        }}
                        > Logout </MenuItem>
                        </div>
                        :
                        <div>
                        <MenuItem onClick= {()=>{
                           godashboard()
                            handleClose()
                        }}
                        
                        >Profile</MenuItem>
                       
                        </div>
                      }
                        
                        
                      </Menu>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
