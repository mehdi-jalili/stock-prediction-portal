import React, { useRef, useState } from 'react'
import axios from 'axios'

export default function Register() {
  const enteredUsername = useRef();
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  
  const [errors, setErrors] = useState({});
const [success, setSuccess] = useState(false);
  

  const HandleRegistration = async (e) => {
    e.preventDefault();
    
    const username = enteredUsername.current.value;
    const email = enteredEmail.current.value;
    const password = enteredPassword.current.value;

    const userData = {
      username,
      email,
      password
    }
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/register', userData);
      setErrors({});
      console.log("Registration successful");
      setSuccess(true);
      resetForm(); // ریست فرم
      
      // هشدار موفقیت
      setTimeout(() => {
        alert("Registration successful!");
      }, 100);
    } catch (error) {
      // برطرف کردن خطا - بررسی ساختار ارور
      console.log("Full error object:", error);
      console.log("Has response?", error.response);
      console.log("Has request?", error.request);
      
      if (error.response) {
        // سرور پاسخ داده اما با کد خطا
        setErrors(error.response.data || {});
        console.log("Error data:", error.response.data);
      } else if (error.request) {
        // درخواست ارسال شده اما پاسخی دریافت نشده
        setErrors({general: "No response from server. Check network connection."});
      } else {
        // خطا در تنظیم درخواست
        setErrors({general: "Error: " + error.message});
      }
    }
  }


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light-dark p-5 rounded">
          <h3 className='text-light text-center mb-4'>Create and Account</h3>
          <form onSubmit={HandleRegistration}>
            
            <input type="text" className='form-control mb-3' placeholder='Enter Username' ref={enteredUsername} />
            <small>{errors.username && <div className="text-light bg-danger">{errors.username}</div>}</small>
            
            <input type="email" className='form-control mb-3' placeholder='Email Address' ref={enteredEmail} />
            <small>{errors.email && <div className="text-light bg-danger">{errors.email}</div>}</small>
            
            <input type="password" className='form-control mb-5' placeholder='Set Password' ref={enteredPassword} />
            <small>{errors.password && <div className="text-light bg-danger">{errors.password}</div>}</small>
            
            {success && <div className='alert alert-success'>Registration Successful</div>}
            <button type="submit" className='btn btn-info d-block mx-auto'>Register</button>
          </form>
        </div>
      </div>
      
    </div>
  )
}
